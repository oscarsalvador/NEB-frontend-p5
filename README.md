## Como instalar y correr el proyecto
1. `docker-compose up front-install`	
1. `docker-compose up front-start`	
1. Navegar a `localhost:8083`


## Funcionalidades
- Vista de todos los personajes con imagen, nombre y status (el asterisco que cambia de color) usando flex.

- Lista de paginas con anterior y siguiente, primero y ultimo, y puntos si hay una o mas paginas entre la actual y las extremas. La animacion css no es mia, la he sacado de [este](https://www.the-art-of-web.com/css/3d-transforms/) articulo. Lo unico que he hecho es meterla en emotion.

- Scroll infinito usando fetchMore. A partir de la pagina a la que se haya saltado usando el punto anterior, al llegar al fondo pido mas resultados. Es la funcionalidad que peor he implementado, y no he sido capaz de solucionar los problemas con los que lo entrego. Cada vez que hago el fetchMore, se recarga la pagina y se pierde la posicion del scroll en la que se estuviese. Lo he mitigado con un timeout y un salto forzado hasta justo antes del nuevo fondo. 

- Despliegue de un modal al pulsar sobre la imagen de cualquier personaje. Sustituyo los campos que vengan sin definir por "--" y uso un diccionario para dar uno de tres colores al texto del estatus, segun su valor. La parte interesante del modal son los checkboxes que he puesto. He aprovechado que trabajamos con graphql para hacer peticiones con @skip. Hay tres campos de la peticion detallada que dependen de hooks guardados en el padre (se guarda entre vistas detalladas). Los elementos en el modal estan ordenados con flex, y se ajustan al tamaño de la pantalla.


