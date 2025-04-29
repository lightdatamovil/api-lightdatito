import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function deletePuesto(id) {
    try {
        await executeQuery('UPDATE puestos SET eliminado = 1 WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating puesto_usuario',
            error.message,
            error.stack
        );
    }
}
