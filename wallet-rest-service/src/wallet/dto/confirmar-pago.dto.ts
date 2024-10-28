import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ConfirmarPagoDto {
  @ApiProperty({
    description: 'Session ID del pago',
    example: `session-g878eoo7k6i`,
  })
  @IsNotEmpty()
  @IsString()
  idSesion: string;

  @ApiProperty({ description: 'Token del pago', example: 262322 })
  @IsNotEmpty()
  @IsNumber()
  token: number;
}
