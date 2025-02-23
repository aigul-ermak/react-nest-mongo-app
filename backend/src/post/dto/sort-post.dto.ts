import {IsNumberString, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SortPostsDto {
    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    page?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumberString()
    limit?: number;
}
