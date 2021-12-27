import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
  let app: INestApplication;
  let service = { create: (obj) => obj };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers:[GatewayController],
      providers: [
          {
                provide: GatewayService,
                useValue: service
          }        
        ]
        })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`POST /gateway`, () => {
    let data = {
        "human_name": "Gateway One",
        "serial": "gtgr64uj3",
        "ipv4": "192.168.0.2",
    }
    return request(app.getHttpServer())
      .post('/gateway')
      .send(data)
      .expect(201)
      .expect(data)
      .expect('location',`/gateway/${data.serial}`)
  });

  afterAll(async () => {
    await app.close();
  });
});