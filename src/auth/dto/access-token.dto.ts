import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AccessTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'The access token for the user',
  })
  @Expose()
  access_token: string;
}
