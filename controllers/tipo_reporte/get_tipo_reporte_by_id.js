import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function getTipoReporteById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM tipo_reporte WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'TipoReporte no encontrado',
                message: `No existe un tipo_reporte con id=${id}`
            });
        }

        return TipoReporte.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener tipo_reporte',
            message: err.message,
            stack: err.stack
        });
    }
}