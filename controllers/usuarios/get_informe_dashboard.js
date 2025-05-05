import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
/**
 * Devuelve el conteo de reportes por tipo en la última semana,
 * filtrando según el tipo de usuario:
 *  - Admin (tipo_usuario_id = 1): todos los reportes.
 *  - Resto de usuarios: solo sus propios reportes (observador = userId).
 *
 * @param {number} userId El ID del usuario que solicita el informe.
 * @returns {Promise<Array<{ tipo_reporte_id: number, nombre: string, color: string, total: number }>>}
 */
export async function getInformeDashboard(userId) {
    try {
        // 1) Obtener el tipo de usuario
        const [userRow] = await executeQuery(
            `SELECT tipo_usuario_id
           FROM usuarios
          WHERE id = ?`,
            [userId]
        );
        if (!userRow) {
            throw new CustomException({
                title: "Usuario no encontrado",
                message: `No existe un usuario con id=${userId}`,
            });
        }
        const userType = userRow.tipo_usuario_id;

        // 2) Construir la parte del ON para filtrar reportes de los últimos 7 días
        let onClause = `
        r.eliminado = 0
        AND r.fecha_creacion >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `;
        const params = [];

        // 3) Si no es admin, limitar a sus propios reportes
        if (userType !== 1) {
            onClause += ` AND r.observador = ?`;
            params.push(userId);
        }

        // 4) Consulta usando LEFT JOIN para traer todos los tipos, incluso con total = 0
        const sql = `
        SELECT
          tr.id    AS tipo_reporte_id,
          tr.nombre,
          tr.color,
          COUNT(r.id) AS total
        FROM tipo_reporte tr
        LEFT JOIN reportes r
          ON r.tipo_reporte_id = tr.id
          AND ${onClause}
        GROUP BY tr.id, tr.nombre, tr.color
        ORDER BY total DESC;
      `;

        const rows = await executeQuery(sql, params);
        return rows;
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al obtener informe de dashboard",
            message: err.message,
            stack: err.stack,
        });
    }
}