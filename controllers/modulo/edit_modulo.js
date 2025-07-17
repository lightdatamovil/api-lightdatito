// controllers/modulo/edit_modulo.js
import CustomException from '../../models/custom_exception.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';

/**
 * Actualiza campos de un módulo existente
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Modulo>}
 */
export async function editModulo(req) {

    const id = req.params.id;
    const { nombre, menu_id } = req.body;

    // 1) UPDATE directo de los dos campos
    const result = await executeQuery(`UPDATE modulos SET nombre  = ?, menu_id   = ? WHERE id = ?  AND eliminado = 0`,
        [nombre, menu_id, id],
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

}
