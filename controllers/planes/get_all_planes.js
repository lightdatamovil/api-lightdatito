import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function getAllPlanes() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM plan WHERE eliminado = 0'
        );
        return rows.map(r => Plan.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener planes',
            message: err.message,
            stack: err.stack
        });
    }
}
