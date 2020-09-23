import Repository from "lib/github/github.repository";
import Resolver from "../resolvers/resolver.base";
import "reflect-metadata";

export interface IResolvable {
    new (lang: string, repo: Repository) : Resolver;
}

/**
 * The Model class is the base class where all deriverative model classes should
 * inherit from. 
 * 
 * All Model-derived classes are required to implement a load method to load its
 * properties to properly inject itself on the endpoints.
 */
export default abstract class Model {
    resolver: IResolvable;

    constructor(resolver: IResolvable) {
        this.resolver = resolver;
    }

    /**
     * Loads any required properties for the deriverative model.
     * Anything loaded by this method will be accessible later on during instantiation.
     * @param args the arguments required for the specific classes.
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
     * @param resolver The resolver to use.
     * @param exclude Exclude properties decorated as private from serialization.
     */
    async run(resolver: Resolver, exclude = false) : Promise<any> {
        // The first resolve resolves models instanced in the constructor
        // making the properties ready for use in the load method
        await this.resolve(resolver);
        await this.load(...(await resolver.resolve(this.load)));
        // The second resolve resolves models instanced in the load method
        await this.resolve(resolver);
        this.loadComplete();
        return await this.serialize(exclude);
    }

    /**
     * Serializes properties into an Object.
     * @param exclude Exclude properties decorated as private from serialization.
     */
    protected async serialize(exclude : boolean) : Promise<any> {
        const output = {};

        for (const prop in Object.getOwnPropertyNames(this)) {
            if (exclude && !Reflect.getMetadata("exclude", this, prop))
                output[prop] = this[prop];
        }

        return output;
    }

    /**
     * Resolves nested Models that was instanced inside the parent including those nested in objects and arrays.
     * @param resolver The resolver to use.
     */
    protected async resolve(resolver: Resolver) : Promise<void> {
        for (const prop in Object.getOwnPropertyNames(this)) {
            if (this[prop] instanceof Model)
                this[prop] = await (this[prop] as Model)?.run(resolver);

            if (Array.isArray(this[prop])) {
                const resolved = [];

                for (const nested of this[prop]) {
                    if (nested instanceof Model)
                        resolved.push(await (nested as Model).run(resolver));
                }

                this[prop] = resolved;
            }

            if (!Array.isArray(this[prop]) && typeof this[prop] === "object") {
                for (const nested in Object.getOwnPropertyNames(this[prop])) {
                    if (this[prop][nested] instanceof Model)
                        this[prop][nested] = await (this[prop][nested] as Model).run(resolver);
                }
            }
        }
    }

    /**
     * Marks a property as private to be excluded from serialization.
     */
    protected static exclude() : ({
        (target: unknown, propertyKey: string | symbol): void;
    }) {
        return Reflect.metadata("exclude", true);
    }
}