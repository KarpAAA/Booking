import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Length, MaxLength, Min } from "class-validator";
import { Category } from "../../../entities/appartment/category.type";

export class CreateApartmentDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(99)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(999)
  description: string;

  @IsEnum(Category)
  category: Category

  rooms: number;
  price: number;
  ownerId: number

}