import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';
import { Status } from '../../models/status.js';

/**
 * Update an existing estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to update.
 * @param {Object} data - Fields and values to update.
 * @returns {EstadoLogistica|null} The updated EstadoLogistica instance, or null if not found.
 */
export async function updateEstadoLogistica(id, nombre, color) {
    try {
        const result = await executeQuery(
            `UPDATE estados_logistica
          SET nombre = ?, color = ?
        WHERE id = ?
          AND eliminado = 0`,
            [nombre, color, id],
            true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'EstadoLogistica no encontrado',
                message: `No existe un estado_logistica activo con id=${id}`,
                status: Status.notFound
            });
        }

        const [row] = await executeQuery(
            `SELECT * FROM estados_logistica WHERE id = ?`,
            [id],
            true
        );

        return EstadoLogistica.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al actualizar estado_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}

