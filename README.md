# 🚀 Campuslands - Ejercicio Básico Interactivo en Node.js (ESM)

> **Guía pedagógica oficial** para campers de Campuslands. Aprende los fundamentos esenciales de Node.js moderno utilizando **EcmaScript Modules (ESM)**, la API nativa de Node.js y **cero dependencias externas**.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Module Type](https://img.shields.io/badge/modules-ESM%20(EcmaScript)-blue.svg)](https://nodejs.org/api/esm.html)
[![Dependencies](https://img.shields.io/badge/dependencies-0%20(100%25%20nativas)-success.svg)](package.json)
[![Campuslands](https://img.shields.io/badge/Campuslands-Bootcamp-orange.svg)](https://campuslands.com)

---

## 🎯 ¿Qué aprenderás en este proyecto?

Este repositorio fue diseñado para que entiendas **cómo funciona Node.js por dentro** antes de saltar a frameworks pesados como Express o NestJS:

1. **EcmaScript Modules (ESM) en Node.js**: Uso estándar de `import` y `export`, `"type": "module"`, y resolución moderna de rutas con `import.meta.url`.
2. **Persistencia asíncrona en disco (`node:fs/promises`)**: Lectura, escritura, parseo y serialización de datos en formato JSON sin bloquear el Event Loop.
3. **Manejo robusto de errores del sistema de archivos**: Detección y recuperación automática del error nativo `ENOENT` (archivo no encontrado).
4. **Construcción de herramientas CLI (`node:process`)**: Enrutamiento de comandos y argumentos de terminal mediante `process.argv`.
5. **Asistentes de terminal interactivos (`node:readline/promises`)**: Flujos de preguntas y respuestas asíncronas con pausas naturales mediante `await` y streams del sistema operativo (`process.stdin` / `process.stdout`).
6. **Flujo profesional de ramas en Git**: Estructura colaborativa con ramas de características (`feat/*`), rama de integración (`dev`) y rama de producción (`main`).

---

## 🏗️ Arquitectura y Estructura del Proyecto

```text
campuslands-nodejs-ejercicio-basico-interactivo/
├── data/
│   ├── campers.sample.json     # Plantilla inicial de ejemplo con datos base
│   └── campers.json            # Base de datos local autogenerada en ejecución
├── src/
│   ├── campers.js              # Capa de persistencia y operaciones CRUD con fs/promises
│   ├── index.js                # Enrutador CLI principal accionado por argumentos
│   └── interactivo.js          # Asistente de consola interactivo paso a paso con readline
├── .gitignore                  # Exclusión de archivos locales y temporales
├── AGENTS.md                   # Directivas y contexto para agentes de IA (Codex / Antigravity)
├── CLAUDE.md                   # Directivas y contexto para Claude Code
├── package.json                # Metadatos del proyecto y configuración "type": "module"
└── README.md                   # Guía didáctica integral para campers
```

---

## 📋 Requisitos Previos

Solo necesitas tener instalado en tu computadora:

- **Node.js 18.0.0 o superior** (se recomienda Node 20 LTS o Node 22).  
  Verifica tu versión en la terminal con:
  ```bash
  node -v
  ```
- **Git** para clonar el repositorio y practicar el flujo de ramas.

> 💡 **¡No requiere `npm install`!**  
> Todo el proyecto está construido usando **exclusivamente las librerías nativas** del núcleo de Node.js (`node:fs/promises`, `node:path`, `node:url`, `node:readline/promises`, `node:process`).

---

## ⚡ Instalación Rápida

1. Clona este repositorio en tu máquina:
   ```bash
   git clone https://github.com/anndreloopez012/campuslands-nodejs-ejercicio-basico-interactivo.git
   cd campuslands-nodejs-ejercicio-basico-interactivo
   ```

2. Ejecuta la ayuda inicial para verificar que todo funciona:
   ```bash
   node src/index.js ayuda
   ```

---

## 🕹️ Modos de Uso y Ejecución

El proyecto ofrece **dos formas** de interactuar con el sistema de campers:

### Modo 1: Comandos Directos por Consola (CLI)

Ideal para automatizaciones, scripts o ejecución rápida mediante argumentos:

#### 1. Mostrar el menú de ayuda
```bash
node src/index.js ayuda
```

#### 2. Registrar un nuevo camper
Pasa el nombre y el stack entre comillas para soportar espacios:
```bash
node src/index.js agregar "Carlos Morales" "Node.js & Express"
node src/index.js agregar "Sofia Castro" "React & Tailwind"
```

#### 3. Listar todos los campers registrados
Genera una tabla formateada en la consola usando `console.table`:
```bash
node src/index.js listar
```

#### 4. Buscar un camper por nombre o coincidencia parcial
```bash
node src/index.js buscar "Carlos"
```

---

### Modo 2: Asistente Interactivo de Consola

Diseñado para guiar al usuario mediante preguntas en tiempo real:

```bash
npm run interactivo
# o directamente:
node src/interactivo.js
```

Aparecerá el menú interactivo en tu terminal:

```text
╔════════════════════════════════════════════════════════╗
║     🌟 CAMPUSLANDS - ASISTENTE INTERACTIVO DE CONSOLA  ║
║            Aprende Node.js con EcmaScript Modules      ║
╚════════════════════════════════════════════════════════╝
Selecciona una de las siguientes opciones:
  [1] 📝 Registrar un nuevo camper
  [2] 📋 Listar todos los campers registrados
  [3] 🔍 Buscar camper por nombre
  [4] 🚪 Salir del asistente

👉 Elige una opcion (1-4):
```

---

## 🔍 Explicación Técnica de los Componentes

### 1. `package.json`: Habilitando EcmaScript Modules (ESM)

Para que Node.js interprete los archivos como módulos modernos de JavaScript (permitiendo `import` y `export` en lugar del antiguo `require`), debemos declarar:

```json
{
  "name": "campuslands-nodejs-ejercicio-basico-interactivo",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "interactivo": "node src/interactivo.js",
    "test:cli": "node src/index.js listar"
  }
}
```

* **`"type": "module"`**: Es la directiva obligatoria que activa ESM en todo el proyecto.
* **`node --watch`**: Característica moderna de Node (v18+) que recarga el código automáticamente cuando detecta cambios en el archivo.

---

### 2. `src/campers.js`: Módulo de Persistencia Asíncrona

Este módulo se encarga de guardar y leer los datos en `data/campers.json`.

#### ¿Cómo sustituir `__dirname` en ESM?
En CommonJS existía la variable global `__dirname`, pero en ESM **no existe**. Para obtener la ruta absoluta del directorio actual de forma estándar y multiplataforma (Windows, Linux, macOS), usamos:

```javascript
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// 1. Obtenemos la ruta del archivo actual convirtiendo el file:// URL a string de filesystem
const __filename = fileURLToPath(import.meta.url);

// 2. Obtenemos el directorio contenedor
const __dirname = dirname(__filename);

// 3. Construimos la ruta segura hacia data/campers.json
const RUTA_DB = join(__dirname, '..', 'data', 'campers.json');
```

#### Manejo elegante de archivos inexistentes (`ENOENT`)
Si el archivo `campers.json` aún no ha sido creado por primera vez, el sistema operativo arrojará el error con código `ENOENT`. En lugar de romper la aplicación, capturamos el error y retornamos un arreglo vacío:

```javascript
export async function leerCampers() {
  try {
    const contenido = await fs.readFile(RUTA_DB, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // El archivo no existe todavia, comenzamos con lista vacia
    }
    throw error; // Si es otro error (permisos, corrupcion), lo propagamos
  }
}
```

#### Escritura atómica con formato legible
Al serializar con `JSON.stringify(campers, null, 2)` garantizamos que el archivo sea legible para humanos con indentación de 2 espacios. Además, usamos `fs.mkdir(..., { recursive: true })` para garantizar que la carpeta `data/` exista antes de escribir:

```javascript
export async function guardarCampers(campers) {
  const carpeta = dirname(RUTA_DB);
  await fs.mkdir(carpeta, { recursive: true });
  await fs.writeFile(RUTA_DB, JSON.stringify(campers, null, 2), 'utf-8');
}
```

---

### 3. `src/index.js`: Enrutador de Consola con Argumentos

Analiza los argumentos enviados en la terminal a través de `process.argv`:

```javascript
// process.argv[0] = binario de node
// process.argv[1] = ruta de src/index.js
// process.argv[2] = comando solicitado (ej. "agregar", "listar")
const [, , comando, arg1, arg2] = process.argv;
```

Gracias a **Top-Level `await`** en ESM, podemos invocar funciones asíncronas directamente en la raíz del archivo:

```javascript
switch (comando) {
  case 'agregar': {
    const nuevo = await agregarCamper(arg1, arg2);
    console.log('✅ Camper registrado:', nuevo);
    break;
  }
  case 'listar': {
    const lista = await listarCampers();
    console.table(lista);
    break;
  }
}
```

---

### 4. `src/interactivo.js`: Asistente con Promesas Nativas

Utiliza `node:readline/promises` para interactuar con el camper en la terminal:

```javascript
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// Pausa la ejecucion hasta que el usuario escribe y presiona ENTER
const nombre = await rl.question('👤 Nombre del camper: ');
const stack = await rl.question('💻 Stack tecnológico: ');

// Es CRUCIAL cerrar la interfaz al terminar para liberar el Event Loop
rl.close();
```

---

## ⚠️ Errores Comunes en ESM y Cómo Solucionarlos

### 1. `ERR_MODULE_NOT_FOUND`
* **Error**: `Cannot find module './campers' imported from ...`
* **Causa**: En ESM, las importaciones relativas **obligan** a escribir la extensión `.js`.
* **Solución**:
  ```javascript
  // ❌ INCORRECTO en ESM:
  import { agregarCamper } from './campers';

  // ✅ CORRECTO en ESM:
  import { agregarCamper } from './campers.js';
  ```

### 2. `ReferenceError: __dirname is not defined in ES module scope`
* **Causa**: Intentar usar `__dirname` o `__filename` directamente como si fuera CommonJS.
* **Solución**: Usar `fileURLToPath(import.meta.url)` y `dirname(...)`.

### 3. La consola se queda "congelada" o no termina de ejecutarse
* **Causa**: Olvidar invocar `rl.close()` en `readline`. Node.js mantiene abierto el Event Loop mientras existan listeners activos en `process.stdin`.
* **Solución**: Ubicar siempre `rl.close()` dentro de un bloque `finally { ... }`.

---

## 🌿 Flujo Profesional de Ramas en Git

Este repositorio fue construido y publicado siguiendo la metodología de ramas de Campuslands:

```text
  main (producción estable)
    ↑
    └── dev (rama de integración)
          ↑
          ├── feat/01-setup-esm
          ├── feat/02-persistencia-campers
          ├── feat/03-cli-router
          ├── feat/04-interactivo-readline
          └── docs/guia-didactica-campuslands
```

### Ramas disponibles en el repositorio:
- `feat/01-setup-esm`: Inicialización de `package.json` con `"type": "module"`, `.gitignore` y datos muestra.
- `feat/02-persistencia-campers`: Implementación del módulo de lectura y escritura en disco con `node:fs/promises`.
- `feat/03-cli-router`: Enrutador de consola mediante `process.argv` y `switch`.
- `feat/04-interactivo-readline`: Asistente interactivo con menú paso a paso mediante `node:readline/promises`.
- `docs/guia-didactica-campuslands`: Documentación técnica pedagógica y directivas multi-agente.
- `dev`: Rama de desarrollo donde se integraron y probaron todas las características.
- `main`: Versión final verificada y lista para ser estudiada por los alumnos.

---

## 🚀 Retos Prácticos para Campers

Para consolidar lo aprendido, intenta implementar las siguientes mejoras:

1. **Reto 1: Eliminar Camper**: Agrega una función `eliminarCamperPorId(id)` en `campers.js` y expónla tanto en `index.js` (`node src/index.js eliminar 1`) como en el menú del asistente interactivo.
2. **Reto 2: Filtrar por Stack**: Agrega un comando `buscar-stack <tecnologia>` para mostrar únicamente a los campers que estudian un stack específico (ej. `Node.js`).
3. **Reto 3: Validar Duplicados**: Evita que se registre dos veces un camper con exactamente el mismo nombre (ignora mayúsculas y minúsculas).
4. **Reto 4: Exportar a CSV**: Crea una función que lea `campers.json` y genere un archivo `data/campers.csv` formateado.

---

## 👨‍🏫 Autor y Créditos

Desarrollado con dedicación para el bootcamp de **Campuslands**.  
*¡El código se aprende programando, experimentando y entendiendo cada línea!* 🚀
