import {Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserLoginDto} from "../user/dto/user-login.dto";
import {Request, Response} from 'express';
import {RefreshTokenGuard} from "../basics/guards/refresh-token.guard";
import {JwtAuthGuard} from "../basics/guards/jwtAuthGuard";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {LoginResponseDto} from "./dto/login-response.dto";
import {AuthenticatedUserDto} from "./dto/auth-user.dto";
import {RegistrationResponseDto} from "./dto/registration-response.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @ApiOperation({summary: 'User login'})
    @ApiResponse({status: 200, description: 'User logged in', type: LoginResponseDto})
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid credentials',
    })
    @Post('/login')
    @HttpCode(200)
    async login(@Body() loginDto: UserLoginDto,
                @Req() req: Request,
                @Res() res: Response) {


        const {
            accessToken,
            refreshToken
        } = await this.authService.login(loginDto.loginOrEmail, loginDto.password);

        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     domain: '.onrender.com',
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        return res.json({accessToken, refreshToken});
    }

    @ApiOperation({summary: 'Authenticates a user'})
    @ApiResponse({status: 200, description: 'Returns authenticated user details', type: AuthenticatedUserDto})
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User info was not provided or user not found',
    })
    @Get('/me')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async getUser(
        @Req() request: Request
    ) {
        if (!request.user) throw new UnauthorizedException('User info was not provided')

        const {userId} = request.user;

        return this.authService.getUser(userId);
    }

    @ApiOperation({summary: 'Registers a new user'})
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: RegistrationResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Login or Email already exists',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User info was not provided',
    })
    @Post('/registration')
    @HttpCode(204)
    async registration(
        @Body() createUserDto: CreateUserDto) {

        return this.authService.create(createUserDto);
    }


    @ApiOperation({summary: 'Logs out the user'})
    @ApiResponse({
        status: 204,
        description: 'User successfully logged out',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User info was not provided or session not found',
    })
    @Post('/logout')
    @HttpCode(204)
    @UseGuards(RefreshTokenGuard)
    async logout(@Req() request: Request, @Res() res: Response) {

        if (!request.user) throw new UnauthorizedException('User info was not provided')

        const {id} = request.user

        await this.authService.logout(id);

        // res.clearCookie('refreshToken', {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     domain: '.onrender.com',
        // });

        res.send();
    }
}
