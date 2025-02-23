import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cC...', description: 'JWT access token' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cC...', description: 'JWT refresh token' })
    refreshToken: string;
}
