import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Elimina una particularidad de logística 
 * @param {number} id - El ID de la particularidad a eliminar
 */
export async function deleteParticularidadLogistica(params) {
    const { id } = params;
    try {
        const result = await executeQuery(`UPDATE particularidades SET eliminado = 1, fecha_eliminado = NOW()  WHERE id = ? AND eliminado = 0`, [id]);

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Particularidad no encontrada',
                message: `No existe una particularidad activa con id: ${id}`,
                status: Status.notFound
            });
        }
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar particularidad de logística',
            message: err.message,
            stack: err.stack
        });
    }
}