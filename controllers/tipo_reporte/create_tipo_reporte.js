import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function createTipoReporte(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createTipoReporte');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO tipo_reporte (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return TipoReporte.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_reporte',
            error.message,
            error.stack
        );
    }
}
