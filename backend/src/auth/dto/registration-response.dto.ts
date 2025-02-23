import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseDto {
    @ApiProperty({ example: '1234567890abcdef', description: 'User ID of the newly registered user' })
    userId: string;
}
