import ShareCfgModel from "./model.sharecfg.base";
import { MODEL_DEPENDS_KEY, MODEL_EXCLUDE_KEY } from "lib/constants";

/**
 * Marks a property as private to be excluded from serialization.
 */
export function exclude() : PropertyDecorator {
    return function (target: Object, propertyKey: string) {
        if (typeof target === "function")
            throw new TypeError(`${propertyKey} of type ${typeof target} should not be a function`);

        Reflect.defineMetadata(MODEL_EXCLUDE_KEY, true, target, propertyKey);
    };
}

/**
 * Denote a `ShareCfgModel` depends on data that will be resolved and passed to it's `load` method.
 * @param dependencies An array of dependency names as listed in `ShareCfgResolver`
 */
export function dependsOn(dependencies: Array<string>) : ClassDecorator {
    return function(target: Function) {
        if (!(target.prototype instanceof ShareCfgModel))
            throw new Error("Dependencies may only be applied on of type ShareCfgModels");

        Reflect.defineMetadata(MODEL_DEPENDS_KEY, dependencies, target);
    };
}