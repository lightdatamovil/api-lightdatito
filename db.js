import dotenv from 'dotenv';
import { logRed, logYellow } from './src/funciones/logsCustom.js';

dotenv.config({ path: process.env.ENV_FILE || ".env" });

export function getDbConfig(companyId) {
    return {
        // host: "localhost",
        user: "root",
        password: "78451296",
        database: "mydb",
        port: 3306
    };
}

export async function executeQuery(connection, query, values, log) {
    const formattedQuery = connection.format(query, values);

    try {
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, results) => {
                logYellow(`Ejecutando query: ${formattedQuery}`);
                if (err) {
                    if (log) {
                        logRed(`Error en executeQuery: ${err.message} en query: ${formattedQuery}`);
                    }
                    reject(err);
                } else {
                    if (log) {
                        logYellow(`Query ejecutado con éxito: ${formattedQuery} - Resultados: ${JSON.stringify(results)}`);
                    }
                    resolve(results);
                }
            });
        });
    } catch (error) {
        logRed(`Error en executeQuery: ${error.stack}`);
        throw error;
    }
}
