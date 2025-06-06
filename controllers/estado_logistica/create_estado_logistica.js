import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Create a new estado_logistica and return the inserted record.
 * @param {Object} data - Fields and values for the new estado.
 * @returns {EstadoLogistica} The created EstadoLogistica instance.
 */
export async function createEstadoLogistica(nombre, color) {
    try {
        // 1) Inserción sin RETURNING
        const result = await executeQuery(
            `INSERT INTO estados_logistica (nombre, color)
         VALUES (?, ?)`,
            [nombre, color]
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear estado_logistica',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        // 3) Recuperar el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM estados_logistica WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear estado_logistica',
                message: `No se pudo recuperar el registro con id=${newId}`
            });
        }

        return EstadoLogistica.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear estado_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}