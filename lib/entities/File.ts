import Base from "./Base";
import { Column, Entity } from "typeorm";

@Entity()
export default class File extends Base {
    @Column("binary")
    file: Buffer;
}