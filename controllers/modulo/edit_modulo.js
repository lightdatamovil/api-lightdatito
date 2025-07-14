// controllers/modulo/edit_modulo.js
import CustomException from '../../models/custom_exception.js';
import { getModuloById } from './get_modulo_by_id.js';
import { executeQuery } from '../../db.js';
/**
 * Actualiza campos de un módulo existente
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Modulo>}
 */
export async function editModulo(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) {
        throw new CustomException({
            title: 'Sin datos',
            message: 'No se proporcionaron campos para actualizar',
            status: 500
        });
    }
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => data[f]);
    try {
        await executeQuery(
            `UPDATE modulos SET ${setClause} WHERE id = ?`,
            [...values, id]
        );
        return await getModuloById(id);
    } catch (err) {
        throw new CustomException({
            title: 'Error actualizando módulo',
            message: err.message,
            stack: err.stack
        });
    }
}

