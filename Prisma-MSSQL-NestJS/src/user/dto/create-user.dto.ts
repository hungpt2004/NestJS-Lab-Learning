import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
   @ApiProperty()
   @IsNotEmpty({ message: 'Name cannot be empty' })
   name: string;
}  