import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function getAllPuestos() {
    try {
        const rows = await executeQuery('SELECT * FROM puestos WHERE eliminado = 0');
        return rows.map(r => PuestoUsuario.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}