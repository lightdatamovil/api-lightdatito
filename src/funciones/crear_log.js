import mysql2 from 'mysql';

export async function crearLog(idLogistica, operador, endpoint, result, quien, idDispositivo, modelo, marca, versionAndroid, versionApp) {
    const dbConfig = getDbConfig(logistica.did);
    const dbConnection = mysql2.createConnection(dbConfig);

    return new Promise((resolve, reject) => {
        dbConnection.connect((err) => {
            if (err) {
                return reject({ error: "error", details: err.message });
            }

            const sql = `
                INSERT INTO logs (logistica, operador, request, response, quien, dispositivo, uid, appversion)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                idLogistica,
                operador,
                endpoint,
                JSON.stringify(result),
                quien,
                `${modelo} ${marca} ${versionAndroid}`,
                idDispositivo,
                versionApp
            ];

            const queryString = mysql2.format(sql, values);

            dbConnection.query(sql, values, (err, results) => {
                dbConnection.end();
                if (err) {
                    return reject({ error: "error", details: err.message, query: queryString });
                } else {
                    return resolve({ error: "no error", results: results, query: queryString });
                }
            });
        });
    });
}