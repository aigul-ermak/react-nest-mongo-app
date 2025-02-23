import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';

import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {UserResponseDto} from "./dto/user-response.dto";
import {UserOutputModel} from "./dto/mapper/user.mapper";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({ summary: 'Creates a new user' })
    @ApiResponse({
        status: 201,
        description: 'User successfully created',
        type: UserResponseDto,
    })
    @ApiResponse({
        status: 409,
        description: 'Conflict - User with this email already exists',
    })
    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {

        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Find a user by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'User ID',
        example: '654e9a3f2f9b4a001d5c1234'
    })
    @ApiResponse({
        status: 200,
        description: 'User found',
        type: UserResponseDto ,
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

}
