import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function deleteProyecto(id) {
    try {
        await executeQuery('DELETE FROM proyectos WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}