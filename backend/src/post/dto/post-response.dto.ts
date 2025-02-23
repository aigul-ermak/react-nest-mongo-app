import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
    @ApiProperty({ example: '1234567890abcdef', description: 'Unique post ID' })
    id: string;

    @ApiProperty({ example: 'My First Post', description: 'Title of the post' })
    title: string;

    @ApiProperty({ example: 'This is the content of the post', description: 'Content of the post' })
    content: string;

    @ApiProperty({ example: '654e9a3f2f9b4a001d5c1234', description: 'Blog ID where the post belongs' })
    blogId: string;

    @ApiProperty({ example: '654e9a3f2f9b4a001d5c123', description: 'Author ID of the post' })
    authorId: string;

    @ApiProperty({ example: '2025-02-25T12:34:56.789Z', description: 'Timestamp when the post was created' })
    createdAt: string;
}
