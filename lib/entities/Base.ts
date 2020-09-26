/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { BaseEntity, CreateDateColumn, PrimaryColumn } from "typeorm";

export default abstract class Base extends BaseEntity {
    @PrimaryColumn("text",{ unique: true })
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}