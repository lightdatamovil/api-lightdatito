import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

/**
 * Elimina una observación de logística y su vínculo en logisticas_observaciones
 * @param {number} id - El ID de la observación a eliminar
 */
export async function deleteObservacionLogistica(id) {
    try {
        // 1) Verificar que exista la observación
        const [row] = await executeQuery(
            'SELECT * FROM observaciones_logistica WHERE id = ?',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Observación no encontrada',
                message: `No existe una observación de logística con id=${id}`
            });
        }

        // 2) Eliminar los vínculos en logisticas_observaciones
        await executeQuery(
            'DELETE FROM logisticas_observaciones WHERE observaciones_logistica_id = ?',
            [id]
        );

        // 3) Eliminar la observación
        await executeQuery(
            'DELETE FROM observaciones_logistica WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar observación de logística',
            message: err.message,
            stack: err.stack
        });
    }
}