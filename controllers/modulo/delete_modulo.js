// controllers/modulo/delete_modulo.js
import CustomException from '../../models/custom_exception.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';
/**
 * Marca un módulo como eliminado (soft delete)
 * @param {number} id
 */

export async function deleteModulo(params) {
    const { id } = params;

    try {
        // 1) Soft-delete y compruebo si se afectó alguna fila
        const result = await executeQuery(
            'UPDATE modulos SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0',
            [id],
            true
        );

        // 2) Si no modificó ninguna fila, lanzo not found
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Módulo no encontrado',
                message: `No existe un módulo activo con id=${id}`,
                status: Status.notFound
            });
        }

        // 3) Devuelvo el id para confirmar el borrado
        return { id };

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error eliminando módulo',
            message: err.message,
            stack: err.stack
        });
    }
}