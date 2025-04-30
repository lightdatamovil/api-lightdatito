import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function createProyecto(nombre) {
    try {
        const query = `INSERT INTO proyectos (nombre) VALUES (?) RETURNING *`;
        const rows = await executeQuery(query, [nombre]);
        return Proyecto.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating proyecto',
            error.message,
            error.stack
        );
    }
}