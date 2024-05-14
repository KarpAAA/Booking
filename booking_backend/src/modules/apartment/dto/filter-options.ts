import { Category } from "../../../entities/appartment/category.type";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

enum SortBy {
  PRICE = "Price",
  ROOMS = "Rooms"
}

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export class FilterOptions {

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  roomsNumber?: number;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsEnum(SortBy)
  sortOptions?: SortBy;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection;

  constructor() {
    this.sortOptions = SortBy.PRICE
    this.sortDirection = SortDirection.ASC;
  }


}

