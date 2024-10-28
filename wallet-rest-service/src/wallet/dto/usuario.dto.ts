import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {
  @ApiProperty({ description: 'Documento del usuario', example: '123456789' })
  @IsNotEmpty()
  @IsString()
  documento: string;

  @ApiProperty({ description: 'Celular del usuario', example: '111-111-1111' })
  @IsNotEmpty()
  @IsString()
  celular: string;
}
