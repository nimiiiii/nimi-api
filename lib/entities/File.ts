/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Base from "./Base";
import { Column, Entity } from "typeorm";

@Entity()
export default class File extends Base {
    @Column("binary")
    file: Buffer;

    @Column("text")
    hash: string;
}