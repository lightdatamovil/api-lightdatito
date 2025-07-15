// controllers/modulo/edit_modulo.js
import CustomException from '../../models/custom_exception.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';
import { getModuloById } from './get_modulo_by_id.js';
/**
 * Actualiza campos de un módulo existente
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Modulo>}
 */
export async function editModulo(id, data) {
    try {
        // 1) UPDATE directo de los dos campos
        const result = await executeQuery(
            `UPDATE modulos
          SET nombre    = ?,
              menu_id   = ?
        WHERE id = ? 
          AND eliminado = 0`,
            [data.nombre, data.menu_id, id],
            true
        );

        // 2) Si no encontró filas afectadas, devolvemos “no encontrado”
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Módulo no encontrado',
                message: `No existe un módulo con id: ${id}`,
                status: Status.notFound
            });
        }

        // 3) Devolvemos el registro ya actualizado
        return await getModuloById(id);

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando módulo',
            message: err.message,
            stack: err.stack
        });
    }
}
