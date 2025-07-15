import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import { logPurple, logRed, logYellow } from './src/funciones/logsCustom.js';

dotenv.config({ path: process.env.ENV_FILE || '.env' });

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const poolAplanta = mysql2.createPool({
  host: process.env.DB_APLANTA_HOST,
  user: process.env.DB_APLANTA_USER,
  password: process.env.DB_APLANTA_PASS,
  database: process.env.DB_APLANTA_NAME,
  port: process.env.DB_APLANTA_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const poolColecta = mysql2.createPool({
  host: process.env.DB_COLECTA_HOST,
  user: process.env.DB_COLECTA_USER,
  password: process.env.DB_COLECTA_PASS,
  database: process.env.DB_COLECTA_NAME,
  port: process.env.DB_COLECTA_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const poolAsignaciones = mysql2.createPool({
  host: process.env.DB_ASIGNACIONES_HOST,
  user: process.env.DB_ASIGNACIONES_USER,
  password: process.env.DB_ASIGNACIONES_PASS,
  database: process.env.DB_ASIGNACIONES_NAME,
  port: process.env.DB_ASIGNACIONES_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
/**
 * Ejecuta una query usando un pool específico (o el por defecto).
 *
 * @param {string}   query     SQL con placeholders `?`
 * @param {any[]}    values    Valores para placeholders
 * @param {boolean}  log       Si true, imprime logs
 * @param {0|1|2|3}  whichPool 0=default,1=aplanta,2=colecta,3=asignaciones
 */
export async function executeQuery(
  query,
  values = [],
  log = false,
  whichPool = 0
) {
  const startTime = performance.now();
  // 1) Elige el pool
  const poolId = Number(whichPool);
  let executor;
  switch (poolId) {
    case 1:
      logYellow("Usando poolAplanta");
      executor = poolAplanta;
      break;
    case 2:
      logYellow("Usando poolColecta");
      executor = poolColecta;
      break;
    case 3:
      logYellow("Usando poolAsignaciones");
      executor = poolAsignaciones;
      break;
    default:
      logYellow("Usando pool por defecto");
      executor = pool;
  }

  const formattedQuery = mysql2.format(query, values);

  const result = new Promise((resolve, reject) => {
    if (log) logYellow(`Ejecutando query: ${formattedQuery}`);

    executor.query(formattedQuery, (err, results) => {
      if (err) {
        if (log) {
          logRed(`Error en executeQuery: ${err.message} - ${formattedQuery}`);
          logPurple(`Query ejecutada en ${performance.now() - startTime} ms`);
        }
        return reject(err);
      }
      if (log) {
        logYellow(`Query ejecutada con éxito: ${formattedQuery} - Resultados: ${JSON.stringify(results)}`);
        logPurple(`Query ejecutada en ${performance.now() - startTime} ms`);
      }
      resolve(results);
    });
  });
  return result;
}