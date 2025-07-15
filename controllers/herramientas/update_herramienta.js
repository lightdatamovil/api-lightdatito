import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getHerramientaById } from './get_herramienta_by_id.js';

export async function updateHerramienta(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateHerramienta');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(
            `UPDATE herramientas SET ${setClause} WHERE id = ?`,
            [...Object.values(data), id]
        );
        return getHerramientaById(id);
    } catch (error) {
        throw new CustomException(
            'Error updating Herramienta',
            error.message,
            error.stack
        );
    }
}