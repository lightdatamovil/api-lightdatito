import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function getPuestoById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM puestos WHERE id = ? AND eliminado = 0', [id]);
        return rows.length ? PuestoUsuario.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating puesto_usuario',
            error.message,
            error.stack
        );
    }
}