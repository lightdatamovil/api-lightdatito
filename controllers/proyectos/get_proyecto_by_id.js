import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function getProyectoById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM proyectos WHERE id = ?', [id]);
        return rows.length ? Proyecto.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}