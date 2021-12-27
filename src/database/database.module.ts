import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      //inject: [ConfigService],
      async useFactory() {
        
        return {
          type: 'sqlite',
          dropSchema: true,
          logging: false,
          database: 'musla',
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',],
          synchronize: true, //Delete on production
        } as ConnectionOptions;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
