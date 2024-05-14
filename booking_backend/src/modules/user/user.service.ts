import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user/user.model";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { Action, CaslAbilityFactory } from "../casl/casl-ability.factory/casl-ability.factory";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private caslAbilityFactory: CaslAbilityFactory
  ){}

  private canUser(action: Action, user: User, resource: User){
    const ability = this.caslAbilityFactory.createForUser(user);
    if(!ability.can(action, resource)) throw new ForbiddenException("Forbidden resource");
  }
  async findUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException("Such user doesnt exist");
    return user;
  }

  async registerUser({ password, ...other }: CreateUserDto) {
    const userByUsername = await this.findUserByUsername(other.username);
    if(userByUsername) throw new BadRequestException("User with such username alreadyExists");

    return this.userRepository.save({ ...other, password: bcrypt.hashSync(password, 8) });
  }
  async findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async getUserInfo(reqUser: User, id: number) {
    const user = await
      this.userRepository
        .findOne({ where: { id }, relations: ["reservations", "ownerships"] });
    this.canUser(Action.Read, reqUser, user);
    if (!user) throw new BadRequestException("Such user doesnt exist");
    return user;
  }
}
