import { executeQuery } from '../../db.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function deletePuesto(id) {
    await executeQuery('UPDATE puestos SET eliminado = 1 WHERE id = ?', [id]);
    return { id };
}
