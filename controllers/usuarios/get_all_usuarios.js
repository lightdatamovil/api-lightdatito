import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Usuario from '../../models/usuario.js';

/**
 * Retrieve all usuarios (not deleted).
 * @returns {Usuario[]}
 */
export async function getAllUsuarios() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM usuarios WHERE eliminado = 0'
        );
        return rows.map(r => Usuario.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error retrieving usuarios',
            error.message,
            error.stack
        );
    }
}
