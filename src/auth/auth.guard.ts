import {
  CanActivate,
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants/constants';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const token: any = this.extractTokemFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });
      request['username'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokemFromHeader(request: any): Promise<any> {
    try {
      const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
