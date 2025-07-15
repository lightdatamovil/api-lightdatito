// controllers/modulo/delete_modulo.js
import CustomException from '../../models/custom_exception.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';
/**
 * Marca un módulo como eliminado (soft delete)
 * @param {number} id
 */
export async function deleteModulo(id) {
    try {
        // 1) Comprueba existencia de forma óptima
        const exists = await executeQuery(
            'SELECT 1 FROM modulos WHERE id = ? AND eliminado = 0 LIMIT 1',
            [id],
            true
        );
        if (!exists || exists.length === 0) {
            throw new CustomException({
                title: 'Módulo no encontrado',
                message: `No existe un módulo con id: ${id}`,
                status: Status.notFound
            });
        }

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error eliminando módulo',
            message: err.message,
            stack: err.stack
        });
    }
}
