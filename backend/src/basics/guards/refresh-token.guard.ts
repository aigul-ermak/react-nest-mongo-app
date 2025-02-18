import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Request} from 'express';
import {RefreshTokenType} from "../../auth/dto/types/accessTokenType";


@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private configService: ConfigService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest<Request>();
        const refreshToken = request.cookies?.refreshToken;
        const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token found');
        }

        try {
            const decoded = this.jwtService.verify(refreshToken, {secret: refreshSecret});

            const {id}: RefreshTokenType = decoded;

            request.user = {id};

            return true;
        } catch (error) {

            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Refresh token has expired');
            }

            throw new UnauthorizedException(`Invalid refresh token: ${error}`);

        }
    }
}
