import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: '654e9a3f2f9b4a001d5c1234', description: 'Unique user ID' })
    id: string;

    @ApiProperty({ example: 'john_doe', description: 'User login or username' })
    login: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;
}
