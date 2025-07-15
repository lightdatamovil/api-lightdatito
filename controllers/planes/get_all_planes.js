import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';
import { Status } from '../../models/status.js';

export async function getAllPlanes() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM planes WHERE eliminado = 0'
        );

        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'No hay planes disponibles',
                message: 'No se encontraron planes activos',
                status: Status.notFound
            });
        }
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
