import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Gateway } from "./entities/gateway.entity";
import { Peripheral } from "./entities/peripheral.entity";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { PeripheralController } from "./peripheral.controller";
import { PeripheralService } from "./peripheral.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Gateway, Peripheral])
    ],
    controllers: [GatewayController, PeripheralController],
    providers: [GatewayService, PeripheralService],
  })
export class GatewayModule {}