import { ApiProperty } from '@nestjs/swagger';
import { BlogResponseDto } from './blog-response.dto';

export class PaginatedBlogsResponseDto {
    @ApiProperty({ type: [BlogResponseDto], description: 'List of blogs' })
    blogs: BlogResponseDto[];

    @ApiProperty({ example: 1, description: 'Current page number' })
    page: number;

    @ApiProperty({ example: 5, description: 'Number of blogs per page' })
    limit: number;

    @ApiProperty({ example: 100, description: 'Total number of blogs' })
    total: number;

    @ApiProperty({ example: 20, description: 'Total number of pages' })
    totalPages: number;
}
