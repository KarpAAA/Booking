import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async signIn(username: any, password: any) {
    const user = await this.userService.findUserByUsername(username);

    if (user && await bcrypt.compare(password, user?.password)) {
      const {password : p, ...other} = user;
      const payload = other;
      return {
        user,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
