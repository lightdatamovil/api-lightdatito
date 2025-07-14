import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getTipoParticularidadById } from './get_tipo_particularidad_by_id.js';


/**
 * Actualiza campos de un tipo de particularidad existente
 */
export async function editTipoParticularidad(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) {
            throw new CustomException({
                title: 'Sin datos',
                message: 'No se proporcionaron campos para actualizar',
                status: 404
            });
        }
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(
            `UPDATE tipo_particularidad SET ${setClause} WHERE id = ?`,
            [...fields.map(f => data[f]), id]
        );
        return getTipoParticularidadById(id);
    } catch (err) {
        throw new CustomException({
            title: 'Error actualizando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
