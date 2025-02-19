import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();


        const refreshToken = request.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('No valid token found in cookies');
        }

        try {
            const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
            const payload = await this.jwtService.verifyAsync(refreshToken, {secret});

            request.user = payload;
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            }
            throw new UnauthorizedException('Invalid token');
        }
    }
}
