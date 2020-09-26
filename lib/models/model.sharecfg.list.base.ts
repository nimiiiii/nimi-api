/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "./model.base";
import ShareCfgModel from "./model.sharecfg.base";

/**
 * A Model that has an entries key and lists all results from it. The model to be constained
 * must have an `id` for this to work.
 */
export default abstract class ShareCfgModelList<T extends ShareCfgModel> extends ShareCfgModel {
    @Model.exclude()
    ctor: { new(id: number): T };

    entries : Array<T> = new Array<T>();

    constructor(ctor: ({ new(id: number): T })) {
        super();

        this.ctor = ctor;
    }

    async load(...args: any[]) {
        this.entries = this.modify(...args).map((i: { id: number }) => new this.ctor(i.id));
    }

    /**
     * Called before the returned entries are mapped into an array.
     * @param args Resolved dependencies
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modify(...args: any[]) : any[] { return args[0]; }
}