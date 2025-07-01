import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function createPuesto(nombre) {
    try {
        //verificar si ya existe puestos
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM puestos WHERE nombre = ?`,
            [nombre].trim().toLowerCase(),
            true, 0
            );
        if (count > 0) {
            throw new CustomException({
            title:   'Puesto duplicado',
            message: `Ya existe un puesto con nombre "${nombre}"`,
            status:  400
        });
        }

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