import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getParticularidadLogisticaById } from './get_particularidad_logistica_by_id.js';


export async function updateParticularidadLogistica(params, body) {
    const { id } = params;
    const data = body;
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateParticularidadLogistica');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE particularidades SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getParticularidadLogisticaById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating particularidad de logistica',
            error.message,
            error.stack
        );
    }
}