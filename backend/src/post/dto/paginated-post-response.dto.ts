import { ApiProperty } from '@nestjs/swagger';
import { PostResponseDto } from './post-response.dto';

export class PaginatedPostsResponseDto {
    @ApiProperty({ type: [PostResponseDto], description: 'List of posts' })
    posts: PostResponseDto[];

    @ApiProperty({ example: 1, description: 'Current page number' })
    page: number;

    @ApiProperty({ example: 10, description: 'Number of posts per page' })
    limit: number;

    @ApiProperty({ example: 100, description: 'Total number of posts' })
    total: number;

    @ApiProperty({ example: 10, description: 'Total number of pages' })
    totalPages: number;
}
