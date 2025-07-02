import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function createReporte(
    titulo,
    descripcion,
    tipo_reporte_id,
    observador,
    proyecto_id,
    logistica_id
) {
    try {
       

        // 1) Insertar sin RETURNING
        const result = await executeQuery(
            `INSERT INTO reportes
          (titulo, descripcion, tipo_reporte_id, observador, proyecto_id, logistica_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
            [
                titulo,
                descripcion,
                tipo_reporte_id,
                observador,
                proyecto_id,
                logistica_id
            ],true
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear reporte',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        // 3) Recuperar el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM reportes WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear reporte',
                message: `No se pudo recuperar el reporte con id=${newId}`
            });
        }

        return Reporte.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear reporte',
            message: err.message,
            stack: err.stack
        });
    }
}