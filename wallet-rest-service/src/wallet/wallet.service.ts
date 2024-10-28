import { Injectable } from '@nestjs/common';
import * as soap from 'soap';

const soapUrl =
  process.env.SOAP_SERVICE_URL || 'http://localhost:4000/soap/wallet?wsdl';

@Injectable()
export class WalletService {
  formatResponse(success: boolean, code: string, message: string, data: any) {
    return { success, cod_error: code, message_error: message, data };
  }

  async registrarCliente(args) {
    console.log('Servicio de registro de cliente', args);
    const client = await soap.createClientAsync(soapUrl);
    return new Promise((resolve, reject) => {
      client.RegistrarCliente(args, (err, result) => {
        if (err)
          return reject(
            this.formatResponse(false, '01', 'Fallo al registrar cliente', err),
          );
        resolve(JSON.parse(result.return));
      });
    });
  }

  async cargarBilletera(args) {
    const client = await soap.createClientAsync(soapUrl);
    return new Promise((resolve, reject) => {
      client.RecargarBilletera(args, (err, result) => {
        if (err)
          return reject(
            this.formatResponse(
              false,
              '01',
              'Fallo al recargar billetera',
              err,
            ),
          );
        resolve(JSON.parse(result.return));
      });
    });
  }

  async realizarPago(args) {
    const client = await soap.createClientAsync(soapUrl);
    return new Promise((resolve, reject) => {
      client.Pagar(args, (err, result) => {
        if (err)
          return reject(
            this.formatResponse(false, '01', 'Fallo al realizar el pago', err),
          );
        resolve(JSON.parse(result.return));
      });
    });
  }

  async confirmarPago(args) {
    const client = await soap.createClientAsync(soapUrl);
    return new Promise((resolve, reject) => {
      client.ConfirmarPago(args, (err, result) => {
        if (err)
          return reject(
            this.formatResponse(false, '01', 'Fallo al confirmar el pago', err),
          );
        resolve(JSON.parse(result.return));
      });
    });
  }

  async consultarSaldo(args) {
    const client = await soap.createClientAsync(soapUrl);
    return new Promise((resolve, reject) => {
      client.ConsultarSaldo(args, (err, result) => {
        if (err)
          return reject(
            this.formatResponse(
              false,
              '01',
              'Fallo al consultar el saldo',
              err,
            ),
          );
        resolve(JSON.parse(result.return));
      });
    });
  }
}
