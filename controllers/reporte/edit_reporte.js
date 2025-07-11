import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getTipoReporteById } from '../tipo_reporte/get_tipo_reporte_by_id.js';


export async function updateReporte(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateReporte');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(
            `UPDATE reportes SET ${setClause} WHERE id = ?`,
            [...Object.values(data), id]
        );
        return getTipoReporteById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}