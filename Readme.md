# Práctica de laboratorio · `<tarjeta-producto>`

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Completa |
|---|---|
| Emprendimiento |Venta de bebidas online |
| Estudiantes (Apellido Nombre): |Diego Alcaciega, Jose María Sandoval, Ian|Escobar|
| NRC | 36642 |
| Fecha | 18/10/2026|
| Enlace del repositorio | https://github.com/DiegoAlcaciega10/Componentes-web-componente.git|

## Propuesta del emprendimiento

- Nombre del emprendimiento: Vivant Web Drink

- Problema que resuelve:
- Falta de un espacio web interactivo donde los clientes puedan conocer las bebidas, sus beneficios y realizar pedidos en línea.  
- Los negocios tradicionales no aprovechan componentes web reutilizables que faciliten la experiencia del usuario (por ejemplo, catálogos dinámicos, carrito de compras, reseñas).  
- Se busca una solución que combine salud y tecnología web moderna.  

- Cliente al que se dirige:

- Jóvenes y adultos que buscan alternativas saludables y prácticas.  
- Consumidores digitales que valoran la usabilidad y rapidez en una página web.  
- Negocios pequeños que desean ofrecer bebidas diferentes con una experiencia moderna.  

## Cómo abrir el proyecto

1. Abre la carpeta en Visual Studio Code.
2. Clic derecho sobre `index.html` → **Open with Live Server**. Los módulos no cargan con `file://`.
3. Abre las herramientas del navegador (F12) y deja visible la pestaña **Consola**.

## Registro de los pasos

### Paso 1 · index.html y el módulo

- Etiqueta que registramos: tarjeta-producto
- ¿Por qué el nombre debe llevar guion?:
Agregar un guion evita conflictos con etiquetas propias de html,para que el navegador identifique correctamente que se trata de un componente personalizado
- Ruta del módulo y cómo lo importa la página:
- ./components/tarjeta-producto.js

### Paso 2 · Plantilla, Shadow DOM y slots

- Slots con nombre que tiene la plantilla: nombre, foto
- Texto de respaldo del slot sin nombre: Descripción no disponible
- ¿Qué pasaría si no usáramos `cloneNode(true)`?:
Al no cloneNode(true), los elementos de la plantilla se moverían en lugar de copiarse, vaciándola por completo tras el primer uso, además, el true es necesario para clonar todo su contenido interno, ya que sin él el resultado estaría completamente vacío.

### Paso 3 · Atributo precio y estilos

- Método que reacciona cuando cambia `precio`:
Metod attributeChangedCallback(name, oldValue, newValue)

- Color de marca (`--color-marca`) y dónde lo definimos:

- Valor de respaldo que usa el componente si la página no define la variable:

### Paso 4 · Tres productos del emprendimiento

| # | Producto | Precio |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
|---|---|
| | |
| | |
| | |
| | |

## Verificación

Marca con una `x` lo que ya comprobaste en el navegador.

- [ ] La etiqueta tiene guion.
- [ ] La página solo cambia lo que el componente expone con `var()`.
- [ ] `setAttribute` cambia el precio en pantalla.
- [ ] La consola no muestra errores.

Prueba que usamos en la consola:

```js
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

Resultado que vimos:

## Reto extra (opcional)

- [ ] Atributo `destacado` que cambia el borde con `:host([destacado])`.

## Uso de inteligencia artificial

- Herramienta usada (o «ninguna»):
- Para qué la consultamos:
- Qué cambiamos o comprobamos nosotros:
