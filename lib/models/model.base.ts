import Resolver, { ResolverConstructor } from "../resolvers/resolver.base";
import "reflect-metadata";

/**
 * The Model class is the base class where all deriverative model classes should
 * inherit from. 
 * 
 * All Model-derived classes are required to implement a load method to load its
 * properties to properly inject itself on the endpoints.
 */
export default abstract class Model {
    resolver: ResolverConstructor;

    constructor(resolver: ResolverConstructor) {
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
     * @param raw Whether to return itself or the serialized version
     */
    async run(resolver: Resolver, raw = false) : Promise<any> {
        // The first resolve resolves models instanced in the constructor
        // making the properties ready for use in the load method
        await this.resolve(resolver);
        await this.load(...(await resolver.resolve(this)));
        // The second resolve resolves models instanced in the load method
        await this.resolve(resolver);
        this.loadComplete();
        return raw ? this : await this.serialize();
    }

    /**
     * Serializes public properties into an Object.
     */
    protected async serialize() : Promise<any> {
        const output = {};

        for (const prop of Object.getOwnPropertyNames(this)) {
            if (Reflect.getMetadata("exclude", this, prop) ?? false)
                continue;

            output[prop] = this[prop];
        }

        return output;
    }

    /**
     * Resolves nested Models that was instanced inside the parent including those nested in objects and arrays.
     * @param resolver The resolver to use.
     */
    protected async resolve(resolver: Resolver) : Promise<void> {
        for (const prop of Object.getOwnPropertyNames(this)) {
            if (this[prop] instanceof Model)
                this[prop] = await (this[prop] as Model)?.run(resolver, true);

            if (Array.isArray(this[prop])) {
                const resolved = [];

                for (const nested of this[prop]) {
                    if (nested instanceof Model)
                        resolved.push(await (nested as Model).run(resolver, true));
                }

                this[prop] = resolved;
            }

            if (!Array.isArray(this[prop]) && typeof this[prop] === "object") {
                for (const nested of Object.getOwnPropertyNames(this[prop])) {
                    if (this[prop][nested] instanceof Model)
                        this[prop][nested] = await (this[prop][nested] as Model).run(resolver, true);
                }
            }
        }
    }

    /**
     * Marks a property as private to be excluded from serialization.
     */
    protected static exclude() {
        return function (target: any, propertyKey: string) : void {
            if (typeof target === "function")
                throw new TypeError(`${propertyKey} of type ${typeof target} should not be a function`);

            Reflect.defineMetadata("exclude", true, target, propertyKey);
        };
    }

    /**
     * Applies the provided model to this instance.
     * @param model The model to be applied.
     */
    mixin(model: Model) {
        for (const prop of Object.getOwnPropertyNames(model)) {
            this[prop] = model[prop];
            if (Reflect.getMetadata("exclude", model, prop) ?? false)
                Reflect.defineMetadata("exclude", true, this, prop);
        }
    }
}