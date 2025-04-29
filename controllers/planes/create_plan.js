import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function createPlan(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createPlan');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO plan (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return Plan.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating plan',
            error.message,
            error.stack
        );
    }
}