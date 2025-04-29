import { executeQuery } from '../../db.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function getPuestoById(id) {
    const rows = await executeQuery('SELECT * FROM puestos WHERE id = ? AND eliminado = 0', [id]);
    return rows.length ? PuestoUsuario.fromJson(rows[0]) : null;
}