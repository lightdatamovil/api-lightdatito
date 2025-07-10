import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ParticularidadLogisticaLogistica from '../../models/particularidad_logistica.js';

/**
 * Crea una observación de logística y su vínculo en logisticas_observaciones
 * @param {number} logisticaId - El ID de la logística a la que pertenece
 * @param {string} nombre - El nombre de la observación
 */
export async function createParticularidadLogistica(logisticaId, particularidad, es_pago, tipo_particularidad_id) {
    try {

        // 1) Insertar en la tabla de particularidades
        const result = await executeQuery(
            `INSERT INTO particularidades (logistica_id, particularidad, es_pago, tipo_particularidad_id) VALUES (?, ?, ?, ?)`,
            [logisticaId, particularidad, es_pago, tipo_particularidad_id]
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear particularidad de logistica',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        return ParticularidadLogisticaLogistica.fromJson(result);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear observacion_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}