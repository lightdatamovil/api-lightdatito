// controllers/usuarios/asignar_puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

/**
 * Inserta una relación usuario↔puesto en la tabla intermedia puestos_usuario.
 * @param {number} usuarioId - ID del usuario
 * @param {number} tipoPuestoId - ID del puesto a asignar
 */
export async function asignarPuestoAUsuario(usuarioId, tipoPuestoId) {
    // 1) Verificar existencia del usuario
    const [user] = await executeQuery(
        'SELECT id FROM usuarios WHERE id = ? AND ELIMINADO = 0',
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

    // verificar si ya existe una asignación activa
    const existe = await executeQuery(
        'SELECT fecha_creacion FROM puestos_usuario WHERE usuario_id = ? AND puesto_id = ? AND eliminado = 0 LIMIT 1',
        [usuarioId, tipoPuestoId],
        true, 0
    );
    if (existe.length > 0) {
        throw new CustomException({
            title: 'Asignación duplicada',
            message: `El usuario ya tiene asignado el puesto con id ${tipoPuestoId}`,
            status: Status.conflict
        });
    }

    // 3) Insertar la nueva asignación en la tabla intermedia
    await executeQuery(
        'INSERT INTO puestos_usuario (usuario_id, puesto_id) VALUES (?, ?)',
        [usuarioId, tipoPuestoId]
    );
}

