import { executeQuery } from '../../db.js';
import Proyecto from '../../models/proyecto.js';

export async function getAllProyectos() {
    const rows = await executeQuery('SELECT * FROM proyectos');
    return rows.map(r => Proyecto.fromJson(r));
}