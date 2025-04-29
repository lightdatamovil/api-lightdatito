import { executeQuery } from '../../db.js';
import Proyecto from '../../models/proyecto.js';

export async function getProyectoById(id) {
    const rows = await executeQuery('SELECT * FROM proyectos WHERE id = ?', [id]);
    return rows.length ? Proyecto.fromJson(rows[0]) : null;
}