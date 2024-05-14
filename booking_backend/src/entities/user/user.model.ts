import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.type";
import { Reservation } from "../reservation/reservation.model";
import { Apartment } from "../appartment/apartment.model";
import { Exclude } from "class-transformer";

@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false, unique: true})
  username: string

  @Column({nullable: false})
  @Exclude()
  password: string

  @Column({nullable: false})
  role: Role

  @OneToMany( type => Reservation, (reservation) => reservation.guest)
  reservations: Reservation[]

  @OneToMany( type => Apartment, (ownership) => ownership.owner)
  ownerships: Apartment[]

}