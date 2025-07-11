import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Herramienta from '../../models/herramienta.js';

export async function createHerramienta(nombre) {
    try {

        //verificar si ya existe herramienta
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM herramientas WHERE LOWER(nombre) = LOWER(?)`,
            [nombre]
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Herramienta duplicada',
                message: `Ya existe una herramienta con nombre "${nombre}"`,
                status: 400
            });
        }
        const result = await executeQuery(`INSERT INTO herramientas (nombre) VALUES (lower(?))`, nombre, true);
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear herramienta',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        const [row] = await executeQuery(
            `SELECT * FROM herramientas WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear herramienta',
                message: `No se pudo recuperar el registro con id=${newId}`
            });
        }

        return Herramienta.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear herramienta',
            message: err.message,
            stack: err.stack
        });
    }
}
