import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function createReporte(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createReporte');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO reportes (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return Reporte.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating reporte',
            error.message,
            error.stack
        );
    }
}