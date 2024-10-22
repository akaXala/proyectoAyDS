# Proyecto AyDS
Proyecto para Análisis y Diseño de Sistemas 2025/1

## Proyecto Club de Leones
Repositorio para el desarollo de la aplicación y el changelog

## Requisitos
- Tener instalado **node.js**

## Instrucciones
- Clonar el repositorio con:
```bash
git clone https://github.com/akaXala/proyectoAyDS.git
```

    En caso de no tener git, clonar con Github Desktop (para poder sincronizar de forma fácil) o directamente descargar los archivos y hacer los cambios de la página de GitHub

- Una vez clonado el repositorio ir a la carpeta donde este ha sido clonado
- El proyecto ya esta configurado, puedes compilar el proyecto con:
```bash
npm run build
```
- Una vez compilado el proyecto puedes correlo con:
```bash
npm start
```

- Esto imprimira un "hola mundo" (sujeto a cambios)

## Consideraciones
- En la carpeta *src* se encuentran todos los archivos TypeScript
- Al compilar los TypeScript podrás encontrar los JavaScript en *dist*
- En el archivo *tsconfig.json* podrás cambiar la ruta de donde se encuentran los TS y donde quieres que se guarden los JS, aunque **NO ES RECOMENDADO** cambiar las rutas
