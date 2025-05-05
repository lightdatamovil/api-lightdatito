import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Retrieve a single logistica by ID.
 * @param {number|string} id - The ID of the logistica to fetch.
 * @returns {Logistica|null} The Logistica instance, or null if not found.
 */
export async function getLogisticaById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM logisticas WHERE id = ? AND eliminado = 0',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'Logística no encontrada',
                message: `No existe una logística con id=${id}`
            });
        }

        return Logistica.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener logística',
            message: err.message,
            stack: err.stack
        });
    }
}