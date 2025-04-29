import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function updateProyecto(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateProyecto');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(
            `UPDATE proyectos SET ${setClause} WHERE id = ?`,
            [...Object.values(data), id]
        );
        return getProyectoById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}