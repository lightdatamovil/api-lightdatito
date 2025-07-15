import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import Tipoticket from '../../models/tipo_ticket.js';

export async function createTipoTicket(nombre, color) {
    try {
        const clean_name = nombre.trim().toLowerCase();
        //verificar si ya existe tipo_ticket
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM tipo_ticket WHERE nombre = ?`,
            [clean_name],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Tipo de tipo_ticket duplicado',
                message: `Ya existe un tipo_ticket con nombre "${nombre}"`,
                status: Status.conflict
            });
        }

        // 1) Insertar sin RETURNING
        const result = await executeQuery(
            `INSERT INTO tipo_ticket (nombre, color) VALUES (?, ?)`,
            [nombre, color]
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear tipo_ticket',
                message: 'No se obtuvo el ID del registro insertado',
                status: 500
            });
        }

        // 3) Recuperar el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM tipo_ticket WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear tipo_ticket',
                message: `No se pudo recuperar el registro con id=${newId}`,
                status: 500
            });
        }

        return Tipoticket.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear tipo_ticket',
            message: err.message,
            stack: err.stack
        });
    }
}