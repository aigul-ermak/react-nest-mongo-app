import {IsNumberString, IsOptional} from "class-validator";

export class SortPostsDto {
    // pageNumber?: number;
    // pageSize?: number;
    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;
}
