import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function createEstadoReporte(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createEstadoReporte');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO estados_reporte (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return EstadoReporte.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}