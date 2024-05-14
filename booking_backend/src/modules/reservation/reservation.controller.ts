import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ReservationService } from './reservation.service';
import { CreateReservationDTO } from "./dtos/CreateReservationDTO";
import { PoliciesGuard } from "../../guard/polices.guard";
import { CheckPolicies } from "../casl/polices";
import { Action, AppAbility } from "../casl/casl-ability.factory/casl-ability.factory";
import { Apartment } from "../../entities/appartment/apartment.model";
import { Reservation } from "../../entities/reservation/reservation.model";

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Reservation))
  createReservation(@Body() createReservationDto: CreateReservationDTO){
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get('user/:userId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Reservation))
  getUserReservations(@Param('userId') userId: string){
    return this.reservationService.findUserReservations(+userId);
  }

}
