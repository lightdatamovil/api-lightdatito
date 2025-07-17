import { executeQuery, poolLocal } from "../../db.js";
import { logGreen, logRed } from "./logsCustom.js";

export async function crearLog(res, req) {
    try {
        const sqlLog = `
            INSERT INTO logs
                (id_usuario, endpoint, body,  tiempo, resultado, exito)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            req.user.id,
        ];

        await executeQuery(poolLocal, sqlLog, values);
        logGreen(`Log creado: ${JSON.stringify(values)}`);
    } catch (error) {
        logRed(`Error en crearLog: ${error.stack}`);
        throw error;
    }
}
