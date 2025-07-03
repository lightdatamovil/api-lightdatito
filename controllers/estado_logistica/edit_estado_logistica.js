import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';
//import { logYellow } from '../../src/funciones/logsCustom.js';

/**
 * Update an existing estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to update.
 * @param {Object} data - Fields and values to update.
 * @returns {EstadoLogistica|null} The updated EstadoLogistica instance, or null if not found.
 */
export async function updateEstadoLogistica(id, nombre, color) {
    try {
        await executeQuery(`UPDATE estados_logistica SET nombre = ?, color = ? WHERE id = ? `, [nombre, color, id], true);

        // 3) Recuperar el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM estados_logistica WHERE id = ?`,
            [id], true
        );

        if (!row) {
            throw new CustomException({
                title: 'Error al crear estado_logistica',
                message: `No se pudo recuperar el registro con id=${id}`
            });
        }
        return EstadoLogistica.fromJson(row);
    } catch (error) {
        throw new CustomException(
            'Error updating estado_logistica',
            error.message,
            error.stack
        );
    }
}
