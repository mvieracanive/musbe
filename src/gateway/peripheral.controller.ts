import { Body, Controller, Delete, Param, Post, Res } from "@nestjs/common";
import { PeripheralCreateDto } from "src/dtos/peripheral-create.dto";
import { PeripheralDto } from "src/dtos/peripheral.dto";
import { PeripheralService } from "./peripheral.service";

@Controller('gateway/:gatewayid/peripheral')
export class PeripheralController{
    constructor (private _service: PeripheralService){}
    @Post()
    async create(
        @Param('gatewayid') gateway: string, 
        @Body() dto:PeripheralCreateDto, 
        @Res({ passthrough: true }) res: any){
        const ret = await this._service.create(dto, gateway);
        res.location(`/gateway/${gateway}/pheriferal/${dto.uid}`)
        return ret;
    }

    @Delete('/:id')
    async delete(@Param('id') id: number){
        return this._service.delete(id);
    }
}