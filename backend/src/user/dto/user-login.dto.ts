import {Trim} from "../../basics/transform/trim";
import {IsNotEmpty, IsString} from "class-validator";

export class UserLoginDto {
    @Trim()
    @IsString()
    @IsNotEmpty()
    loginOrEmail: string;

    @Trim()
    @IsString()
    @IsNotEmpty()
    password: string;
}