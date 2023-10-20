# Next.js Teslo Shop App
Para correr localmente se necesita la base de datos.

#subir:
```
docker-compose up -d
```

#URL de conexion local
```
mongodb://localhost:27017/teslodb
```


## Configurar variables de entorno
Renombrar el archivo __.env.template__ a __.env__ y llenar los valores correctos.


## LLenar la DB con información de prueba

Llamar:
```
http://localhost:3000/api/seed
```