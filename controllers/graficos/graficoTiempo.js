import { executeQuery } from "../../db.js";

export async function getAverageResponseTime(tipoQr) {
    const q = `SELECT 
            HOUR(autofecha) AS hora,
            AVG(tiempo) AS promedio_tiempo
            FROM
            logs_v2 WHERE autofecha like "%2025-06%"   AND resultado NOT LIKE "%El paquete ya se encuentra asignado a este chofer.%"
            GROUP BY
            HOUR(autofecha)
            ORDER BY
            hora;
            `;
    const rows = await executeQuery(q, [], true, tipoQr);
    return rows;
}