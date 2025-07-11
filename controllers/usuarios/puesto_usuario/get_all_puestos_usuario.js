
// controllers/usuarios/puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';


/**
 * Devuelve todas las asignaciones de puestos_usuario activas (soft delete = 0).
 * @returns {Promise<Array<{usuario_id: number, puesto_id: number, fecha_creacion: string, eliminado: number}>>}
 */
export async function getAllPuestosUsuario() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM puestos_usuario WHERE eliminado = 0',
            []
        );
        return rows;
    } catch (err) {
        throw new CustomException({
            title: 'Error obteniendo todas las asignaciones de puestos',
            message: err.message,
            stack: err.stack
        });
    }
}