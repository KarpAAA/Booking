import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from "../../entities/reservation/reservation.model";
import { UserModule } from "../user/user.module";
import { ApartmentModule } from "../apartment/apartment.module";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UserModule, ApartmentModule, CaslModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
