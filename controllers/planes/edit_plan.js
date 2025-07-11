import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getPlanById } from './get_plan_by_id.js';


export async function updatePlan(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updatePlan');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE planes SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getPlanById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}