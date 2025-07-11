// controllers/usuarios/puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import Puesto from '../../../models/puesto.js';

/**
 * Devuelve todos los puestos asignados a un usuario.
 * @param {number} usuarioId
 * @returns {Promise<Puesto[]>}
 */
export async function getPuestosByUsuario(usuarioId) {
    try {
        const rows = await executeQuery(
            `SELECT p.* FROM puestos p JOIN puestos_usuario pu ON pu.puesto_id = p.id  WHERE pu.usuario_id = ? AND p.eliminado = 0`,
            [usuarioId]
        );
        return rows.map(r => Puesto.fromJson(r));
    } catch (err) {
        throw new CustomException({
            title: 'Error obteniendo puestos de usuario',
            message: err.message,
            stack: err.stack
        });
    }
}