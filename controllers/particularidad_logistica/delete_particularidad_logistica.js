import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ParticularidadLogistica from '../../models/partiularidad_logistica.js';

/**
 * Elimina una observación de logística y su vínculo en logisticas_observaciones
 * @param {number} id - El ID de la observación a eliminar
 */
export async function deleteObservacionLogistica(id) {
    try {
        // 1) Verificar que exista la particularidad
        const [row] = await executeQuery(
            'SELECT * FROM particularidades WHERE id = ?',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Particularidad no encontrada',
                message: `No existe una particularidad de logística con id=${id}`
            });
        }


        // 3) Eliminar la particularidad
        await executeQuery(
            'UPDATE particularidades SET eliminado = 1 WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar particularidad de logística',
            message: err.message,
            stack: err.stack
        });
    }
}