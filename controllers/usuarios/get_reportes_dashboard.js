import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";

/**
 * Devuelve todos los reportes de la última semana con:
 *  - id
 *  - nombre del tipo de reporte
 *  - descripción
 *  - fecha_creacion
 *  - última asignación (fecha_creacion de asignación más reciente)
 *  - estado actual (nombre del último estado registrado)
 *
 * Si el usuario es admin (tipo_usuario_id = 1) devuelve todos los reportes;
 * en caso contrario sólo aquellos cuyo observador = userId.
 *
 * @param {number} userId
 * @returns {Promise<Array<{
 *   id: number,
 *   tipo_reporte: string,
 *   descripcion: string,
 *   fecha_creacion: string,
 *   ultima_asignacion: string | null,
 *   estado: string | null
 * }>>}
 */
export async function getReportesUltimaSemana(userId) {
    try {
        // 1) Leer el tipo de usuario
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
        const isAdmin = userRow.tipo_usuario_id === 1;

        // 2) Filtrar últimos 7 días, no eliminados
        let where = `
      r.eliminado = 0
      AND r.fecha_creacion >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `;
        const params = [];

        // 3) Si no es admin, limitar a sus propios reportes
        if (!isAdmin) {
            where += ` AND r.observador = ?`;
            params.push(userId);
        }

        // 4) Consulta principal usando subconsultas para asignación y estado
        const sql = `
      SELECT
        r.id,
        tr.nombre          AS tipo_reporte,
        r.descripcion,
        r.fecha_creacion,
        (
          SELECT a.fecha_creacion
          FROM asignaciones_reportes ar
          JOIN asignaciones a
            ON ar.asignacion_id = a.id
          WHERE ar.reporte_id = r.id
          ORDER BY a.fecha_creacion DESC
          LIMIT 1
        ) AS ultima_asignacion,
        (
          SELECT er.nombre
          FROM reportes_estados re
          JOIN estados_reporte er
            ON re.estado_reporte_id = er.id
          WHERE re.reporte_id = r.id
          ORDER BY re.reporte_id DESC
          LIMIT 1
        ) AS estado
      FROM reportes r
      JOIN tipo_reporte tr
        ON r.tipo_reporte_id = tr.id
      WHERE ${where}
      ORDER BY r.fecha_creacion DESC;
    `;

        return await executeQuery(sql, params);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al obtener reportes de la última semana",
            message: err.message,
            stack: err.stack,
        });
    }
}