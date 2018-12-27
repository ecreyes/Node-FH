# Nodejs Fundamentos

## Instalar dependencias para ejecutar un proyecto.
Cuando se descarga un repositorio con el proyecto, este no contiene la carpeta node_modules con los paquetes que necesita e proyecto para ejecutarse,por lo cual se debe ejecutar el comando:
```javascript
npm install
```
Jamas subir la carpeta node_modules al repositorio porque los paquetes varian en diferentes sistemas operativos.
## Cómo instalar paquetes en el proyecto.
Antes de poder instalar algun paquete se debe crear el archivo `package.json`, para crear este archivo se utiliza el comando:
```javascript
npm init
```
una vez creado el archivo se pueden instalar los paquetes.

Hay tres formas básicas de instalar paquetes con el npm:
* global: permite usar los paquetes en cualquier proyecto.
* producción: los paquetes instalados son para el proyecto y son necesarios para que el servidor funcione.
* desarrollo: los paquetes solo son utilizados en ambientes de desarrollo, por lo cuál en producción no son necesarios.

Para instalar un paquete de forma global:
```javascript
npm install -g nombreModulo
```
Instalar un paquete para producción:
```javascript
npm install nombreModulo --save
```
Instalar un paquete para desarrollo:
```javascript
npm install nombreModulo --save-dev 
```
Desinstalar cualquier paquete:
```javascript
npm uninstall nombreModulo
```

## Cómo ejecutar un proyecto
Para ejecutar un proyecto se puede utilizar `node` que viene por defecto pero no reinicia el servidor cuando hay cambios, o `nodemon` si el paquete esta instalado, por ejemplo:
```javascript
node nombreArchivo
```
o también:
```javascript
nodemon nombreArchivo
```