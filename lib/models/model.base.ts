/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { MODEL_EXCLUDE_KEY } from "lib/constants";
import Repository from "lib/github/github.repository";
import { exclude } from "./model.helpers";
import Resolver, { ResolverRegion } from "../resolvers/resolver.base";
import "reflect-metadata";

type ModelResolverOptions = {
    repo: string,
    token: string,
    region: ResolverRegion,
}

export interface IModel {
    load(...args: unknown[]) : Promise<void>;
    loadComplete() : void;
    run(raw?: boolean, resolver?: Resolver) : Promise<any>;
    serialize() : any;
    setResolverDefaults(token: string, repo: string, region: ResolverRegion) : void;
    resolve(resolver: Resolver) : Promise<void>
    mixin(model: IModel) : void;
}

/**
 * The Model class is the base class where all deriverative model classes should
 * inherit from. 
 * 
 * All Model-derived classes are required to implement a load method to load its
 * properties to properly inject itself on the endpoints.
 */
export default abstract class Model<T extends Resolver> implements IModel {
    resolver: { new(lang: string, repo: Repository): T };

    @exclude()
    resolverOptions?: ModelResolverOptions;

    constructor(resolver: ({ new(lang: string, repo: Repository): T })) {
        this.resolver = resolver;
    }

    /**
     * Loads any required properties for the deriverative model.
     * Anything loaded by this method will be accessible later on during instantiation.
     * @param args the arguments passed by the resolvers.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(...args: unknown[]) : Promise<void> {}

    /**
     * Called after all nested Models' dependencies are resolved.
     * Useful if you require certain properties only available after it being resolved.
     */
    loadComplete() : void {}

    /**
     * Runs the entire lifecycle of this model.
     * @param raw Whether to return itself or the serialized version
     * @param resolver The resolver to use for model serialization
     */
    async run(raw = false, resolver: Resolver = null) : Promise<Object | IModel> {
        // Instantiate the resolver only when we don't supply one
        if (!resolver) {
            const [ owner, repoName ] = this.resolverOptions?.repo.split("/");
            const repo = new Repository(this.resolverOptions?.token, owner, repoName);
            resolver = new this.resolver(this.resolverOptions?.region, repo);

            await resolver.init();
        }

        // The first resolve resolves models instanced in the constructor
        // making the properties ready for use in the load method
        await this.resolve(resolver);
        await this.load(...(await resolver.resolve(this)));

        // The second resolve resolves models instanced in the load method
        await this.resolve(resolver);

        this.loadComplete();
        return raw ? this : this.serialize();
    }

    setResolverDefaults(token: string, repo: string, region: ResolverRegion) {
        this.resolverOptions = { repo, token, region };
    }

    /**
     * Serializes public properties including those nested inside arrays and objects into an Object.
     */
    serialize() : Object {
        const output = {};

        for (const prop of Object.getOwnPropertyNames(this)) {
            if (Reflect.getMetadata(MODEL_EXCLUDE_KEY, this, prop) ?? false)
                continue;

            if (Array.isArray(this[prop])) {
                const serialized = [];

                for (const nested of this[prop]) {
                    serialized.push(
                        (nested instanceof Model)
                            ? nested.serialize()
                            : nested
                    );
                }

                output[prop] = serialized;
            }
            else if (typeof this[prop] === "object") {
                output[prop] = {};

                for (const nested of Object.getOwnPropertyNames(this[prop])) {
                    output[prop][nested] = (this[prop][nested] instanceof Model)
                        ? this[prop][nested].serialize()
                        : this[prop][nested];
                }
            }
            else
                output[prop] = this[prop];
        }

        return output;
    }

    /**
     * Resolves nested Models that was instanced inside the parent including those nested in objects and arrays.
     * @param resolver The resolver to use.
     */
    async resolve(resolver: Resolver) : Promise<void> {
        for (const prop of Object.getOwnPropertyNames(this)) {
            if (this[prop] instanceof Model)
                this[prop] = await (this[prop] as unknown as IModel)?.run(true, resolver);

            if (Array.isArray(this[prop])) {
                const resolved = [];

                for (const nested of this[prop]) {
                    resolved.push(
                        (nested instanceof Model)
                            ? await (nested as unknown as IModel).run(true, resolver)
                            : nested
                    );
                }

                this[prop] = resolved;
            }

            if (!Array.isArray(this[prop]) && typeof this[prop] === "object") {
                for (const nested of Object.getOwnPropertyNames(this[prop])) {
                    if (this[prop][nested] instanceof Model)
                        this[prop][nested] = await (this[prop][nested] as unknown as IModel).run(true, resolver);
                }
            }
        }
    }

    /**
     * Applies the provided model to this instance.
     * @param model The model to be applied.
     */
    mixin(model: Model<T>) {
        for (const prop of Object.getOwnPropertyNames(model)) {
            this[prop] = model[prop];
            if (Reflect.getMetadata(MODEL_EXCLUDE_KEY, model, prop) ?? false)
                Reflect.defineMetadata(MODEL_EXCLUDE_KEY, true, this, prop);
        }
    }
}