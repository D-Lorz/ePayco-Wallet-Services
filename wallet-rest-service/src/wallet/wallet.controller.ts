import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { RegistrarClienteDto } from './dto/registrar-cliente.dto';
import { RecargarBilleteraDto } from './dto/recargar-billetera.dto';
import { RealizarPagoDto } from './dto/realizar-pago.dto';
import { ConfirmarPagoDto } from './dto/confirmar-pago.dto';
import { ConsultarSaldoDto } from './dto/consultar-saldo.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('registrar-cliente')
  async registrarCliente(@Body() nuevoCliente: RegistrarClienteDto) {
    console.log(nuevoCliente);
    return this.walletService.registrarCliente(nuevoCliente);
  }

  @Post('recargar-billetera')
  async cargarBilletera(@Body() cargarBilletera: RecargarBilleteraDto) {
    return this.walletService.cargarBilletera(cargarBilletera);
  }

  @Post('realizar-pago')
  async realizarPago(@Body() nuevoPago: RealizarPagoDto) {
    return this.walletService.realizarPago(nuevoPago);
  }

  @Post('confirmar-pago')
  async confirmarPago(@Body() confirmarPago: ConfirmarPagoDto) {
    return this.walletService.confirmarPago(confirmarPago);
  }

  @Get('consultar-saldo')
  async consultarSaldo(@Query() consultarSaldo: ConsultarSaldoDto) {
    console.log(consultarSaldo.documento);
    return this.walletService.consultarSaldo(consultarSaldo);
  }
}
