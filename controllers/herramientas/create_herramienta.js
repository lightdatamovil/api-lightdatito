import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createHerramienta(body) {
    const { nombre } = body;
    try {
        const nombreLower = nombre.trim().toLowerCase();

        // Verificar si ya existe herramienta
        const [existing] = await executeQuery(
            `SELECT id FROM herramientas WHERE LOWER(nombre) = ? and eliminado = 0 LIMIT 1`, [nombreLower]
        );
        if (existing) {
            throw new CustomException({
                title: 'Herramienta duplicada',
                message: `Ya existe una herramienta con nombre: "${nombre}"`,
                status: Status.conflict
            });
        }

        // Insertar nueva herramienta
        const result = await executeQuery(`INSERT INTO herramientas (nombre) VALUES (?)`, [nombreLower], true
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear herramienta',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }
        return { newId };
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
