import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Delete an estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to delete.
 * @returns {{id: number|string}} The ID of the deleted estado.
 */
export async function deleteEstadoLogistica(req) {
    const id = req.params.id;
    const result = await executeQuery(`UPDATE estados_logistica SET eliminado  = 1,  fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id], true);

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'EstadoLogistica no encontrado',
            message: `No existe un estado_logistica activo con id=${id}`,
            status: Status.notFound
        });
    }

    return id;

}
