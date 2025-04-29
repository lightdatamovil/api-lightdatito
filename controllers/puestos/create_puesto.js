import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function createPuesto(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createPuesto');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO puestos (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return PuestoUsuario.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating puesto_usuario',
            error.message,
            error.stack
        );
    }
}