import { ApiProperty } from '@nestjs/swagger';

export class BlogResponseDto {
    @ApiProperty({ example: '1234567890abcdef', description: 'Unique blog ID' })
    id: string;

    @ApiProperty({ example: 'My Blog', description: 'Title of the blog' })
    title: string;

    @ApiProperty({ example: 'A blog about tech and programming', description: 'Description of the blog' })
    description: string;

    @ApiProperty({ example: '654e9a3f2f9b4a001d5c1234', description: 'Author ID who created the blog' })
    authorId: string;

    @ApiProperty({ example: '2025-02-25T12:34:56.789Z', description: 'Timestamp when the blog was created' })
    createdAt: Date;

    @ApiProperty({ example: '2025-02-26T10:00:00.000Z', description: 'Timestamp when the blog was last updated' })
    updatedAt: Date;
}
