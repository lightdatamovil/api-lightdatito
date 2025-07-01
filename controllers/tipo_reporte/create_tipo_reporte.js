import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function createTipoReporte(nombre, color) {
    try {
        const clean_name = nombre.trim().toLowerCase();
        //verificar si ya existe tipo_reporte
            const [{ count }] = await executeQuery(
                `SELECT COUNT(*) AS count FROM tipo_reporte WHERE nombre = ?`,
                [clean_name],
                true, 0
            );
            if (count > 0) {
                throw new CustomException({
                title:   'Tipo de tipo_reporte duplicado',
                message: `Ya existe un tipo_reporte con nombre "${nombre}"`,
                status:  400
            });
            }

        // 1) Insertar sin RETURNING
        const result = await executeQuery(
            `INSERT INTO tipo_reporte (nombre, color) VALUES (?, ?)`,
            [nombre, color]
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear tipo_reporte',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        // 3) Recuperar el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM tipo_reporte WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear tipo_reporte',
                message: `No se pudo recuperar el registro con id=${newId}`
            });
        }

        return TipoReporte.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear tipo_reporte',
            message: err.message,
            stack: err.stack
        });
    }
}