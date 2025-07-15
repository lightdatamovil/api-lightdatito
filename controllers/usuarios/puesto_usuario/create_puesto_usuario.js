// controllers/usuarios/asignar_puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';

/**
 * Inserta una relación usuario↔puesto en la tabla intermedia puestos_usuario.
 * @param {number} usuarioId - ID del usuario
 * @param {number} tipoPuestoId - ID del puesto a asignar
 */
export async function asignarPuestoAUsuario(usuarioId, tipoPuestoId) {
    // 1) Verificar existencia del usuario
    const [user] = await executeQuery(
        'SELECT id FROM usuarios WHERE id = ?',
        [usuarioId],
        true,
    );
    if (!user) {
        throw new CustomException({
            title: 'Usuario inválido',
            message: `No existe un usuario con id ${usuarioId}`,
            status: Status.badRequest
        });
    }

    // 2) Verificar existencia del puesto
    const [puesto] = await executeQuery(
        'SELECT id FROM puestos WHERE id = ?',
        [tipoPuestoId],
        true, 0
    );
    if (!puesto) {
        throw new CustomException({
            title: 'Puesto inválido',
            message: `No existe un puesto con id ${tipoPuestoId}`,
            status: Status.badRequest
        });
    }

    // 3) Insertar la nueva asignación en la tabla intermedia
    await executeQuery(
        'INSERT INTO puestos_usuario (usuario_id, puesto_id) VALUES (?, ?)',
        [usuarioId, tipoPuestoId]
    );
}

