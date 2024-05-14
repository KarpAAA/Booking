import { Apartment } from "../../../entities/appartment/apartment.model";

export class CreateReservationDTO {
  arrivalDate: string;
  departureDate: string;
  userId: number;
  apartmentId: number;
  price: number;
}