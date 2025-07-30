import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Update an existing usuario by ID.
 * @param {number|string} id
 * @param {Object} data - fields to update
 * @returns {Usuario|null}
 */

// todo revisar aca 
export async function updateUsuario(req) {
    const id = req.params.id;
    const { nombre, email, password, url_imagen } = req.body;

    const query = `UPDATE usuarios SET nombre = ?, email = ?, password = ?, url_imagen = ? WHERE id = ? AND eliminado = 0`;
    const result = await executeQuery(query, [nombre, email, password, url_imagen, id]);

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Usuario no encontrado',
            message: `No existe un usuario activo con id: ${id}`,
            status: Status.notFound
        });
    }

}


