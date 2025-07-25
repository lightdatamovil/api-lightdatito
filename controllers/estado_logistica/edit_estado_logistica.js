import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Update an existing estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to update.
 * @param {Object} data - Fields and values to update.
 * @returns {EstadoLogistica|null} The updated EstadoLogistica instance, or null if not found.
 */
export async function updateEstadoLogistica(req) {
    const id = req.params.id;
    const { nombre, color } = req.body;
    const query = `UPDATE estados_logistica SET nombre = ?, color = ? WHERE id = ?  AND eliminado = 0`;
    const result = await executeQuery(query, [nombre, color, id], true);

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'EstadoLogistica no encontrado',
            message: `No existe un estado_logistica activo con id=${id}`,
            status: Status.notFound
        });
    }

    // Devuelve los datos actualizados en un array
    return [{ id, nombre, color }];

}

