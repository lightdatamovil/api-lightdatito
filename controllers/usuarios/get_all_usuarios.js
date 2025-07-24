import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import Usuario from '../../models/usuario.js';

/**
 * Retrieve all usuarios (not deleted).
 * @returns {Usuario[]}
 */
export async function getAllUsuarios() {

    const rows = await executeQuery(
        'SELECT * FROM usuarios WHERE eliminado = 0'
    );

    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'No hay usuarios',
            message: 'No se encontraron usuarios',
            status: Status.noContent
        });
    }
    return rows.map(r => Usuario.fromJson(r));

}
