import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function getAllTipoReporte() {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_reporte');
        return rows.map(r => TipoReporte.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}