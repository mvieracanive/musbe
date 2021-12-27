import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PeripheralCreateDto } from "src/dtos/peripheral-create.dto";
import { PeripheralDto } from "src/dtos/peripheral.dto";
import { Repository } from "typeorm";
import { Peripheral } from "./entities/peripheral.entity";

Injectable()
export class PeripheralService{
    constructor(@InjectRepository(Peripheral) private _repo: Repository<Peripheral>){}
    
    async create(dto: PeripheralCreateDto, gateway: string):Promise<PeripheralDto>{
        let currenttotal = await this._repo.find({where: {gateway}});
        if (currenttotal.length === 10)
            throw new HttpException('The gatware has reached top number of peripherals', HttpStatus.CONFLICT)
        try{
            

            await this._repo.insert({...dto, gateway:{serial: gateway}});
        }
        catch(ex){
            console.log(ex);
            if (ex.errno == 19)
                throw new HttpException(
                'Peripheral uid muest be unique for the gateway',
                HttpStatus.CONFLICT,
                );
            throw new HttpException('Internal Error. Please check the logs', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return {
            ...dto,
            gateway
        };
    }

    async delete(id:number){

    }
}