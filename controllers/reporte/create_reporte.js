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
        //verificar si ya existe reportes -- amerita este caso la verificacion' reguntar
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM reportes WHERE nombre = ?`,
            [titulo],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
            title:   'reporte duplicado',
            message: `Ya existe un reporte con nombre "${nombre}"`,
            status:  400
        });
        }



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
            ]
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