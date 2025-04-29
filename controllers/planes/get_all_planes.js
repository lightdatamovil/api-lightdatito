import { executeQuery } from '../../db.js';
import Plan from '../../models/plan.js';

export async function getAllPlanes() {
    const rows = await executeQuery('SELECT * FROM plan WHERE eliminado = 0');
    return rows.map(r => Plan.fromJson(r));
}