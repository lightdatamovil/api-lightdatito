import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';
import { Status } from '../../models/status.js';

export async function createPuesto(nombre) {
    try {
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM puestos WHERE nombre = ?`,
            [nombre],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Puesto duplicado',
                message: `Ya existe un puesto con nombre "${nombre}"`,
                status: Status.conflict
            });
        }

        // Insertar el nuevo puesto
        const { insertId } = await executeQuery(
            `INSERT INTO puestos (nombre) VALUES (LOWER(?))`,
            [nombre]
        );
        if (!insertId) {
            throw new CustomException({
                title: 'Error al crear puesto',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        // Obtener el puesto recién creado y devolverlo como PuestoUsuario
        const [row] = await executeQuery(
            `SELECT * FROM puestos WHERE id = ?`,
            [insertId]
        );
        return PuestoUsuario.fromJson(row);
    } catch (err) {
        throw err instanceof CustomException ? err : new CustomException({
            title: 'Error al crear puesto',
            message: err.message,
            stack: err.stack
        });
    }
}
