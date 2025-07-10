// controllers/modulo/delete_modulo.js
import CustomException from '../../models/custom_exception.js';
import { executeQuery } from '../../db.js';
/**
 * Marca un módulo como eliminado (soft delete)
 * @param {number} id
 */
export async function deleteModulo(id) {
    try {
        await executeQuery(
            'UPDATE modulo SET eliminado = 1 WHERE id = ?',
            [id]
        );
    } catch (err) {
        throw new CustomException({
            title: 'Error eliminando módulo',
            message: err.message,
            stack: err.stack
        });
    }
}

