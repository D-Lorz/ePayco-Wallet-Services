import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { UsuarioDto } from './usuario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrarClienteDto extends UsuarioDto {
  @ApiProperty({ description: 'Nombres del cliente', example: 'Juan Perez' })
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty({
    description: 'Email del cliente',
    example: 'juanperez@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
