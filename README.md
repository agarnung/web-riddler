# game-a

* Astro: Un framework para construir sitios web rápidos (combinado con Svelte).
* Svelte: Un framework para construir componentes de interfaz de usuario.
* TypeScript: Un superconjunto de JavaScript que añade tipado estático.
* Tailwind CSS: Un framework CSS para estilos utilitarios.
* API personalizada: Contiene una API en src/pages/api/embedding.ts.

# Requisitos:
* [Node.js](https://nodejs.org/es) ([para Linux](https://nodejs.org/en/download)) (versión recomendada: 16 o superior).
* [npm](https://docs.npmjs.com/cli/v8/commands/npm-install) o [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable): Administradores de paquetes que vienen con Node.js.
* [VS Code](https://code.visualstudio.com/docs/setup/setup-overview).

# Pasos:
1. Clonar el proyecto y acceder a la raíz 
```bash
cd /opt/guessword
```
2. Instalar las dependencias definidas en el ```package.json```, desde la raíz del proyecto:
```bash
npm install
```
3. Levantar en ```http://localhost:3000``` el sevidor de desarrollo de la web con Astro:
```bash
npx astro dev
```
4. (Opcional) Construir una versión lista para producción:
```bash
npx astro build
```

# Opciones de hosting:
Aparte de levantar la web en local, para que sae accesible desde cualquier lugar se necesita desplegarla en un servidor o plataforma de hosting web. Algunas opciones son:

- Plataformas de Hosting Estático (recomendado para Astro)
	- Vercel (el usado): Optimizado para frameworks como Astro, es rápido y tiene integración automática con GitHub/GitLab.
	- Netlify: Ideal para proyectos estáticos o con funciones serverless.
	- GitHub Pages: Para hosting gratuito, aunque no soporta funciones serverless directamente.
- Hosting Completo
	- VPS (Virtual Private Server): Usar un servidor como DigitalOcean, AWS EC2, o Linode, donde configuras manualmente tu entorno.
	- Heroku: Soporta tanto aplicaciones estáticas como backends dinámicos.
	- Render: Similar a Heroku, pero con precios más competitivos.
- Plataformas de Contenedores
	- Docker + Kubernetes: Si tu proyecto es más complejo o necesitas control total.

# Extensiones de VSCode:
* svelte
* svelte-preview
* Tailwind CSS IntelliSense
* Type Script
* Astro

# References:
- https://www.youtube.com/watch?v=gUs-Sissb48&ab_channel=NetNinja
- https://es.wikipedia.org/wiki/Notpron

