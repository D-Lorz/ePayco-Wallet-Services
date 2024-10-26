# ePayco Wallet Services

## Descripción del Proyecto

Este proyecto implementa un sistema de billetera virtual, donde los usuarios pueden registrar sus datos, cargar dinero a su billetera, realizar pagos y consultar su saldo. El servicio está diseñado utilizando dos arquitecturas: SOAP y REST, donde el servicio REST actúa como un puente entre el cliente y el servicio SOAP.

### SERVICIO SOAP

*[wallet-soap-service](wallet-soap-service)*

### SERVICIO REST

*[wallet-rest-service](wallet-rest-service)*

---

## Funcionalidades

### Registro Clientes

- **Método**: `registroCliente`
- **Parámetros**:
  - Documento (string)
  - Nombres (string)
  - Email (string)
  - Celular (string)

**Descripción**: Este método registra un nuevo cliente. Todos los campos son requeridos. El servicio SOAP devolverá un mensaje con el código de error correspondiente y un mensaje de éxito o fallo.

### Recarga Billetera

- **Método**: `recargaBilletera`
- **Parámetros**:
  - Documento (string)
  - Número de Celular (string)
  - Valor (decimal)

**Descripción**: Permite cargar dinero en la billetera del usuario. Responde con un mensaje de éxito o fallo.

### Pagar

- **Método**: `pagar`
- **Parámetros**:
  - Documento (string)
  - Número de Celular (string)
  - Monto (decimal)

**Descripción**: Permite realizar un pago. Se generará un token de 6 dígitos que se envía al correo del usuario registrado. El id de sesión debe ser usado para confirmar la compra.

### Confirmar Pago

- **Método**: `confirmarPago`
- **Parámetros**:
  - ID de Sesión (string)
  - Token (string)

**Descripción**: Valida el ID de sesión y el token enviado al correo. Si todo es correcto, se descuenta el monto de la billetera y se genera un mensaje de éxito o fallo.

### Consultar Saldo

- **Método**: `consultarSaldo`
- **Parámetros**:
  - Documento (string)
  - Número de Celular (string)

**Descripción**: Consulta el saldo de la billetera. Ambos valores deben coincidir.

## Estructura de Respuesta

Todas las respuestas, tanto del servicio SOAP como del REST, manejan el mismo formato de respuesta.

```json
{
  "success": true, // o false
  "cod_error": "00", // Código de error, "00" si es éxito
  "message_error": "Mensaje explicativo",
  "data": {} // Array u objeto con las respuestas
}
```

## Author

- [Dorian López](https://www.linkedin.com/in/dorian-lorz/)

---