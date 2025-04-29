import { executeQuery } from '../../db.js';
import Plan from '../../models/plan.js';

export async function updatePlan(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updatePlan');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE plan SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getPlanById(id);
}