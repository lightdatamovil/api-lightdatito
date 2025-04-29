import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function deleteObservacionLogistica(id) {
    try {
        await executeQuery('DELETE FROM observaciones_logistica WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}