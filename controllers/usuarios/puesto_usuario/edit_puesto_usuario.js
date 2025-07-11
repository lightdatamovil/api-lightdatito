// controllers/usuarios/update_puesto_usuario.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';

export async function updatePuestoUsuario(usuarioId, puestoId) {
    // 1) Verificar que el puesto exista
    const [puesto] = await executeQuery(
        'SELECT id FROM puestos WHERE id = ?',
        [puestoId],
        true, 0
    );
    if (!puesto) {
        throw new CustomException({
            title: 'Puesto inválido',
            message: `No existe un puesto con id ${puestoId}`,
            status: 400
        });
    }

    // 2) Borrar asignaciones anteriores
    await executeQuery(
        'DELETE FROM puestos_usuario WHERE usuario_id = ?',
        [usuarioId]
    );

    // 3) Insertar la nueva relación
    await executeQuery(
        'INSERT INTO puestos_usuario (usuario_id, puesto_id) VALUES (?, ?)',
        [usuarioId, puestoId]
    );
}
