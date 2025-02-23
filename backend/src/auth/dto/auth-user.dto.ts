import { ApiProperty } from '@nestjs/swagger';

export class AuthenticatedUserDto {
    @ApiProperty({ example: '1234567890abcdef', description: 'Unique user ID' })
    userId: string;

    @ApiProperty({ example: 'john_doe', description: 'User login or username' })
    login: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;
}
