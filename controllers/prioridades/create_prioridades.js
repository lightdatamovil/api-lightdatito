import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function createPrioridades(req) {

    const { nombre, color } = req.body;
    const clean_name = nombre.trim().toLowerCase();
    //verificar si ya existe prioridades
    const id = await executeQuery(
        `SELECT id FROM prioridades WHERE nombre = ? LIMIT 1`,
        [clean_name],
        true
    );
    if (id.length > 0) {
        throw new CustomException({
            title: 'Tipo de prioridades duplicado',
            message: `Ya existe un prioridades con nombre "${nombre}"`,
            status: Status.conflict
        });
    }

    const result = await executeQuery(
        `INSERT INTO prioridades (nombre, color) VALUES (?, ?)`,
        [nombre, color]
    );

    // 2) Obtener el ID recién insertado
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear prioridades',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }

    return newId;

}