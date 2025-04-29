import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function getAllProyectos() {
    try {
        const rows = await executeQuery('SELECT * FROM proyectos');
        return rows.map(r => Proyecto.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}