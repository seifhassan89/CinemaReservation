import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/db.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MovieModule } from './movie/movie.module';
import { HallModule } from './hall/hall.module';
import { PartyTimeModule } from './party-time/party-time.module';
import { MovieShowModule } from './movie-show/movie-show.module';
import { SeatModule } from './seat/seat.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    /* 
     ================== ConfigModule ================== 
    to configure environment variables, 
    configuration files, 
    or other configuration sources for your application.
    */
    ConfigModule.forRoot({ isGlobal: true }),
    /* 
     ================== TypeOrmModule ================== 
    to connect to the database
    */
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    // Modules
    CommonModule,
    MovieModule,
    HallModule,
    PartyTimeModule,
    MovieShowModule,
    SeatModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
