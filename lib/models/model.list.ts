import Model from "./model.base";

/**
 * The base class used for listed responses
 */
export default abstract class List extends Model {
    entries: any[];
}