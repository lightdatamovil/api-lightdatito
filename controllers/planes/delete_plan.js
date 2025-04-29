import { executeQuery } from '../../db.js';
import Plan from '../../models/plan.js';

export async function deletePlan(id) {
    await executeQuery('UPDATE plan SET eliminado = 1 WHERE id = ?', [id]);
    return { id };
}