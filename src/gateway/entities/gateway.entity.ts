import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Peripheral } from "./peripheral.entity";

@Entity()
export class Gateway{
    @PrimaryColumn()
    serial:string;

    @Column()
    human_name: string;

    @Column()
    ipv4: string;

    @OneToMany(()=>Peripheral, (periph)=> periph.gateway, {
        eager:true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    peripheral: Peripheral[];
}