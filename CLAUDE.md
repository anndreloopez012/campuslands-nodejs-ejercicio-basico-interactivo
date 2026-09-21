# Directivas de Claude Code - Campuslands Node.js Ejercicio Básico Interactivo

## Descripción del Proyecto
Ejercicio práctico e interactivo de Node.js puro para estudiantes de Campuslands, utilizando exclusivamente EcmaScript Modules (ESM) y módulos nativos (`node:fs/promises`, `node:path`, `node:url`, `node:readline/promises`, `node:process`).

## Comandos Clave
- Ejecutar enrutador CLI: `node src/index.js [comando]`
- Ejecutar asistente interactivo: `npm run interactivo` (o `node src/interactivo.js`)
- Probar listado: `npm run test:cli`
- Modo observador: `npm run dev`

## Reglas Obligatorias de Código
- No instalar dependencias de npm (mantener 0 dependencias externas).
- Mantener `"type": "module"` en `package.json`.
- Siempre incluir la extensión `.js` en importaciones relativas.
- Usar `fileURLToPath(import.meta.url)` para resolución de rutas relativas seguras.
- Siempre cerrar la interfaz de readline en un bloque `finally { rl.close(); }`.
- Para sincronización de memoria y grafo, ejecutar `graphify update .` y refrescar Obsidian.
