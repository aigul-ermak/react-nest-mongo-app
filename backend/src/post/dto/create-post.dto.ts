import {IsString, Length} from "class-validator";
import {Trim} from "../../basics/transform/trim";
import {IsValidBlogId} from "../../basics/validation/isValidBlogId.decorator";


export class CreatePostDto {
    @IsString()
    @Trim()
    @Length(1, 30, {message: "Length not correct"})
    title: string;

    @IsString()
    @Trim()
    @Length(1, 100, {message: "ShortDescription not correct"})
    shortDescription: string;

    @IsString()
    @Trim()
    @Length(1, 1000, {message: "Content not correct"})
    content: string;


    @IsString({message: 'It should be a string'})
    @IsValidBlogId()
    blogId: string;
}
