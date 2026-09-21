# Dados 3D

Mesa personal de dados de rol, instalable como PWA. Sin anuncios, cuentas, rastreadores ni servicios externos de ejecución.

## Usar e instalar

Abre la URL de GitHub Pages en Safari. Pulsa **Compartir → Añadir a pantalla de inicio → Abrir como app web** (si aparece la opción). El icono propio abre la mesa en una ventana independiente. En Chrome/Android usa **Instalar aplicación**.

Después de la primera carga completa, el service worker conserva los archivos para uso sin conexión. El navegador puede desalojar almacenamiento; vuelve a abrir con conexión si ocurre. Historial, preferencias y tiradas guardadas son locales al navegador/dispositivo, sin sincronización. Instalar en iOS puede crear almacenamiento independiente del usado en Safari.

## Funciones

- Caras planas delimitadas, aristas biseladas y esquinas redondeadas con acabado de resina. El colisionador convexo aproxima las pequeñas curvas de los bordes; las caras de apoyo y lectura coinciden.
- Física 3D de cuerpos convexos: gravedad, rebotes, fricción, colisiones y lectura de las caras que quedan hacia arriba.
- d4, d6, d8, d10, d12, d20, d100 con 2d10 y d1000 con 3d10.
- Perspectiva oblicua con bandeja 3D, lanzamientos conjuntos desde el borde y controles dentro de pantalla completa, con alternativa de pantalla ampliada en iPhone.
- Colores independientes por dado, selector de color al añadir y combinaciones guardadas con los presets.
- Hasta 20 dados físicos; arrastrar y soltar; fijar resultados para conservar dados.
- Modificador, ventaja/desventaja de 2d20, tiradas guardadas, 100 entradas de historial y exportación JSON.
- Tres superficies, siete colores (incluidos blanco, negro y rojo), números clásicos/romanos o puntos en d6, tamaño ajustable, elevación en perspectiva, sonido sintetizado, ahorro de batería, vibración y agitar en dispositivos compatibles.
- Interfaz en español, teclado, pantalla completa y adaptación a móviles.

Los resultados proceden de la simulación física; no son una fuente de aleatoriedad certificada. Un dado inclinado recibe un pequeño impulso hasta asentarse. El d4 se lee por el vértice superior. En d10, 0 significa 10; en percentiles, todos ceros significan 100/1000. La vibración y el sensor de movimiento dependen del navegador; iOS suele requerir permiso para movimiento y no admite la API de vibración.

## Publicar en GitHub Pages

En **Settings → Pages**, elige **Deploy from a branch**, rama **main**, carpeta **/docs**. Todos los recursos usan rutas relativas y se incluyen localmente. No se necesita servidor ni claves API.

La carpeta `dist/` es la versión de trabajo; `docs/` contiene la misma versión lista para Pages. El ZIP entregado contiene archivos listos para alojar.

## Desarrollo

Requiere Node.js 20 o posterior y Python 3 para el servidor local.

```sh
npm ci
npm run build
npm test
npm start
```

Abre http://localhost:4173. Tras modificar fuentes, ejecuta el build y copia los archivos de `dist/` a `docs/`. Incrementa `CACHE` en `sw.js` al actualizar recursos: la versión nueva se activa en la siguiente carga. No se guardan datos personales en este repositorio.

El núcleo físico se verifica con 180 lanzamientos (30 por sólido), comprobación de caras, rangos y recuperación de dados inclinados. La interfaz y la operación de tirada se verificaron en navegador. La instalación física en iPhone debe completarse desde Safari en el dispositivo.

## Dependencias y créditos

Interfaz y geometrías creadas para esta aplicación. Three.js y cannon-es, licencias MIT; avisos en `THIRD_PARTY_NOTICES.txt`. esbuild y sharp se usan para preparar los archivos. Referencia funcional: Real RPG Dice Free; no se reutilizan su código ni sus recursos.

## Icono actual

Imagen hiperrealista original generada de dos dados d6 recién lanzados, negro y rojo, con puntos blancos. Versiones PNG para favicon, Apple, PWA y recorte maskable.

## Visibilidad en teléfonos

En pantallas pequeñas, los dados usan una escala física y visual 1,5 veces mayor. La mesa ocupa más altura, la cámara reduce márgenes y la superficie se adapta a la orientación y al número de dados. Los dados inclinados se relanzan en una zona libre para evitar bloqueos por apilamiento.

## Lanzamientos ascendentes y audio

Los dados reciben impulsos verticales y giros diferentes en sus tres ejes. La subida los acerca a la cámara mediante perspectiva real, con una altura máxima adaptada al punto de vista. La gravedad conserva el control de la caída. El sonido sintetizado se activa por contacto, con intensidad según la velocidad del impacto, carácter amortiguado para el fieltro, golpes más agudos entre dados, posición estéreo y compresión para controlar la suma de impactos.
