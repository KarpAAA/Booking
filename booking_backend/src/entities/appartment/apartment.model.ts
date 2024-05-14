import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.type";
import { Reservation } from "../reservation/reservation.model";
import { User } from "../user/user.model";

@Entity({name: 'apartments'})
export class Apartment {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  rooms: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  price: number

  @Column({ nullable: true, default: 'Cosy family house' })
  description: string

  @Column({ nullable: true })
  image: string

  @Column()
  category: Category

  @OneToMany(type => Reservation, (reservation) => reservation.apartment,
      {cascade: true})

  reservations: Reservation[];

  @ManyToOne( type => User, (owner) => owner.ownerships, {eager: true})
  owner: User
}