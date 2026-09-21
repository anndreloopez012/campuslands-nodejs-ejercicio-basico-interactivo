# 🚀 Release v1.0.0 - Campuslands Node.js Interactivo (ESM)

¡Bienvenidos al lanzamiento oficial de **`campuslands-nodejs-ejercicio-basico-interactivo`**! Este proyecto fue concebido como el recurso didáctico definitivo para que los estudiantes de Campuslands dominen los fundamentos esenciales de Node.js moderno utilizando **EcmaScript Modules (ESM)**, librerías nativas y **cero dependencias de terceros**.

---

## 🌐 Presentación Web en Vivo (GitHub Pages)

Explora las diapositivas interactivas, explicaciones paso a paso y simulador en vivo directamente en tu navegador:
👉 **[https://anndreloopez012.github.io/campuslands-nodejs-ejercicio-basico-interactivo/](https://anndreloopez012.github.io/campuslands-nodejs-ejercicio-basico-interactivo/)**

---

## ✨ Características Principales

1. **EcmaScript Modules (ESM) Nativo:**
   - Configuración `"type": "module"` en `package.json`.
   - Uso de `import` y `export` con extensiones de archivo explícitas (`.js`).
   - Resolución de rutas de sistema modernas mediante `node:url` (`fileURLToPath`) y `node:path`.
   - Utilización de **Top-Level `await`** directamente en la raíz de los archivos.

2. **Persistencia en Disco Asíncrona (`node:fs/promises`):**
   - Operaciones seguras de lectura y escritura en `data/campers.json`.
   - Captura y recuperación automática del código de error nativo `ENOENT`.
   - Formateo legible de archivos JSON mediante `JSON.stringify(..., null, 2)`.

3. **Herramienta de Consola CLI (`node:process`):**
   - Enrutador modular accionado por argumentos con `process.argv` y `switch`.
   - Comandos para registrar campers, listar en tablas con `console.table`, buscar por nombre y consultar ayuda.

4. **Asistente Interactivo de Terminal (`node:readline/promises`):**
   - Menú guiado con preguntas secuenciales y pausas asíncronas naturales.
   - Manejo seguro de finalización de streams (`stdin` / `stdout`) y cierre de interfaz en bloque `finally`.

---

## 📦 Modos de Ejecución

```bash
# 1. Asistente interactivo en terminal
npm run interactivo

# 2. Comandos directos de consola (CLI)
node src/index.js agregar "Carlos Morales" "Node.js & Express"
node src/index.js listar
node src/index.js buscar "Carlos"
node src/index.js ayuda
```

---

## 🌿 Flujo de Ramas Implementado

Este proyecto se desarrolló y publicó siguiendo el flujo profesional de ramas:
- `feat/01-setup-esm`
- `feat/02-persistencia-campers`
- `feat/03-cli-router`
- `feat/04-interactivo-readline`
- `docs/guia-didactica-campuslands`
- `feat/05-github-pages-web`
- `dev` (rama de integración)
- `main` (rama de producción)
