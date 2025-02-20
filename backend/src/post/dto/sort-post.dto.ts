import {IsNumberString, IsOptional} from "class-validator";

export class SortPostsDto {
    // pageNumber?: number;
    // pageSize?: number;
    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}
