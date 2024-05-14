import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { FilterOptions } from "./dto/filter-options";
import { InjectRepository } from "@nestjs/typeorm";
import { Apartment } from "../../entities/appartment/apartment.model";
import { Like, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { User } from "../../entities/user/user.model";
import { Action, CaslAbilityFactory } from "../casl/casl-ability.factory/casl-ability.factory";
import * as fs from "fs";
import { v4 } from "uuid";

@Injectable()
export class ApartmentService {

  constructor(
    @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {
  }

  private canUser(action: Action, user: User, resource: Apartment) {
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(action, resource)) throw new ForbiddenException("Forbidden resource");
  }


  async create(image: Express.Multer.File, { ownerId, ...other }: CreateApartmentDto) {
    const imageName = this.uploadFile(image);

    const owner = await this.userService.findUserById(ownerId);
    if (!owner) {
      throw new BadRequestException("User with such id doesnt exist");
    }
    const apartment: Apartment = await this.apartmentRepository.save({
      ...other,
      image: "http://localhost:3000/apartments/" + imageName,
      owner
    });
    return apartment;
  }

  private uploadFile = (image: Express.Multer.File) => {
    const imageName = v4() + "." + image.mimetype.substring(6);
    const imagePath =
      'C:\\Users\\ivank\\WebstormProjects\\booking\\booking_backend\\client\\apartments\\'
      + imageName;
    fs.writeFileSync(imagePath, image.buffer);
    return imageName;
  }
  findAll(filterOptions: FilterOptions) {
    return this.apartmentRepository.find({
      where:
        {
          rooms: filterOptions.roomsNumber ? filterOptions.roomsNumber : undefined,
          category: filterOptions.category,
          name: Like(`%${filterOptions.search ? filterOptions.search : ""}%`)
        },
      order: {
        price: filterOptions.sortDirection
      }
    });
  }

  findOne(id: number) {
    return this.apartmentRepository.findOne({ where: { id }, relations: ["reservations"] });
  }

  async update(id: number, image: Express.Multer.File, reqUser: User, { ownerId, ...other }: CreateApartmentDto) {
    const owner = await this.userService.findUserById(reqUser.id);
    if (!owner) {
      throw new BadRequestException("User with such id doesnt exist");
    }
    this.canUser(Action.Update, await this.userService.findUserById(reqUser.id), await this.findOne(id));
    if(image){
      const imageName = this.uploadFile(image);
      return this.apartmentRepository.save({
        ...other,
        id,
        owner,
        image: "http://localhost:3000/apartments/" + imageName
      });
    }
    else {
      return this.apartmentRepository.save({
        ...other,
        id,
        owner,
      });
    }

  }

  async remove(reqUser: User, id: number) {
    const ap = await this.findOne(id);
    this.canUser(Action.Delete, reqUser, ap);
    return this.apartmentRepository.delete({ id });
  }

  findUsersApartments(userId: number) {
    return this.apartmentRepository.find({ where: { owner: { id: userId } } });
  }
}
