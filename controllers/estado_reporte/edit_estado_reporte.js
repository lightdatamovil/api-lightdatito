import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function updateEstadoReporte(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateEstadoReporte');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE estados_reporte SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getEstadoReporteById(id);
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar estado_reporte',
            message: error.message,
            stack: error.stack
        });
    }
}