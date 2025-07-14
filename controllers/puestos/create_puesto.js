import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';

export async function createPuesto(nombre) {
    try {

        //verificar si ya existe puestos
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM puestos WHERE LOWER(nombre) = LOWER(?)`,
            [nombre],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Puesto duplicado',
                message: `Ya existe un puesto con nombre "${nombre}"`,
                status: 400
            });
        }
        const result = await executeQuery(`INSERT INTO puestos (nombre) VALUES (lower(?))`, nombre, true);
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear estado_logistica',
                message: 'No se obtuvo el ID del registro insertado',
                status: 500
            });
        }

        const [row] = await executeQuery(
            `SELECT * FROM puestos WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear puesto',
                message: `No se pudo recuperar el registro con id=${newId}`,
                status: 500
            });
        }

        return PuestoUsuario.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear puesto',
            message: err.message,
            stack: err.stack
        });
    }
}
