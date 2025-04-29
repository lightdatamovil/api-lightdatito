import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function updateTipoReporte(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateTipoReporte');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE tipo_reporte SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getTipoReporteById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}