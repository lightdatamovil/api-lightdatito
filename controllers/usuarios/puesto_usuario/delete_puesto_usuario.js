// controllers/usuarios/puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
/**
 * Marca como eliminado una asignación de puesto a un usuario (soft delete).
 * @param {number} usuarioId
 * @param {number} puestoId
 */
export async function deletePuestoUsuario(usuarioId, puestoId) {
    try {
        await executeQuery(
            'UPDATE puestos_usuario SET eliminado = 1, fecha_eliminado = NOW() WHERE usuario_id = ? AND puesto_id = ?',
            [usuarioId, puestoId]
        );
    } catch (err) {
        throw new CustomException({
            title: 'Error eliminando asignación de puesto',
            message: err.message,
            stack: err.stack
        });
    }
}
