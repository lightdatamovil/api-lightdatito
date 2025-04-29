import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function deleteEstadoReporte(id) {
    try {
        await executeQuery('DELETE FROM estados_reporte WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}