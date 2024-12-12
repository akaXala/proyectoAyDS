# Club de Leones AyDS 2025-1

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Nota

Es importante tener **yarn**, ya que la instalación con **npm** tiene conflictos con la nueva versión de React y las librerias.

## Instalación Yarn

Instala Yarn con el siguiente comando.

```bash
npm install -g yarn # -g para instalarlo global
```

```bash
yarn --version # Da la versión del Yarn
```

Para ejecutar Yarn en terminal, ejecuta el siguiente comando en el PowerShell como administrador.

```bash
Set-ExecutionPolicy Unrestricted # Permite que Yarn se ejecute en consola
```

## Getting Started

Clona el repositorio.

```bash
git clone https://github.com/akaXala/proyectoAyDS.git
```

Para el instalar y ejecutar el proyecto usamos **yarn**.

```bash
yarn install # Descarga las dependencias necesarias del proyecto
```
```bash
yarn dev # Compila y corre la página en el puerto 3000
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Creación objetos a partir entidades DB

Para crear objetos a partir de las entidades de la base de datos es necesario tener **pg-to-ts**, además de tener las credenciales de la DB y el certificado de .

Una vez tengas todos, ejecuta el siguiente comando con las respectivas credenciales y certificado.

```bash
npx pg-to-ts generate --conn "postgres://<nombreAdministrador>:<contraseña>@<URL>:<puertoDB>/<nombreDelSchema>?ssl=true&sslrootcert=<./rutaAlCertificadoPem>" --output ./src/ts/schemas.ts
```

## Librerias ocupadas

Estas son las librerias ocupadas por el proyecto

<ul>
       <li>Diseño</li>
       <ul>
              <li>Material UI (MUI)</li>
              <li>MUI X</li>
              <li>SweetAlert</li>
       </ul>
       <li>Funcionalidades</li>
       <ul>
              <li>bcrypt (encriptación de contraseñas)</li>
              <li>pg-to-ts (exportación de tablas SQL a objetos TS)</li>
              <li>jsonwebtoken (tokens de sesiones para página web)</li>
              <li>jose (tokens de sesiones para cualquier naveador)</li>
              <li>date-fns (estandarización de la fecha)</li>
       </ul>
</ul>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash
                          /\          /\
                         ( \\        // )
                          \ \\      // /
                           \_\\||||//_/
                            \/ _  _ \
                           \/|(O)(O)|
                          \/ |      |
      ___________________\/  \      /
     //                //     |____|
    //                ||     /      \
   //|                \|     \ 0  0 /
  // \       )         V    / \____/
 //   \     /        (     /
""     \   /_________|  |_/
       /  /\   /     |  ||
      /  / /  /      \  ||
      | |  | |        | ||
      | |  | |        | ||
      |_|  |_|        |_||
       \_\  \_\        \_\\ Hard'96
```