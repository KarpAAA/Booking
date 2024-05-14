import { Body, Controller, Get, Param, Post, UseGuards, Request, Put } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { PoliciesGuard } from "../../guard/polices.guard";
import { CheckPolicies } from "../casl/polices";
import { Action, AppAbility } from "../casl/casl-ability.factory/casl-ability.factory";
import { User } from "../../entities/user/user.model";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto){
    return this.userService.registerUser(createUserDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @Get("/:id")
  getUserInfo(@Param('id') id: string, @Request() req){
    return this.userService.getUserInfo(req.user, +id);
  }

}
