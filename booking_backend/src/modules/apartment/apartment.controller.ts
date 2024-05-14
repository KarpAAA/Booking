import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";

import { ApartmentService } from "./apartment.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { FilterOptions } from "./dto/filter-options";
import { FileInterceptor } from "@nestjs/platform-express";
import { CheckPolicies } from "../casl/polices";
import { PoliciesGuard } from "../../guard/polices.guard";
import { Action, AppAbility } from "../casl/casl-ability.factory/casl-ability.factory";
import { Apartment } from "../../entities/appartment/apartment.model";

@Controller("apartment")
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {
  }


  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Apartment))
  create(@UploadedFile() image: Express.Multer.File, @Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.create(image, createApartmentDto);
  }
  @Get()
  findAll(@Query() filterOptions?: FilterOptions) {
    return this.apartmentService.findAll(filterOptions);
  }

  @Get("/user/:userId")
  findUsersApartments(@Param("userId") userId: string) {
    return this.apartmentService.findUsersApartments(+userId);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.apartmentService.findOne(+id);
  }


  @Put(":id")
  @UseInterceptors(FileInterceptor('image'))
  update(@Param("id") id: string, @UploadedFile() image: Express.Multer.File, @Body() updateApartmentDto: CreateApartmentDto, @Request() req) {
    return this.apartmentService.update(+id,image, req.user, updateApartmentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    return this.apartmentService.remove(req.user, +id);
  }
}
