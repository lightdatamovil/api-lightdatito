import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function getAllParticularidadesLogisticas() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM particularidades'
        );
        return rows.map(r => ObservacionLogistica.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener particularidades de logística',
            message: err.message,
            stack: err.stack
        });
    }
}