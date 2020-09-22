import Resolver from "../resolvers/resolver.base";

/**
 * The Model class is the base class where all deriverative model classes should
 * inherit from. 
 * 
 * All Model-derived classes are required to implement a load method to load its properties to properly inject itself on the endpoints.
 */
export default abstract class Model {
    /**
     * Retrieved values after resolving
     */
    __saved: any[];

    constructor() {
        this.__saved = [];
    }

    /**
     * Loads any required properties for the deriverative model.
     * Anything loaded by this method will be accessible later on during instantiation.
     * @param args the arguments required for the specific classes.
     */
    async abstract load(...args: any): Promise<void>;

    /**
     * Resolves nested Models that was instanced inside the parent.
     * @param resolver The resolver used.
     */
    async resolve(resolver: Resolver) {
        let resolvedValues = [];

        for (let prop in Object.getOwnPropertyNames(this)) {
            if (this[prop] instanceof Model) {
                let model = this[prop] as Model;
                model.load(...(await resolver.resolve(model.load)));
                model.resolve(resolver);
                this[prop] = model.serialize();
                resolvedValues.push(model.__saved);
            }

            if (Array.isArray(this[prop])) {
                let resolved = [];
                for (let nested of this[prop]) {
                    if (nested instanceof Model) {
                        let model = nested as Model;
                        model.load(...(await resolver.resolve(model.load)));
                        model.resolve(resolver);
                        resolved.push(model.serialize());
                        resolvedValues.push(model.__saved);
                    }
                }
                this[prop] = resolved;
            }

            if (!Array.isArray(this[prop]) && typeof this[prop] === "object") {
                for (let nested in Object.getOwnPropertyNames(this[prop])) {
                    if (this[prop][nested] instanceof Model) {
                        let model = this[prop][nested] as Model;
                        model.load(...(await resolver.resolve(model.load)));
                        model.resolve(resolver);
                        this[prop][nested] = model.serialize();
                        resolvedValues.push(model.__saved);
                    }
                }
            }
        }

        this.loadComplete(...resolvedValues);
    }

    /**
     * Called after all nested Models' dependencies are resolved.
     * Useful if you require certain properties only available after it being resolved.
     * @param args Restored values saved during resolving
     */
    loadComplete(...args: any) {}

    /**
     * Stores a value and restores it in the parent's `loadComplete` call
     * @param arg The value to be stored
     */
    save(arg: any) {
        this.__saved.push(arg);
    }

    /**
     * Serializes properties into an Object. Keep in mind private fields are omitted on the serialized object.
     */
    async serialize() {
        let output = {};

        for (let prop in Object.getOwnPropertyNames(this)) {
            if (!prop.startsWith("_")) {
                    output[prop] = this[prop];
            }
        }
    
        return output;
    }
}