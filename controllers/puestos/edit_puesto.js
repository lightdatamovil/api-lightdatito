import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getPuestoById } from '../get_puesto_by_id.js';

export async function updatePuesto(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updatePuesto');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE puestos SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getPuestoById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating puesto_usuario',
            error.message,
            error.stack
        );
    }
}