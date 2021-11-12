# Ejercicio FS (filesystem)

Este ejercicio consistirá en crear 3 funciones, una función leerá el archivo, la segunda función agregará un nuevo usuario al archivo y la tercera función eliminará todos los usuarios del arreglo del archivo **users.json.**

## Objeto usuario

```jsx
{
	firstname: "",
	lastname: "",
	email: "",
	password: ""
}
```

- [ ]  Clonar el repositorio en tu equipo.
- [ ]  Instalar las dependencias con `**npm install**` .
- [ ]  Escribir tu código en el archivo **`index.js`**.
- [ ]  Completar la lógica de la función `**getUsers**` para leer y regresar el arreglo de usuarios.
- [ ]  Completar la lógica de la función **`addUser`** para leer, agregar un usuario en el arreglo y escribirlo en el archivo **users.json**.
- [ ]  Completar la lógica de la función **`clearUsers`** para eliminar los usuarios del arreglo.
- [ ]  Correr y pasar las pruebas con **`npm test`.**

## Notas

- Recuerda usar **`try/catch`** cuando uses **`async/await`**
- Investiga como convertir la notación JSON a un objeto literal de Javascript y como convertir un objeto literal de Javascript a notación JSON.
- Recuerda agregar el objeto usuario como nuevo elemento para el arreglo en la función `**addUser**`.
- Recuerda usar `**spread operator**` (...) o `**.push**` para poder agregar un elemento en el arreglo.
- Recuerda volver a convertir a JSON el objeto o arreglo que quieres escribir de vuelta en el archivo.
- Sólo debes de modificar el archivo **`index.js`** y de ser necesario **`users.json`**.

El repositorio con el código se encuentra en el siguiente enlace:

[https://gitlab.com/academlo-full-stack-jun21-node/ejercicio-filesystem](https://gitlab.com/academlo-full-stack-jun21-node/ejercicio-filesystem)

Filesystem promises [https://www.notion.so/M-dulos-JS-Moderno-1f1ca3bfd5a04a60ba7b47c23a6c51e5](https://www.notion.so/M-dulos-JS-Moderno-1f1ca3bfd5a04a60ba7b47c23a6c51e5)