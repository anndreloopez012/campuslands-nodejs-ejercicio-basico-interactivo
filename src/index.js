// En EcmaScript Modules en Node.js, las importaciones relativas
// OBLIGAN a incluir la extensión de archivo (.js).
import {
  agregarCamper,
  listarCampers,
  buscarCamperPorNombre
} from './campers.js';

// process.argv contiene todos los argumentos pasados en la terminal.
// Los dos primeros elementos corresponden a:
// [0]: Ruta del binario de Node
// [1]: Ruta absoluta de este script (src/index.js)
// Saltamos ambos con la desestructuración [, , ...]
const [, , comando, arg1, arg2] = process.argv;

// Menú de ayuda para orientar al alumno
function mostrarAyuda() {
  console.log(`
=====================================================
🚀 CAMPUSLANDS CLI - Gestor de Campers (Node.js ESM)
=====================================================
Uso:
  node src/index.js <comando> [argumentos]

Comandos disponibles:
  listar                     Muestra la tabla de todos los campers registrados
  agregar <nombre> <stack>   Registra un nuevo camper en campers.json
  buscar <nombre>            Busca campers coincidentes por nombre
  ayuda                      Muestra este menú de ayuda
  interactivo                Ejecuta el asistente interactivo de preguntas

Ejemplos:
  node src/index.js agregar "Carlos Morales" "Node.js"
  node src/index.js agregar "Sofia Castro" "React"
  node src/index.js listar
  node src/index.js buscar "Carlos"
  node src/index.js interactivo
=====================================================
`);
}

// En ESM podemos utilizar Top-Level await directamente en la raíz
// del archivo, dentro de un bloque try / catch sin función envolvente.
try {
  switch (comando) {
    case 'agregar': {
      const nuevo = await agregarCamper(arg1, arg2);
      console.log('\n✅ ¡Camper registrado con éxito en data/campers.json!');
      console.log(nuevo);
      break;
    }

    case 'listar': {
      const lista = await listarCampers();
      if (lista.length === 0) {
        console.log('\nℹ️ No hay campers registrados todavía.');
        console.log('💡 Registra uno usando: node src/index.js agregar "Nombre" "Stack"');
      } else {
        console.log(`\n📋 Campers Registrados (${lista.length}):`);
        console.table(lista);
      }
      break;
    }

    case 'buscar': {
      if (!arg1) {
        throw new Error('Debes ingresar un término de búsqueda. Ej: node src/index.js buscar "Carlos"');
      }
      const resultados = await buscarCamperPorNombre(arg1);
      if (resultados.length === 0) {
        console.log(`\n🔍 No se encontraron campers que coincidan con "${arg1}".`);
      } else {
        console.log(`\n🔍 Resultados para "${arg1}" (${resultados.length}):`);
        console.table(resultados);
      }
      break;
    }

    case 'interactivo': {
      // Import dinámico de EcmaScript para ejecutar el asistente si se solicita
      await import('./interactivo.js');
      break;
    }

    case 'ayuda':
    case '--help':
    case '-h':
      mostrarAyuda();
      break;

    default:
      if (comando) {
        console.warn(`\n⚠️ Comando desconocido: "${comando}"`);
      }
      mostrarAyuda();
      break;
  }
} catch (error) {
  console.error('\n❌ Error en la ejecución:', error.message);
  process.exitCode = 1;
}
