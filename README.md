## Notas
1. Aunque hay un boton "siquienge" para añadir nuevos resultados a la pagina, tambien he implementado scroll infinito. Para verlo en uso es necesario empequeñecer la pagina o hacer varias cargas manuales.
2. Hay busqueda automatica a la vez que se escribe, pero no he sabido solucionar la condicion de carrera. El tamaño de la peticion a la api y su velocidad de respuesta lo mitigan, no he llegado a tener un problema.
2. El selector al lado de la caja de busqueda tiene tres de las categorías que ofrece la api, los detalles de las entradas de cada una una muestran contenidos distintos.
3. Se pueden desplegar y esconder los detalles de cada entrada haciendo y volviendo a hacer click.

## Funcionamiento
No he querido instalar los paquetes directamente sobre mi sistema, he aprovechado a usar docker. El yml está incluido, de sus servicios solo dos son necesarios

### `docker-compose up install`
Para montar node_modules, que no incluyo en el repo

### `docker-compose up start`
Para lanzar el servidor