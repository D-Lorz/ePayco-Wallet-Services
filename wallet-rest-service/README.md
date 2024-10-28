# Wallet REST Service

Este servicio REST se encarga de gestionar las operaciones de la billetera de un cliente, el cuál consume el servicio SOAP quién se encarga de interactuar con la base de datos.

## Instalación

```bash
$ npm install
```

## Variables de entorno

Estas variables de entorno se deben definir en el archivo `.env` para que el servicio funcione correctamente.

- `PORT`: Puerto en el que se ejecutará el servicio.
- `SOAP_SERVICE_URL`: URL del servicio SOAP.

> Archivo .env de ejemplo
>
> ```
> PORT=3000
> SOAP_SERVICE_URL=http://localhost:4000/soap/wallet?wsdl
> ```

## Ejecución de la App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

### Swagger

- **GET /api/**: Acceso a la documentación del sevicio REST con Swaggerr.

### Billetera

- **POST /api/v1/wallet/registra-cliente**: Registra un cliente en la base de datos.
- **POST /api/v1/wallet/recargar-billetera**: Recarga la billetera de un cliente.
- **GET /api/v1/wallet/consultar-saldo**: Consulta el saldo de un cliente en su billetera.
- **POST /api/v1/wallet/realizar-pago**: Realiza un pago de un cliente.
- **POST /api/v1/wallet/confirmar-pago**: Confirma un pago de un cliente con su id de sesion y token.

## Tecnologías usadas

- **NestJS**: Un framework de Node.js para la creación de aplicaciones RESTful.
- **TypeScript**: Un lenguaje de programación de JavaScript que agrega tipos y soporte para la programación orientada a objetos.
- **Swagger**: Usado para la documentación de la API REST.
- **Morgan**: Un middleware para la gestión de logs en modo desarrollo.
- **Class-validator**: Una librería de validación de datos para TypeScript.
- **Class-transformer**: Una librería de transformación de datos para TypeScript.

## Author

- [Dorian López](https://www.linkedin.com/in/dorian-lorz/)

## License

Nest is [MIT licensed](LICENSE).
