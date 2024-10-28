import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { UsuarioDto } from './usuario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RealizarPagoDto extends UsuarioDto {
  @ApiProperty({ description: 'Valor del pago', example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  monto: number;

  @ApiProperty({ description: 'Referencia del pago', example: 'Laptop' })
  @IsNotEmpty()
  @IsString()
  referencia: string;
}
