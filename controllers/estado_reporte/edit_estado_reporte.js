import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function updateEstadoReporte(id, nombre, color) {
    try {
        await executeQuery(`UPDATE estados_reporte SET nombre = ?, color = ? WHERE id = ?`, [nombre, color, id], true);


        const [row] = await executeQuery(
            `SELECT * FROM estados_reporte WHERE id = ?`,
            [id], true
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear estado_logistica',
                message: `No se pudo recuperar el registro con id=${id}`
            });
        }

        return EstadoReporte.fromJson(row);
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al updatear estado_reporte',
            message: error.message,
            stack: error.stack
        });
    }
}