import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function updateLogistica(id, data) {
    try {
        const fields = Object.keys(data).filter(key => key !== 'id');
        if (!fields.length) {
            throw new CustomException('No hay parámetros para modificar logistica');
        }

        const setClause = fields.map(key => `${key} = ?`).join(', ');
        const values = fields.map(key => data[key]);

        const sql = `UPDATE logisticas SET ${setClause} WHERE id = ?`;
        await executeQuery(sql, [...values, id], true);
    } catch (err) {
        throw new CustomException(
            'Error en updateLogistica',
            err.message,
            err.stack
        );
    }
}
