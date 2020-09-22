/**
 * The Model class is the base class where all deriverative model classes should
 * inherit from. 
 * 
 * All Model-derived classes are required to implement a load method to load its properties to properly inject itself on the endpoints.
 */
export default abstract class Model {

    entries: any;
    /**
     * Loads any required properties for the deriverative model.
     * Anything loaded by this method will be accessible later on during instantiation.
     * @param args the arguments required for the specific classes.
     */
    async abstract load(...args: any): Promise<void>;

    /**
     * Serializes properties into a Object. Keep in mind private fields are omitted on the serialized object.
     * Additionally, all mixins being serialized will have their dependencies resolved.
     */
    async serialize() {
        return Object.getOwnPropertyNames(this).reduce((a, c) => {
            if (!c.startsWith("_"))
               a[c] = this[c];
            
            return a;
        }, {});
    }
}