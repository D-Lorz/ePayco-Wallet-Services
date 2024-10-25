# Wallet SOAP Service

Este servicio es una simulación de un sistema de billetera virtual. Permite registrar clientes, recargar dinero en la billetera, realizar pagos y consultar el saldo.

## Instalación y configuración

```bash
$ npm install
```

### Variables de entorno

Estas variables de entorno se utilizan para configurar la conexión a la base de datos y el correo electrónico.

- `DATABASE_URL`: Conexión a la base de datos MySQL.
- `PORT`: Puerto del servidor del servicio SOAP.
- `USER_MAIL`: Dirección de correo electrónico del usuario.
- `PASS_MAIL`: Contraseña del usuario.
- `HOST_MAIL`: Host del servidor de correo electrónico.
- `SERVICE_MAIL`: Servicio de correo electrónico.

> ### Ejemplo de archivo .env
>
> ```.env
> DATABASE_URL=mysql://userDB:passwordDB@localhost:3306/wallet
> PORT=8000
> USER_MAIL=user@example.com
> PASS_MAIL=password
> HOST_MAIL=smtp.example.com
> SERVICE_MAIL=gmail
> ```

## Ejecución del servicio

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# Prisma commands
$ npx prisma migrate dev  # Aplicar migraciones
$ npx prisma generate      # Genera el cliente de Prisma basado en el esquema definido
```
