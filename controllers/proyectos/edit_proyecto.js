import { executeQuery } from '../../db.js';
import Proyecto from '../../models/proyecto.js';

export async function updateProyecto(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateProyecto');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(
        `UPDATE proyectos SET ${setClause} WHERE id = ?`,
        [...Object.values(data), id]
    );
    return getProyectoById(id);
}