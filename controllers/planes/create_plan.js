import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function createPlan(nombre, color) {
    try {
        const query = `INSERT INTO plan (nombre, color) VALUES (?, ?) RETURNING *`;
        const rows = await executeQuery(query, [nombre, color]);
        return Plan.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating plan',
            error.message,
            error.stack
        );
    }
}