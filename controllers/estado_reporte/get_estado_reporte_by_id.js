import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

// services/estado_reporte.js
export async function getEstadoReporteById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM estados_reporte WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'EstadoReporte no encontrado',
                message: `No existe un estado_reporte con id=${id}`
            });
        }
        return EstadoReporte.fromJson(rows[0]);
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar estado_reporte',
            message: error.message,
            stack: error.stack
        });
    }
}
