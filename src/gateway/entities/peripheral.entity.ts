import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Gateway } from "./gateway.entity";

@Entity()
export class Peripheral{
    @PrimaryColumn()
    uid: number;

    @Column()
    vendor: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    status: PeripheralStatus;

    @ManyToOne(()=>Gateway)
    gateway: Gateway;
}