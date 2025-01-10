Este proyecto fue elaborado con la Ingeniera Andrea Rivero
Quien realizó el entrenamiento del modelo keras, este modelo
ha sido transformado a JSON para utilizarlo en el navegador
pero no se encuentra en este repositorio por decisión de la
Ingeniera.

## Pasos a Seguir

Ejecutar el siguiente comando para clonar el repositorio.

```
    git clone https://github.com/uvdevelop26/resonancia-project.git
```

## Abrir el proyecto en VS code

``` 
   cd resonancia-project
   code .
```

## Configurar el backend

Ingresa a la carpeta backend e instala npm

```
    cd backend
    npm install
```

Después de crear una base de datos mysql abrir el
archivo en el directorio "config/config.json"

```
{
  "development": {
    "username": "root", //username de la db
    "password": null, //contraseña de la db si tiene
    "database": "db_resonancia", //nombre de la base de datos
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

Ejecuta las migraciones en la terminal con el comando:

```
    npx sequelize-cli db:migrate

```

Ejecuta los seeders en la terminal con el comando:

```

    npx sequelize-cli db:seed:all

```

Finalmente levanta el servidor ingresando el siguiente comando:

```
    nodemon app

```

## Configura el frontend

Abre obra terminal y navega al frontend, luego ejecuta:

```
    npm install

```

Abre el servidor local ejecutando el comando:

```
npm run dev

```
Abre el servidor que provee en la terminal del frontend "http://localhost:5173/"


## Ingresa al Sistema utilizando el usuario admin@example.com y la contraseña 12345678
