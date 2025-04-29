import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function getPlanById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM plan WHERE id = ? AND eliminado = 0', [id]);
        return rows.length ? Plan.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}