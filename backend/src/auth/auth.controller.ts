import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {UserLoginDto} from "../user/dto/user-login.dto";
import {Request, Response} from 'express';
import {RefreshTokenGuard} from "../basics/guards/refresh-token.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Post('/login')
    @HttpCode(200)
    async login(@Body() loginDto: UserLoginDto,
                @Req() req: Request,
                @Res() res: Response) {

        //const result = await this.authService.login(loginDto.loginOrEmail, loginDto.password);

        const {
            accessToken,
            refreshToken
        } = await this.authService.login(loginDto.loginOrEmail, loginDto.password);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({accessToken});
    }

    @Get()
    findAll() {
        return this.authService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authService.findOne(+id);
    }

    @Post('/registration')
    @HttpCode(204)
    async registration(
        @Body() createUserDto: CreateUserDto) {
        console.log("createUserDto", createUserDto)
        return this.authService.create(createUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authService.remove(+id);
    }

    @Post('/logout')
    @HttpCode(204)
    @UseGuards(RefreshTokenGuard)
    async logout(@Req() request: Request, @Res() res: Response) {

        if (!request.user) throw new UnauthorizedException('User info was not provided')

        const {id} = request.user

        await this.authService.logout(id);

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        res.send();
    }
}
