import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function getAllEstadosReporte() {
    try {
        const rows = await executeQuery('SELECT * FROM estados_reporte');
        return rows.map(r => EstadoReporte.fromJson(r));
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar estado_reporte',
            message: error.message,
            stack: error.stack
        });
    }
}
