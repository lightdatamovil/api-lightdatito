import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function deleteEstadoReporte(id) {
    try {
        const [row] = await executeQuery(
            `SELECT * FROM estados_reporte WHERE id = ?`,
            [id]
        );

        if (!row) {
            throw new CustomException({
                title: 'Estado reporte no encontrado',
                message: `No existe un estado_reporte con id=${id}`
            });
        }

        await executeQuery('DELETE FROM estados_reporte WHERE id = ?', [id]);

        return { id };
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar estado_reporte',
            message: error.message,
            stack: error.stack
        });
    }
}