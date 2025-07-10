import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function updateObservacionLogistica(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateObservacionLogistica');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE observaciones_logistica SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getObservacionLogisticaById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}