import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    example: 'cuid12345',
    description: 'The unique identifier of the user',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the registered user',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the registered user',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: new Date(),
    description: 'The date the user was created',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the user was last updated',
  })
  @Expose()
  updatedAt: Date;
}
