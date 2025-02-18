import {Body, Controller, Delete, Get, HttpCode, Param, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateAuthDto} from './dto/create-auth.dto';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Post()
    create(@Body() createAuthDto: CreateAuthDto) {
        // return this.authService.create(createAuthDto);
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
}
