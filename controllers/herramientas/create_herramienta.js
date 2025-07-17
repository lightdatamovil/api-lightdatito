import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createHerramienta(req) {
    const { nombre } = req.body;
    const nombreLower = nombre.trim().toLowerCase();

    // Verificar si ya existe herramienta
    const [existing] = await executeQuery(`SELECT id FROM herramientas WHERE LOWER(nombre) = ? and eliminado = 0 LIMIT 1`, [nombreLower]
    );
    if (existing) {
        throw new CustomException({
            title: 'Herramienta duplicada',
            message: `Ya existe una herramienta con nombre: "${nombre}"`,
            status: Status.conflict
        });
    }

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
    return newId;
}
