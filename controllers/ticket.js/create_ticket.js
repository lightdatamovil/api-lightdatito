import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ticket from '../../models/reporte.js';


export async function createticket(
    titulo,
    descripcion,
    tipo_ticket_id,
    observador,
    proyecto_id,
    logistica_id
) {
    try {


        // 1) Insertar sin RETURNING
        const result = await executeQuery(
            `INSERT INTO tickets
          (titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
            [
                titulo,
                descripcion,
                tipo_ticket_id,
                observador,
                proyecto_id,
                logistica_id
            ], true
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear ticket',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        // 3) Recuperar el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM tickets WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear ticket',
                message: `No se pudo recuperar el ticket con id=${newId}`
            });
        }

        return ticket.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear ticket',
            message: err.message,
            stack: err.stack
        });
    }
}