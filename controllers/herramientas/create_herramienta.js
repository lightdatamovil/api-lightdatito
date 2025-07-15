import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Herramienta from '../../models/herramienta.js';
import { Status } from '../../models/status.js';
export async function createHerramienta(nombre) {
    try {
        const nombreLower = nombre.trim().toLowerCase();

        // Verificar si ya existe herramienta
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM herramientas WHERE LOWER(nombre) = ? and eliminado = 0`, [nombreLower], true
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Herramienta duplicada',
                message: `Ya existe una herramienta con nombre "${nombre}"`,
                status: Status.conflict
            });
        }

        // Insertar nueva herramienta
        const result = await executeQuery(
            `INSERT INTO herramientas (nombre) VALUES (?)`,
            [nombreLower], true
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear herramienta',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        // Recuperar el registro insertado
        const [row] = await executeQuery(
            `SELECT * FROM herramientas WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear herramienta',
                message: `No se pudo recuperar el registro con id=${newId}`,
                status: Status.internalServerError
            });
        }

        return Herramienta.fromJson(row);
    } catch (err) {
        throw err instanceof CustomException
            ? err
            : new CustomException({
                title: 'Error al crear herramienta',
                message: err.message,
                stack: err.stack,
                status: Status.internalServerError
            });
    }
}
