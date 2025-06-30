import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';
import { logRed, logYellow } from './src/funciones/logsCustom.js';

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
 * Ejecuta una query usando un pool específico o el por defecto.
 *
 * @param {string} query              SQL con placeholders `?`
 * @param {any[]} [values=[]]         Valores para placeholders
 * @param {boolean} [log=false]       Activa logs si es true
 * @param {0|1|2|3} [whichPool=0]     0=default,1=aplanta,2=colecta,3=asignaciones
 */
export async function executeQuery(
    query,
    values = [],
    log = false,
    whichPool = 0
) {
    const formatted = mysql2.format(query, values);
    // coerce a número en caso de venir como string:
    const poolId = Number(whichPool);

    // DEBUG
    logYellow(`Ejecutando con whichPool = ${whichPool} (poolId = ${poolId})`);

    let executor;
    switch (poolId) {
        case 1:
            logYellow('Usando poolAplanta');
            executor = poolAplanta;
            break;
        case 2:
            logYellow('Usando poolColecta');
            executor = poolColecta;
            break;
        case 3:
            logYellow('Usando poolAsignaciones');
            executor = poolAsignaciones;
            break;
        default:
            logYellow('Usando pool por defecto');
            executor = pool;
    }

    try {
        if (log) logYellow(`Query → ${formatted}`);
        const [rows] = await executor.execute(query, values);
        if (log) logYellow(`OK → ${rows.length} filas`);
        return rows;
    } catch (err) {
        if (log) logRed(`Error → ${err.message}`);
        throw err;
    }
}
