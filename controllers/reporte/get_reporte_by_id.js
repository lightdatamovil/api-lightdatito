import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function getReporteById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM reportes WHERE id = ? AND eliminado = 0',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'Reporte no encontrado',
                message: `No existe un reporte con id=${id}`
            });
        }

        return Reporte.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener reporte',
            message: err.message,
            stack: err.stack
        });
    }
}