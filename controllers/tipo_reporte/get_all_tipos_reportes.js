import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function getAllTipoReporte() {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_reporte');
        return rows.map(r => TipoReporte.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener tipos de reporte',
            message: err.message,
            stack: err.stack
        });
    }
}
