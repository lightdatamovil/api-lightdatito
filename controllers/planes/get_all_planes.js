import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function getAllPlanes() {
    try {
        const rows = await executeQuery('SELECT * FROM plan WHERE eliminado = 0');
        return rows.map(r => Plan.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}