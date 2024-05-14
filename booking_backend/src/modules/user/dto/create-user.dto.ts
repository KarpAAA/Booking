import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Role } from "../../../entities/user/role.type";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(8, 99)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 99)
  password: string;

  @IsEnum(Role)
  role: Role;
}
