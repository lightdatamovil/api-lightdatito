import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function getTipoReporteById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_reporte WHERE id = ?', [id]);
        return rows.length ? TipoReporte.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}
