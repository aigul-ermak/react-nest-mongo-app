import {Trim} from "../../basics/transform/trim";
import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty()
    @Trim()
    @IsString()
    @IsNotEmpty()
    loginOrEmail: string;

    @ApiProperty()
    @Trim()
    @IsString()
    @IsNotEmpty()
    password: string;
}