import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Crea una observación de logística y su vínculo en logisticas_observaciones
 * @param {number} logisticaId - El ID de la logística a la que pertenece
 * @param {string} nombre - El nombre de la observación
 */

export async function createParticularidadLogistica(req) {
    const { logisticaId, particularidad, es_pago, tipo_particularidad_id } = req.body;
    const ver = await executeQuery('SELECT 1 FROM particularidades WHERE logistica_id = ? AND particularidad = LOWER(?)',
        [logisticaId, particularidad]
    );

    if (ver && ver.length > 0) {
        throw new CustomException({
            title: 'Particularidad duplicada',
            message: `Ya existe una particularidad "${particularidad}" para la logística con ID ${logisticaId}`,
            status: Status.conflict
        });
    }

    const values = [logisticaId, particularidad, es_pago, tipo_particularidad_id];
    const query = `INSERT INTO particularidades (logistica_id, particularidad, es_pago, tipo_particularidad_id) VALUES (?, ?, ?, ?)`;

    // 1) Insertar en la tabla de particularidades
    const result = await executeQuery(query, values);

    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear particularidad de logistica',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }

    return await newId;

}