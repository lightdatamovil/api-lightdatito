import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function getAllEstadosReporte() {
    try {
        const rows = await executeQuery('SELECT * FROM estados_reporte');
        return rows.map(r => EstadoReporte.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}
