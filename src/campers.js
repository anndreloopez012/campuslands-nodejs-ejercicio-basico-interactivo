import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// En EcmaScript Modules, __dirname y __filename no existen de forma global.
// Usamos import.meta.url (estándar de JavaScript) y fileURLToPath para obtener
// la ruta absoluta en cualquier sistema operativo (Windows, macOS, Linux).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construimos la ruta segura hacia data/campers.json
const RUTA_DATA = path.join(__dirname, '..', 'data', 'campers.json');

/**
 * Lee el archivo campers.json de forma asíncrona.
 * Si el archivo no existe aún (error ENOENT), retorna un array vacío sin crashear.
 * @returns {Promise<Array<{id: number, nombre: string, stack: string, creadoEn: string}>>}
 */
export async function leerCampers() {
  try {
    const contenido = await fs.readFile(RUTA_DATA, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Guarda la lista completa de campers en campers.json con formato legible (2 espacios).
 * @param {Array} lista - Array de objetos camper.
 * @returns {Promise<void>}
 */
export async function guardarCampers(lista) {
  await fs.writeFile(RUTA_DATA, JSON.stringify(lista, null, 2), 'utf-8');
}

/**
 * Agrega un nuevo camper al archivo con validación, autoincremento de ID y sanitización.
 * @param {string} nombre - Nombre completo del camper.
 * @param {string} stack - Tecnología o stack del camper.
 * @returns {Promise<{id: number, nombre: string, stack: string, creadoEn: string}>}
 */
export async function agregarCamper(nombre, stack) {
  if (!nombre || !stack) {
    throw new Error('Debes ingresar nombre y stack.');
  }

  const campers = await leerCampers();

  const nuevoCamper = {
    id: campers.length > 0 ? campers[campers.length - 1].id + 1 : 1,
    nombre: nombre.trim(),
    stack: stack.trim(),
    creadoEn: new Date().toLocaleDateString('es-GT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  };

  campers.push(nuevoCamper);
  await guardarCampers(campers);

  return nuevoCamper;
}

/**
 * Retorna todos los campers registrados.
 * @returns {Promise<Array>}
 */
export async function listarCampers() {
  return await leerCampers();
}

/**
 * Busca campers por coincidencia insensible a mayúsculas/minúsculas.
 * @param {string} termino - Texto a buscar en el nombre.
 * @returns {Promise<Array>}
 */
export async function buscarCamperPorNombre(termino) {
  if (!termino) return [];
  const campers = await leerCampers();
  const filtro = termino.toLowerCase().trim();
  return campers.filter(c => c.nombre.toLowerCase().includes(filtro));
}
