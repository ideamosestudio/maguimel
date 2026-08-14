# Textil Maguimel

Sitio institucional estático de Textil Maguimel, publicado con GitHub Pages en [textilmaguimel.com.ar](https://textilmaguimel.com.ar/).

## Desarrollo

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

## Validación y publicación

```bash
npm run lint
npm test
```

El comando de build genera la salida estática en `docs/`. GitHub Pages publica la rama `main` desde esa carpeta y conserva el dominio personalizado mediante `docs/CNAME`.

## Formulario

El frontend envía las consultas a `https://api.textilmaguimel.com.ar/contact.php`. El receptor PHP que debe alojarse en el cPanel se conserva como referencia en `cpanel/contact.php`.

## Estructura

- `app/`: páginas, componentes, contenido y estilos.
- `public/`: imágenes y archivos públicos.
- `scripts/export-pages.mjs`: exportación estática para GitHub Pages.
- `cpanel/contact.php`: endpoint propio del formulario.
- `docs/`: salida generada y publicada.
