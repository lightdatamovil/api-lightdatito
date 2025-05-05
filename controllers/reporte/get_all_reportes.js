import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function getAllReportes() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM reportes WHERE eliminado = 0'
        );
        return rows.map(r => Reporte.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener reportes',
            message: err.message,
            stack: err.stack
        });
    }
}