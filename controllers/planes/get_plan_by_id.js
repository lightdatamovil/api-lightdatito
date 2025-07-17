import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';
import { Status } from '../../models/status.js';

export async function getPlanById(req) {
    const id = req.params.id;
    const rows = await executeQuery(
        'SELECT * FROM planes WHERE id = ? AND eliminado = 0 LIMIT 1',
        [id]
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'Plan no encontrado',
            message: `No existe un plan con id: ${id}`,
            status: Status.notFound
        });
    }

    return Plan.fromJson(rows[0]);
}