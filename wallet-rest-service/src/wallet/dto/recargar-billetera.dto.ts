import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { UsuarioDto } from './usuario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RecargarBilleteraDto extends UsuarioDto {
  @ApiProperty({ description: 'Valor a recargar', example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  valor: number;
}
