# Libreria de juego CRUD Supabase + React

Este proyecto es una aplicación web construida con React y Supabase que permite a los usuarios registrarse, iniciar sesión y gestionar una lista de videojuegos. Los usuarios pueden crear, leer, editar y eliminar juegos, así como acceder únicamente a ciertas rutas si están autenticados. La información se almacena y gestiona mediante Supabase.

## Descripción del Proyecto

Esta aplicación tiene como objetivo demostrar cómo construir un sistema completo CRUD (Create, Read, Update, Delete) utilizando React para el frontend y Supabase como backend-as-a-service. Además, incorpora un sistema de autenticación que restringe el acceso a rutas protegidas para usuarios no autenticados.

Permite a los usuarios:
- Registrarse y crear una cuenta.
- Iniciar sesión y cerrar sesión.
- Crear nuevos juegos con título, descripción, imagen, comentarios y calificaciones.
- Editar o eliminar juegos existentes.
- Ver la lista de juegos.
- Acceder solo a rutas protegidas si han iniciado sesión correctamente.
  

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
- Crear un nuevo juego llenando un formulario con los campos requeridos.
- Editar los detalles de un juego existente.
- Eliminar cualquier juego registrado.
- Visualizar la lista completa de juegos almacenados.
- Cerrar sesión.

Cada entrada incluye:
- title: Título del juego
- description: Breve descripción
- imageUrl: Enlace a la imagen del juego
- comments: Comentarios del usuario
- ratings: Calificación del juego

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

![image](https://github.com/user-attachments/assets/02f727e0-430d-4d43-a27e-9304692d8ee8)

## Características
- Autenticación de usuarios (registro, login, logout).
- Protección de rutas según el estado de autenticación.
- CRUD de juegos con título, descripción, imagen, comentarios y calificaciones.
- Gestión del estado con React Hooks

## Créditos
https://www.youtube.com/watch?v=tW1HO7i9EIM&t=745s

https://www.codingnepalweb.com/responsive-registration-form-in-html-css/

https://medium.com/@kenaszogara/tutorial-create-simple-login-form-with-reactjs-31965ed3ccfa
