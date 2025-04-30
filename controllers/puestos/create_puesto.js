import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function createPuesto(nombre) {
    try {
        const query = `INSERT INTO puestos (nombre) VALUES (?) RETURNING *`;
        const rows = await executeQuery(query, [nombre]);
        return PuestoUsuario.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating puesto_usuario',
            error.message,
            error.stack
        );
    }
}