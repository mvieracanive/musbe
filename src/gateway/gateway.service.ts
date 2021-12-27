import { HttpException, HttpStatus, Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GatewayDto } from '../dtos/gateway.dto';
import { Repository } from 'typeorm';
import { Gateway } from './entities/gateway.entity';

Injectable();
export class GatewayService {
  constructor(@InjectRepository(Gateway) private _repo: Repository<Gateway>) {}

  async create(dto: GatewayDto): Promise<GatewayDto> {
    try {
      await this._repo.insert(dto);
      return await this.getOne(dto.serial);
    } catch (ex) {
      if (ex.errno == 19)
        throw new HttpException(
          'Gateway serial must be a unique identifier',
          HttpStatus.CONFLICT,
        );
      throw new HttpException(
        'Internal Error. Please check the logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCollection(sort: string): Promise<GatewayDto[]> {
    let options = {};
    if (sort) options[sort] = 'ASC';
    
    const ret = this._repo.find({ order: options });

    return ret;
  }

  async getOne(id: string) {
    return this._repo.findOne(id);
  }
}
