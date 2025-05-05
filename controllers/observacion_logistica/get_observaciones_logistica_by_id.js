import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function getObservacionLogisticaById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM observaciones_logistica WHERE id = ?',
            [id]
        );
        logCyan(`ObservacionLogistica: ${JSON.stringify(rows)}`);

        if (rows.length === 0) {
            throw new CustomException({
                title: 'ObservacionLogistica no encontrada',
                message: `No existe una observacion_logistica con id=${id}`
            });
        }

        return ObservacionLogistica.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener observacion_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}