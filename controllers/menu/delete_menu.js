
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Marca un menú como eliminado (soft delete)
 * @param {number} id
 */
export async function deleteMenu(req) {
    const id = req.params.id;
    const result = await executeQuery(
        `UPDATE modulos SET eliminado  = 1, fecha_eliminado = NOW()  WHERE id = ? AND eliminado = 0`, [id]
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Módulo no encontrado',
            message: `No existe un módulo activo con id=${id}`,
            status: Status.notFound
        });
    }

    return { id };

}