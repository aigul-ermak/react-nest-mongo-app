import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {CreateUserDto} from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import {UserRepo} from "../user/repositories/user.repo";
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from '@nestjs/config';
import {SessionRepo} from "../session/repositories/session.repo";
import {SessionQueryRepo} from "../session/repositories/session.query.repo";


@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepo,
        private readonly userQueryRepo: UserQueryRepo,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly sessionRepo: SessionRepo,
        private readonly sessionQueryRepo: SessionQueryRepo,
    ) {
    }

    async create(createUserDto: CreateUserDto) {

        const existsUserByLogin = await this.userQueryRepo.findOneByLoginOrEmail(createUserDto.login);
        const existsUserByEmail = await this.userQueryRepo.findOneByLoginOrEmail(createUserDto.email);

        if (existsUserByLogin) {
            throw new BadRequestException({
                errorsMessages: [
                    {
                        message: 'User with this login already exists',
                        field: 'login',
                    }
                ]
            });
        }

        if (existsUserByEmail) {
            throw new BadRequestException({
                errorsMessages: [
                    {
                        message: 'User with this email already exists',
                        field: 'email',
                    }
                ]
            });
        }

        const saltRounds: number = 10;
        const passwordHashed: string = await bcrypt.hash(createUserDto.password, saltRounds);


        const newUser = {
            login: createUserDto.login,
            email: createUserDto.email,
            password: passwordHashed,
        }

        const userId = await this.userRepo.create(newUser);

        if (!newUser) {
            throw new BadRequestException('User creation failed');
        }

        return userId;
    }

    async login(loginOrEmail: string, password: string) {

        const accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
        const accessExpiry = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');


        const refreshSecret: string | undefined = this.configService.get<string>('JWT_REFRESH_SECRET');
        const refreshExpiry: string | undefined = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');

        if (!accessSecret || !refreshSecret) {
            throw new Error('JWT_ACCESS_SECRET or JWT_REFRESH_SECRET is missing in environment variables');
        }

        const user = await this.validateUser(
            loginOrEmail,
            password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessTokenPayload = {loginOrEmail: loginOrEmail, id: user.id} as Record<string, any>;
        const refreshTokenPayload = {userId: user.id} as Record<string, any>;


        const accessToken = this.jwtService.sign(accessTokenPayload, {
            secret: accessSecret,
            expiresIn: accessExpiry || '10s',
        });

        const refreshToken = this.jwtService.sign(refreshTokenPayload, {
            secret: refreshSecret,
            expiresIn: refreshExpiry
        });


        const decodedToken = this.jwtService.decode(refreshToken) as { iat: number, exp: number };

        if (!decodedToken) {
            throw new Error('Failed to decode refresh token');
        }

        const iatDate = new Date(decodedToken.iat * 1000);
        const expDate = new Date(decodedToken.exp * 1000);

        const sessionUser = {
            userId: user.id,
            iatDate: iatDate,
            expDate: expDate
        }

        await this.sessionRepo.create(sessionUser);

        return {accessToken, refreshToken};
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    async getUser(id: string) {
        const user = await this.userQueryRepo.findOne(id);
        console.log("user", user)
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return ({
            "email": user?.email,
            "login": user?.login,
            "userId": user?.id
        })
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }

    async logout(id: string) {
        const session = await this.sessionQueryRepo.findOne(id);

        if (!session) {
            throw new UnauthorizedException('Session not found');
        }

        await this.sessionRepo.delete(id)

        return true;
    }

    private async validateUser(loginOrEmail: string, password: string) {

        const user = await this.userQueryRepo.findOneByLoginOrEmail(loginOrEmail);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}
