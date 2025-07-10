import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';


/**
 * Elimina una particularidad de logística 
 * @param {number} id - El ID de la particularidad a eliminar
 */
export async function deleteParticularidadLogistica(id) {
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