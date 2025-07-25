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


// ! esto no tengo idea si esta bien 
const accountList = {};

// Configuración de base de datos de producción
const hostProductionDb = process.env.PRODUCTION_DB_HOST;
const portProductionDb = process.env.PRODUCTION_DB_PORT;

// Crea una conexión personalizada a MySQL
export function createCustomConnection(config) {
  const connection = mysql2.createConnection(config);
  connection.connect(err => {
    if (err) {
      logRed(`Error al conectar: ${err.message}`);
    } else {
      logYellow('Conexión establecida correctamente');
    }
  });
  return connection;
}

// Devuelve la configuración de conexión para una empresa
export function getProdDbConfig(company) {
  return {
    host: hostProductionDb,
    user: company.dbuser,
    password: company.dbpass,
    database: company.dbname,
    port: portProductionDb,
  };
}

/**
 * Carga y cachea las cuentas de clientes para una empresa y sender.
 * @param {object} dbConnection - Conexión MySQL.
 * @param {string|number} companyId - ID de la empresa.
 * @param {string|number} senderId - ID del sender.
 * @returns {Promise<object|null>} - Datos de la cuenta o null.
 */
export async function loadAccountList(dbConnection, companyId, senderId) {
  try {
    const query = `
      SELECT did, didCliente, ML_id_vendedor 
      FROM clientes_cuentas 
      WHERE superado = 0 AND elim = 0 AND tipoCuenta = 1 AND ML_id_vendedor != ''
    `;
    // Usar executeQuery con el pool adecuado si es necesario
    const result = await new Promise((resolve, reject) => {
      dbConnection.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (!accountList[companyId]) {
      accountList[companyId] = {};
    }

    result.forEach(row => {
      const keySender = row.ML_id_vendedor;
      accountList[companyId][keySender] = {
        didCliente: row.didCliente,
        didCuenta: row.did,
      };
    });

    return accountList[companyId][senderId] || null;
  } catch (error) {
    logRed(`Error en loadAccountList: ${error.stack}`);
    throw error;
  }
}