import {IsString, Length, Matches} from "class-validator";
import {Trim} from "../../basics/transform/trim";
import {IsOptionalEmail} from "../../basics/validation/isOptionalEmail.decorator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Trim()
    @Length(3, 10, {message: "Length not correct"})
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Login can only contain letters, numbers, underscores, and hyphens.',
    })
    login: string

    @ApiProperty()
    @Length(6, 20, {message: "Length not correct"})
    password: string

    @ApiProperty()
    @IsOptionalEmail()
    email: string
}
