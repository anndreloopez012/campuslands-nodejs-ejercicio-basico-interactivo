# Protocolo Multi-Agente - Campuslands Node.js Ejercicio Básico Interactivo

Este repositorio forma parte de los proyectos de formación de Campuslands y utiliza el protocolo de sincronización continua con Obsidian Vault y Graphify para colaboración entre agentes (Antigravity, Codex y Claude Code).

---

## 1. Arquitectura y Tecnologías
- **Entorno:** Node.js 18.0.0+ puro (Zero external dependencies).
- **Módulos:** 100% EcmaScript Modules (ESM) con `"type": "module"` en `package.json`.
- **Importaciones relativas:** Extensión obligatoria `.js` (ej. `import { agregarCamper } from './campers.js'`).
- **Rutas del sistema:** Reemplazo estándar de `__dirname` con `fileURLToPath(import.meta.url)` y `dirname`.
- **Estructura principal:**
  - `src/campers.js`: Módulo de persistencia asíncrona con `node:fs/promises` y manejo de `ENOENT`.
  - `src/index.js`: Enrutador CLI de comandos con `process.argv` y Top-Level `await`.
  - `src/interactivo.js`: Asistente de terminal interactivo con `node:readline/promises` y gestión segura de flujos.
  - `data/campers.sample.json`: Plantilla base de datos.
  - `data/campers.json`: Base de datos de ejecución local (excluida en `.gitignore`).

---

## 2. Protocolo de Memoria Continua (Obsidian + Graphify)
Al realizar cambios en este repositorio, los agentes deben cumplir estrictamente:

1. **Inspección Previa:**
   - Ejecutar `git status --short` antes de modificar archivos.
2. **Actualización de Grafo y Memoria:**
   - Actualizar el grafo: `graphify update .` o `graphify .`.
   - Exportar a Obsidian:
     ```bash
     graphify export obsidian --dir "$HOME/Documents/Obsidian Vault/Memoria/Graphify/campuslands-nodejs-ejercicio-basico-interactivo"
     ```
   - Sincronizar memoria: `memoria refresh`.
   - Registrar validaciones o decisiones:
     ```bash
     memoria registrar campuslands-nodejs-ejercicio-basico-interactivo --tipo validacion --titulo "..." --texto "..."
     ```
3. **Flujo de Ramas Git:**
   - Todo trabajo nuevo se realiza en ramas `feat/*` o `docs/*`.
   - Se integran a `dev` mediante `git merge --no-ff`.
   - La rama `main` se mantiene en sincronía con versiones estables aprobadas desde `dev`.
