import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function getEstadoReporteById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM estados_reporte WHERE id = ?', [id]);
        return rows.length ? EstadoReporte.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}