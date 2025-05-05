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

/**
 * Ejecuta una query usando el pool y devuelve las filas como promesa.
 * @param {string} query - SQL con placeholders `?`
 * @param {any[]} [values] - Valores para los placeholders
 * @param {boolean} [log=false] - Si true, emite logs de la query
 */
export async function executeQuery(query, values = [], log = false) {
    const formatted = mysql2.format(query, values);
    try {
        if (log) logYellow(`Ejecutando query: ${formatted}`);
        const [rows] = await pool.execute(query, values);
        if (log) logYellow(`Query OK: ${formatted} → ${rows.length} filas`);
        return rows;
    } catch (err) {
        if (log) logRed(`Error en executeQuery: ${err.message} → ${formatted}`);
        throw err;
    }
}
