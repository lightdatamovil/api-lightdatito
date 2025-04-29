import { executeQuery } from '../../db.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function getAllPuestos() {
    const rows = await executeQuery('SELECT * FROM puestos WHERE eliminado = 0');
    return rows.map(r => PuestoUsuario.fromJson(r));
}