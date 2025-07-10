import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

/**
 * Crea una observación de logística y su vínculo en logisticas_observaciones
 * @param {number} logisticaId - El ID de la logística a la que pertenece
 * @param {string} nombre - El nombre de la observación
 */
export async function createObservacionLogistica(logisticaId, nombre) {
    try {

        // 1) Insertar en la tabla de observaciones
        const result = await executeQuery(
            `INSERT INTO observaciones_logistica (nombre)
         VALUES (?)`,
            [nombre]
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear observacion_logistica',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        // 2) Insertar vínculo en logisticas_observaciones
        await executeQuery(
            `INSERT INTO logisticas_observaciones
           (logisticas_id, observaciones_logistica_id)
         VALUES (?, ?)`,
            [logisticaId, newId]
        );

        // 3) Recuperar y devolver la observación recién creada
        const [row] = await executeQuery(
            `SELECT * FROM observaciones_logistica WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear observacion_logistica',
                message: `No se pudo recuperar el registro con id=${newId}`
            });
        }

        return ObservacionLogistica.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear observacion_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}