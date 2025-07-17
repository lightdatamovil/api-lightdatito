import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deleteLogistica(req) {
    const { id } = req.params.id;
    const queryUpdateLogistica = `UPDATE logisticas SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?`;
    const result = await executeQuery(queryUpdateLogistica, [id]);

    if (result.affectedRows == 0) {
        throw new CustomException({
            title: 'Logística no encontrada',
            message: `No existe una logística con id=${id}`,
            status: Status.notFound
        });
    }
}
