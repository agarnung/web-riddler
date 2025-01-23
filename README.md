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

# Crear una app como esta desde cero?
* Tener instalado: Node.js y Git
* Tener una cuenta de Vercekl y Hugging Face
* Inicializar un proyecto astro dentro de la carpeta del repositorio: ```npm create astro@latest```. Seguimos los pasos típicos y tendremos un árbol de este tipo:
```
alejandro@pop-os:/opt/proyectos/web-riddler/$ tree -L 1
.
├── astro.config.mjs
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
├── src
└── tsconfig.json
```
* Instalar dependencias necesarias dentro del proyecto creado: ```npm install```
* Ejecutar el proyecto en local para ver que funciona: ```npm run dev```. Si sí, se abrirá la aplicación incial de Astro entrando desde el navegador en ```http://localhost:4321```
* Configurar Vercel para el despligue a producción... Instalar la CLI de Vercel: ```npm i -g vercel```. Conectar nuestro proyecto a Vercel: ```vercel```. Seguir las instrucciones (inciiar sesión y vincular proyecto con cuenta de Vercel).
* Desplegar la aplicación: ```vercel deploy```. Esto generará una URL donde se podrá acceder a la aplicación web en remoto. Desde la web de Vercel, en Configuración => Dominio, se puede ver el nombre del dominio al que acceder para entrar en la web, e.g. ```web-riddler.vercel.app```.
* Para usar HuggingFace

Si se hacen modificaciones al proyecto, una vez satisfecho habiéndolas comprobado en local con ```npm run dev```, basta con desplegar a producción de nuevo a través de Vercel, mediante ```vercel deploy --prod```, y la aplicación se actualizará en el dominio personalizado.

# Extensiones de VSCode:
* svelte
* svelte-preview
* Tailwind CSS IntelliSense
* Type Script
* Astro

# References:
- https://www.youtube.com/watch?v=gUs-Sissb48&ab_channel=NetNinja
- https://es.wikipedia.org/wiki/Notpron

