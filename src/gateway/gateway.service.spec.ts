import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { GatewayDto } from '../dtos/gateway.dto';
import { getConnection, Repository } from 'typeorm';
import { Gateway } from './entities/gateway.entity';
import { GatewayService } from './gateway.service';
import { ConnectionOptions } from 'tls';
import { Peripheral } from './entities/peripheral.entity';
import { throwError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
let data = {serial: 'aa', human_name:"aaname", ipv4: "100.456.7.7"};
let data2 = {serial: 'bb', human_name:"bbname", ipv4: "101.456.7.7"};
let dataArr = [
  data,
  data2
];

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(id => {return {...data, serial: id}}),
  insert: jest.fn(entity => entity),
  find: jest.fn((sort) => dataArr),
}));

describe('GatewayService', () => {
  let service: GatewayService;
  let repositoryMock: any;
  

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        imports: [
        ],
        controllers: [],
        providers: [
          { 
            provide: getRepositoryToken(Gateway), 
            useFactory: repositoryMockFactory
         },
          GatewayService],
    }).compile();

    service = app.get<GatewayService>(GatewayService);
    repositoryMock = app.get(getRepositoryToken(Gateway));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {    
    it('should return a Gateway', async () => {

      const res = await service.create(data);
      expect(res).toEqual(data);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(data.serial);
      expect(repositoryMock.insert).toHaveBeenCalledWith(data);        
    });
  });

  describe('create', () => {    
    it('should throw an HttpStatus.CONFLICT when gateway serial already exists in DB', async () => {
      
      repositoryMock.insert.mockImplementation((entity) => Promise.reject({errno: 19}));
      try{
        await service.create(data);
      }
      catch(ex){      
        expect(ex).toBeInstanceOf(HttpException); 
        expect(ex).toMatchObject({status: HttpStatus.CONFLICT});
      }
      
      expect(repositoryMock.findOne).not.toHaveBeenCalled();
      expect(repositoryMock.insert).toHaveBeenCalledTimes(1);
      expect(repositoryMock.insert).toHaveBeenCalledWith(data);        
    });
  });

  describe('create', () => {    
    it('should throw an HttpStatus.INTERNAL_SERVER_ERROR when there is an error inserting in DB not clasified by the TRY/CATCH code', async () => {
      
      repositoryMock.insert.mockImplementation((entity) => Promise.reject('Unknow error'));
      try{
        await service.create(data);
      }
      catch(ex){      
        expect(ex).toBeInstanceOf(HttpException); 
        expect(ex).toMatchObject({status: HttpStatus.INTERNAL_SERVER_ERROR});
      }
      
      expect(repositoryMock.findOne).not.toHaveBeenCalled();
      expect(repositoryMock.insert).toHaveBeenCalledTimes(1);
      expect(repositoryMock.insert).toHaveBeenCalledWith(data);        
    });
  });

  describe('getCollection', () => {
    it('should return a list of GatewayDto', async () => {
      const sort: string = '';

      const res = await service.getCollection(sort);
      expect(res).toEqual(dataArr);
      expect(repositoryMock.find).toHaveBeenCalledWith({order: {}});        
    });
  });

  describe('getCollection', () => {
    it('should find gateways ordering ASC by serial', async () => {
      const sort: string = 'serial';

      const res = await service.getCollection(sort);
      expect(repositoryMock.find).toHaveBeenCalledWith({order: {serial: 'ASC'}});        
    });
  });

  describe('getCollection', () => {
    it('should find gateways ordering ASC by serial', async () => {
      const sort: string = 'human_name';

      const res = await service.getCollection(sort);
      expect(repositoryMock.find).toHaveBeenCalledWith({order: {human_name: 'ASC'}});        
    });
  });

  describe('getCollection', () => {
    it('should find gateways ordering ASC by serial', async () => {
      const sort: string = 'ipv4';

      const res = await service.getCollection(sort);
      expect(repositoryMock.find).toHaveBeenCalledWith({order: {ipv4: 'ASC'}});        
    });
  });
})