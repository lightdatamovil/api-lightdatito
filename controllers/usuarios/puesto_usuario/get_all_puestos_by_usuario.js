// controllers/usuarios/puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import PuestoUsuario from '../../../models/puesto_usuario.js';
import { Status } from '../../../models/status.js';


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
        if (rows.length === 0) {
            throw new CustomException({
                title: 'Puestos no encontrados',
                message: `No existen puestos asignados al usuario con id: ${usuarioId}`,
                status: Status.notFound
            });
        }
        return rows.map(r => PuestoUsuario.fromJson(r));
    } catch (err) {
        //agregar estalinea a todos las funciones 
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error obteniendo puestos de usuario',
            message: err.message,
            stack: err.stack
        });
    }
}