import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../modules/auth/auth.module";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );

        request["user"] = payload;
      } catch {

      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if ("authorization" in request.headers) {
      const authorizationHeaderValue: string = request.headers.authorization as string;
      const [type, token] = authorizationHeaderValue.split(" ") ?? [];
      return type === "Bearer" ? token : undefined;
    }
    return undefined;
  }
}