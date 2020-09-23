import Resolver from "../resolvers/resolver.base";
import "reflect-metadata";

/**
 * The Model class is the base class where all deriverative model classes should
 * inherit from. 
 * 
 * All Model-derived classes are required to implement a load method to load its properties to properly inject itself on the endpoints.
 */
export default abstract class Model {
    /**
     * Loads any required properties for the deriverative model.
     * Anything loaded by this method will be accessible later on during instantiation.
     * @param args the arguments required for the specific classes.
     */
    async load(...args: any) {};

    /**
     * Resolves nested Models that was instanced inside the parent.
     * @param resolver The resolver used.
     */
    async resolve(resolver: Resolver) {
        for (let prop in Object.getOwnPropertyNames(this)) {
            if (this[prop] instanceof Model) {
                let model = this[prop] as Model;
                model.resolve(resolver);
                model.load(...(await resolver.resolve(model.load)));model.resolve(resolver);
                model.resolve(resolver);
                model.loadComplete();
                this[prop] = model.serialize();
            }

            if (Array.isArray(this[prop])) {
                let resolved = [];
                for (let nested of this[prop]) {
                    if (nested instanceof Model) {
                        let model = nested as Model;
                        model.resolve(resolver);
                        model.load(...(await resolver.resolve(model.load)));model.resolve(resolver);
                        model.resolve(resolver);
                        model.loadComplete();
                        resolved.push(model.serialize());
                    }
                }
                this[prop] = resolved;
            }

            if (!Array.isArray(this[prop]) && typeof this[prop] === "object") {
                for (let nested in Object.getOwnPropertyNames(this[prop])) {
                    if (this[prop][nested] instanceof Model) {
                        let model = this[prop][nested] as Model;
                        model.resolve(resolver);
                        model.load(...(await resolver.resolve(model.load)));model.resolve(resolver);
                        model.resolve(resolver);
                        model.loadComplete();
                        this[prop][nested] = model.serialize();
                    }
                }
            }
        }
    }

    /**
     * Called after all nested Models' dependencies are resolved.
     * Useful if you require certain properties only available after it being resolved.
     */
    loadComplete() {}

    /**
     * Serializes properties into an Object.
     * @param excludePrivate Filters out private properties from serialization
     */
    async serialize(exclude: boolean = false) {
        let output = {};

        for (let prop in Object.getOwnPropertyNames(this)) {
            if (exclude && !Reflect.getMetadata("exclude", this, prop))
                output[prop] = this[prop];
        }
    
        return output;
    }

    /**
     * Marks a property as private to be excluded from serialization.
     */
    protected static exclude() {
        return Reflect.metadata("exclude", true);
    }
}