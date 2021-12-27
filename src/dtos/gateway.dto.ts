import { IsIP } from "class-validator";

export class GatewayDto{
    serial:string;

    human_name: string;
    @IsIP("4")
    ipv4: string;
}