import { executeQuery } from '../../db.js';
import Proyecto from '../../models/proyecto.js';

export async function deleteProyecto(id) {
    await executeQuery('DELETE FROM proyectos WHERE id = ?', [id]);
    return { id };
}