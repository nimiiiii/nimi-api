import Model from "./model.base";

/**
 * The base class used for listed responses
 */
export default abstract class ModelList extends Model {
    entries: unknown[];
}