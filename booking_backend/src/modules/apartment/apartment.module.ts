import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apartment } from "../../entities/appartment/apartment.model";
import { UserModule } from "../user/user.module";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Apartment]), CaslModule],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [ApartmentService]
})
export class ApartmentModule {}
