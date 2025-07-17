import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deleteLogistica(params) {
    try {
        const { id } = params;
        const queryUpdateLogistica = `UPDATE logisticas SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?`;
        const result = await executeQuery(queryUpdateLogistica, [id]);

        if (result.affectedRows == 0) {
            throw new CustomException({
                title: 'Logística no encontrada',
                message: `No existe una logística con id=${id}`,
                status: Status.notFound
            });
        }
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar logística',
            message: err.message,
            stack: err.stack
        });
    }
}
