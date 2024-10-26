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
- `PORT_MAIL`: Puerto del servidor de correo electrónico.

> ### Ejemplo de archivo .env
>
> ```.env
> DATABASE_URL=mysql://userDB:passwordDB@localhost:3306/wallet
> PORT=8000
> USER_MAIL=maddison53@ethereal.email
> PASS_MAIL=jn7jnAPss4f63QBp6D
> HOST_MAIL=smtp.ethereal.email
> PORT_MAIL=587
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

## Tecnologías usadas

- **Node.js**: Un entorno de JavaScript que permite ejecutar código JavaScript en servidores web.
- **Express**: Un framework de Node.js para crear aplicaciones web y API RESTful.
- **SOAP**: Un protocolo de mensajes ligero que permite la comunicación entre diferentes sistemas a través de Internet.
- **Prisma**: Un ORM de generación de código de tipo en tiempo de ejecución (TypeScript) que ayuda a consultar la base de datos de manera segura y eficiente.
- **MySQL**: Un sistema de gestión de bases de datos relacionales potente y de código abierto.
- **Morgan**: Un middleware para Node.js que permite registrar las solicitudes HTTP en el servidor.
- **Nodemailer**: Una biblioteca de Node.js para enviar correos electrónicos.

---
