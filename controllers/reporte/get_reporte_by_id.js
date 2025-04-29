import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function getReporteById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM reportes WHERE id = ? AND eliminado = 0',
            [id]
        );
        return rows.length ? Reporte.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}