import { executeQuery } from '../../db.js';
import Usuario from '../../models/usuario.js';
import CustomException from "../../models/custom_exception.js";
import { Status } from '../../models/status.js';


/**
 * Retrieve a usuario by ID.
 * @param {number|string} id
 * @returns {Usuario|null}
 */
export async function getUsuarioById(req) {
    try {
        const id = req.params.id;
        const rows = await executeQuery('SELECT * FROM usuarios WHERE id = ? AND eliminado = 0 LIMIT 1', [id]);
        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'Usuario no encontrado',
                message: `No existe un usuario con id: ${id}`,
                status: Status.notFound
            });
        }
        return Usuario.fromJson(rows[0]);
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException(
            'Error retrieving usuario',
            error.message,
            error.stack
        );
    }
}

