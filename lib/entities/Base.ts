import { BaseEntity, CreateDateColumn, PrimaryColumn } from "typeorm";

export default abstract class Base extends BaseEntity {
    @PrimaryColumn("text",{ unique: true })
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}