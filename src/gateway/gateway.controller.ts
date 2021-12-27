import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { GatewayDto } from "../dtos/gateway.dto";
import { GatewayService } from "./gateway.service";

@Controller('gateway')
export class GatewayController{
    constructor (private _service: GatewayService){}
    @Post()
    async create(@Body() dto: GatewayDto, @Res({ passthrough: true }) res: any){
        const obj:GatewayDto= plainToClass(GatewayDto, {
                ...dto
                }, { enableImplicitConversion: true })

        const ret = await this._service.create(obj);
        res.location(`/gateway/${ret.serial}`)
        return ret;
    }

    @Get()
    getCollection(
        @Query('sort') sortby: string
    ): Promise<GatewayDto[]> {
        return this._service.getCollection(sortby);
    }

    @Get('/:id')
    getOne(
        @Param('id') id: string
    ): Promise<GatewayDto> {
        return this._service.getOne(id);
    }

}