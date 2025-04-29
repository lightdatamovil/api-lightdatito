import { executeQuery } from '../../db.js';
import Usuario from '../../models/usuario.js';

/**
 * Retrieve all usuarios (not deleted).
 * @returns {Usuario[]}
 */
export async function getAllUsuarios() {
    const rows = await executeQuery(
        'SELECT * FROM usuarios WHERE eliminado = 0'
    );
    return rows.map(r => Usuario.fromJson(r));
}
