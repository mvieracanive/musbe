import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [DatabaseModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
