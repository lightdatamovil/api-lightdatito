import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function getAllReportes() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM reportes WHERE eliminado = 0'
        );
        return rows.map(r => Reporte.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}