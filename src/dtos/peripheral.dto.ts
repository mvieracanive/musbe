import { Gateway } from "src/gateway/entities/gateway.entity";

export class PeripheralDto{
    uid: number;
    vendor: string;
    status: PeripheralStatus;
    gateway: string;
}