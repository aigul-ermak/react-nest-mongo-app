import {IsString, Length, Matches} from "class-validator";
import {Trim} from "../../basics/transform/trim";
import {IsOptionalEmail} from "../../basics/validation/isOptionalEmail.decorator";

export class CreateUserDto {
    @IsString()
    @Trim()
    @Length(3, 10, {message: "Length not correct"})
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Login can only contain letters, numbers, underscores, and hyphens.',
    })
    login: string

    @Length(6, 20, {message: "Length not correct"})
    password: string

    @IsOptionalEmail()
    email: string
}
