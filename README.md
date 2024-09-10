## Pasos a Seguir

En la carpeta de tu elección hacer click derecho y abrir Git Bush

```
    git clone https://github.com/uvdevelop26/resonancia-project.git
```

## Abrir el proyecto en VS code

``` 
   cd resonancia-project
   code .
```

## Instalar dependencias

Instala npm en la carpeta backend

```
    cd backend
    npm install
```
Instala npm en la carpeta frontend

```
    cd ../
    cd frontend
    npm install
```

## Configurar base de datos

En el directorio backend/config/db.js configura la base de datos

```
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu-contraseña',
    database: 'db_resonancia'
});


```   

## Encripta la contraseña

Navega al backend (cd backend) y ejecuta:

```
nodemon encrypt_password

```


## Levanta el servidor para explorar el sistema

Levanta el servidor del backend
```
cd backend
nodemon app

```
abre otra terminal y levanta el frontend

```
cd frontend
npm run dev

```
Abre el servidor que provee en la terminal del frontend "http://localhost:5173/"

## Ingresa al Sistema utilizando el usuario usuarioadm@gmail.com y la contraseña 123456
