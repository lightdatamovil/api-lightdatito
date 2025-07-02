import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function createEstadoReporte(nombre, color) {
    try {
        const nombre_limpio = nombre.trim().toLowerCase();
        const color_limpio = color.trim().toLowerCase();
        //verificar si ya existe tipo_usuario
        const [{ count }] = await executeQuery( `SELECT COUNT(*) AS count FROM estados_reporte WHERE nombre = ? and color= ?`,
            [nombre_limpio, color_limpio],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
            title:   'Estado reporte duplicado',
            message: `Ya existe un estado con nombre "${nombre_limpio}" y  color "${color_limpio}`,
            status:  400
        });
        }


        const result = await executeQuery(
            `INSERT INTO estados_reporte (nombre, color) VALUES (?, ?)`,
            [nombre_limpio, color_limpio]
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
