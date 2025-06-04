# Libreria de juego CRUD Supabase + React

Este proyecto es una aplicación web con React + Supabase que permite a los usuarios registrarse, iniciar sesión y gestionar una biblioteca de videojuegos. Integra autenticación, operaciones CRUD y visualización comparativa de precios de juegos entre distintas tiendas ficticias. Los administradores pueden gestionar juegos, categorías y sitios web directamente desde la plataforma.

## Descripción del Proyecto

Esta aplicación tiene como objetivo demostrar cómo construir un sistema completo CRUD (Create, Read, Update, Delete) utilizando React para el frontend y Supabase como backend-as-a-service. Además, incorpora un sistema de autenticación que restringe el acceso a rutas protegidas para usuarios no autenticados.

Permite a los usuarios:
- Registrarse y crear una cuenta.
- Iniciar sesión y cerrar sesión.
- Admin: Crear nuevos juegos con título, descripción, imagen, comentarios y calificaciones.
- Admin: Editar, crear o borrar categorías, páginas o juegos.
- Ver la lista de juegos.
- Acceder solo a rutas protegidas si han iniciado sesión correctamente.
- Visualizar los juegos y sus precios
  

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso del Proyecto](#uso-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Características](#características)
- [Créditos](#créditos)

## Instalación

Sigue los pasos a continuación para ejecutar el proyecto localmente:

1. Clona el repositorio:
   git clone https://github.com/Anahi606/SupabaseCRUD
   O descargalo manualmente como zip y descomprimelo.
2. Navega a la carpeta del proyecto:
   cd SupabaseCRUD
4. Instala las dependencias:
   yarn
5. Solicita las variables de entorno a la autora del proyecto, es decir el archivo .env que deberas poner en la carpeta root del proyecto
   
   ![image](https://github.com/user-attachments/assets/4cbd5079-1189-4d44-b73d-1a478b9a0c23)
7. Inicia la aplicación:
   yarn start
   

## Uso del Proyecto
Una vez iniciado el proyecto, podrás:

- Regístrate con un correo electrónico y una contraseña válidos.
- Inicia sesión para acceder al panel principal.
- Admin: Crear un nuevo juego llenando un formulario con los campos requeridos.
- Admin: Editar los detalles de un juego existente.
- Admin: Eliminar cualquier juego registrado.
- Visualizar la lista completa de juegos almacenados.
- Admin: Editar, crear o borrar categorías/páginas.
- Cerrar sesión.

Cada entrada incluye:
- title: Título del juego
- description: Breve descripción
- imageUrl: Enlace a la imagen del juego
- comments: Comentarios del usuario
- ratings: Calificación del juego
- category_id: Categoria del juego
- price: precio del juego en una página

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

![image](https://github.com/user-attachments/assets/a66fc19a-88c4-4c55-b309-8393e6674a08)


## Características
- Autenticación de usuarios (registro, login, logout).
- Protección de rutas según el estado de autenticación.
- CRUD de juegos con título, descripción, imagen, comentarios y calificaciones.
- Gestión del estado con React Hooks
- Comparación de precios por juego entre páginas ficticias.
- Filtro por categoría.
- Anuncios de juegos relacionados por categoría.

## Créditos
https://www.youtube.com/watch?v=tW1HO7i9EIM&t=745s

https://www.codingnepalweb.com/responsive-registration-form-in-html-css/

https://medium.com/@kenaszogara/tutorial-create-simple-login-form-with-reactjs-31965ed3ccfa
