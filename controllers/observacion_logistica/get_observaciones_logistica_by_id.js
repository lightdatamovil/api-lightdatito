import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function getObservacionLogisticaById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM observaciones_logistica WHERE id = ?', [id]);
        return rows.length ? ObservacionLogistica.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}