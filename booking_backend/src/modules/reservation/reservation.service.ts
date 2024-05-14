import { Injectable } from '@nestjs/common';
import { CreateReservationDTO } from "./dtos/CreateReservationDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "../../entities/reservation/reservation.model";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { ApartmentService } from "../apartment/apartment.service";

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    private userService: UserService,
    private apartmentService: ApartmentService
    ) {
  }

  async createReservation({ userId, apartmentId, ...other }: CreateReservationDTO) {
    const guest = await this.userService.findUserById(userId);
    const apartment = await this.apartmentService.findOne(apartmentId);
    return this.reservationRepository.save({
      ...other,
      guest,
      apartment
    });
  }

  findUserReservations(userId: number) {
    console.log(userId);
    return this.reservationRepository.find({ where: {guest: {id: userId}}, relations: ['apartment']});
  }
}
