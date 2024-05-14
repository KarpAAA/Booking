import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.model";
import { Apartment } from "../appartment/apartment.model";


@Entity({ name: "reservations" })
export class Reservation {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  arrivalDate: string;

  @Column()
  departureDate: string;

  @Column()
  price: number;

  @ManyToOne(type => User, (user) => user.reservations)
  guest: User;

  @ManyToOne(type => Apartment, (apartment) => apartment.reservations,  {onDelete: "CASCADE"})
  apartment: Apartment;
}