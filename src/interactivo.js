// Modulo nativo de Node.js para interfaces interactivas en terminal con soporte nativo de Promesas
import * as readline from 'node:readline/promises';
// Streams nativos de entrada (stdin) y salida (stdout) del sistema operativo
import { stdin as input, stdout as output } from 'node:process';

// Importamos las operaciones de persistencia desde nuestro modulo ESM
import {
  agregarCamper,
  listarCampers,
  buscarCamperPorNombre
} from './campers.js';

/**
 * Muestra el banner inicial y las opciones disponibles en la terminal.
 */
function mostrarMenu() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     🌟 CAMPUSLANDS - ASISTENTE INTERACTIVO DE CONSOLA  ║
║            Aprende Node.js con EcmaScript Modules      ║
╚════════════════════════════════════════════════════════╝
Selecciona una de las siguientes opciones:
  [1] 📝 Registrar un nuevo camper
  [2] 📋 Listar todos los campers registrados
  [3] 🔍 Buscar camper por nombre
  [4] 🚪 Salir del asistente
`);
}

/**
 * Funcion principal que gestiona el ciclo de vida de la sesion interactiva.
 */
export async function iniciarAsistente() {
  // AbortController nativo para gestionar el fin de flujo (EOF, pipes, cancelacion)
  const ac = new AbortController();
  const onEnd = () => ac.abort();
  input.on('end', onEnd);

  // Creamos la interfaz de lectura asociando stdin y stdout
  const rl = readline.createInterface({ input, output });

  /**
   * Helper seguro para solicitar informacion al usuario con soporte de abort signal.
   * Si el flujo termina abruptamente (EOF/Pipe), retorna null de forma segura.
   */
  async function pedirEntrada(mensaje) {
    try {
      return await rl.question(mensaje, { signal: ac.signal });
    } catch {
      return null;
    }
  }

  try {
    let continuar = true;

    while (continuar) {
      mostrarMenu();
      const respuesta = await pedirEntrada('👉 Elige una opcion (1-4): ');

      if (respuesta === null) {
        break;
      }

      const opcion = respuesta.trim();

      switch (opcion) {
        case '1': {
          console.log('\n--- 📝 Registro de Nuevo Camper ---');
          const nombre = await pedirEntrada('👤 Nombre completo del camper: ');
          if (nombre === null) {
            continuar = false;
            break;
          }

          const stack = await pedirEntrada('💻 Stack tecnológico (ej. Node.js, React, Backend): ');
          if (stack === null) {
            continuar = false;
            break;
          }

          if (!nombre.trim() || !stack.trim()) {
            console.log('⚠️ Advertencia: El nombre y el stack no pueden estar vacios.\n');
            break;
          }

          const nuevoCamper = await agregarCamper(nombre, stack);
          console.log('\n🎉 ¡Camper registrado exitosamente en el archivo JSON!');
          console.log(nuevoCamper);
          break;
        }

        case '2': {
          console.log('\n--- 📋 Listado Oficial de Campers ---');
          const campers = await listarCampers();

          if (campers.length === 0) {
            console.log('ℹ️ Aun no hay campers registrados en la base de datos local.');
          } else {
            console.table(campers);
            console.log(`Total registrados: ${campers.length}`);
          }
          break;
        }

        case '3': {
          console.log('\n--- 🔍 Busqueda de Campers ---');
          const criterio = await pedirEntrada('🔎 Ingresa el nombre o parte del nombre a buscar: ');
          if (criterio === null) {
            continuar = false;
            break;
          }

          if (!criterio.trim()) {
            console.log('⚠️ Advertencia: Debes escribir un termino de busqueda.\n');
            break;
          }

          const resultados = await buscarCamperPorNombre(criterio);
          if (resultados.length === 0) {
            console.log(`❌ No se encontraron coincidencias para "${criterio.trim()}".`);
          } else {
            console.table(resultados);
            console.log(`Coincidencias encontradas: ${resultados.length}`);
          }
          break;
        }

        case '4': {
          console.log('\n👋 ¡Gracias por utilizar el Asistente Interactivo de Campuslands!');
          console.log('🚀 Continua practicando y dominando Node.js con ESM.\n');
          continuar = false;
          break;
        }

        default:
          console.log(`\n⚠️ Opcion "${opcion}" no reconocida. Por favor ingresa un numero del 1 al 4.`);
          break;
      }

      if (continuar) {
        const pausa = await pedirEntrada('\n⏎ Presiona ENTER para continuar...');
        if (pausa === null) {
          continuar = false;
        }
      }
    }
  } catch (error) {
    if (error?.name !== 'AbortError' && error?.code !== 'ERR_USE_AFTER_CLOSE') {
      console.error('\n💥 Ocurrio un error inesperado:', error.message);
    }
  } finally {
    // Retiramos el listener y cerramos la interfaz para permitir que el proceso de Node.js termine
    input.off('end', onEnd);
    rl.close();
  }
}

// Top-Level await para ejecutar el asistente si se invoca directamente
await iniciarAsistente();
