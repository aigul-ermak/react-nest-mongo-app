import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';

import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        console.log("createUserDto", createUserDto)
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

}
