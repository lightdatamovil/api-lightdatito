import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';
import { Status } from '../../models/status.js';

export async function getPlanById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM planes WHERE id = ? AND eliminado = 0 limit 1',
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
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener plan',
            message: err.message,
            stack: err.stack
        });
    }
}