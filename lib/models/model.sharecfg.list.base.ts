/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "./model.base";
import ShareCfgModel from "./model.sharecfg.base";

/**
 * A Model that has an entries key and lists all results from it.
 */
export default abstract class ShareCfgModelList<T extends ShareCfgModel> extends ShareCfgModel {
    @Model.exclude()
    ctor: { new(id: number): T };

    @Model.exclude()
    key: string;

    entries : Array<T> = new Array<T>();

    constructor(ctor: ({ new(id: number): T }), key = "id") {
        super();

        this.key = key;
        this.ctor = ctor;
    }

    async load(...args: any[]) {
        this.entries = this.modify(...args).map((i: { [key: string]: number }) => new this.ctor(i[this.key]));
    }

    /**
     * Called before the returned entries are mapped into an array.
     * @param args Resolved dependencies
     */
    modify(...args: any[]) : any[] { return args[0]; }
}