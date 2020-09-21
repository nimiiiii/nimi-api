export default abstract class Model {
    async load () {
        return null;
    }

    serialize() {
        return Object.getOwnPropertyNames(this).reduce((a, c) => {
            if (!c.startsWith("_"))
               a[c] = this[c];
            
            return a;
        }, {});
    }
}