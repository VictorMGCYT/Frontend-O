# Proyecto Next.js

Este es un proyecto basado en Next.js. Sigue las siguientes instrucciones para instalarlo y ejecutarlo correctamente.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Clona el repositorio y navega al directorio del proyecto:

```sh
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

Instala las dependencias utilizando la opción `--legacy-peer-deps` para evitar conflictos:

```sh
npm install --legacy-peer-deps
```

Si prefieres usar `yarn`, puedes instalar las dependencias con:

```sh
yarn install --ignore-engines
```

## Ejecución del proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```sh
npm run dev
```

o con yarn:

```sh
yarn dev
```

Esto iniciará el servidor en `http://localhost:3000/`.

## Construcción y despliegue

Para generar una versión optimizada para producción:

```sh
npm run build
npm run start
```

## Contacto

Si tienes preguntas o problemas, abre un issue en el repositorio o contacta al equipo de desarrollo.