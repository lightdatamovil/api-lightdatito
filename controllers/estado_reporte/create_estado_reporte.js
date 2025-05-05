import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function createEstadoReporte(nombre, color) {
    try {
        const result = await executeQuery(
            `INSERT INTO estados_reporte (nombre, color) VALUES (?, ?)`,
            [nombre, color]
        );

        const newId = result.insertId;

        if (!newId) {
            throw new CustomException({
                title: 'Error al crear estado_reporte',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        const [row] = await executeQuery(
            `SELECT * FROM estados_reporte WHERE id = ?`,
            [newId]
        );

        return EstadoReporte.fromJson(row);
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al crear estado_reporte',
            message: error.message,
            stack: error.stack
        });
    }
}
