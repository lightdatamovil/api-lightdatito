
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Marca un menú como eliminado (soft delete)
 * @param {number} id
 */
export async function deleteMenu(id) {
    try {
        const result = await executeQuery(
            `UPDATE modulos
          SET eliminado      = 1,
              fecha_eliminado = NOW()
        WHERE id = ?
          AND eliminado = 0`,
            [id],
            true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Módulo no encontrado',
                message: `No existe un módulo activo con id=${id}`,
                status: Status.notFound
            });
        }

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar módulo',
            message: err.message,
            stack: err.stack
        });
    }
}