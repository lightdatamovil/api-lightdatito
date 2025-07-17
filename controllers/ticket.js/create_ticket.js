import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createticket(body) {

    const { titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id } = body;
    try {
        const query = `INSERT INTO tickets (titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id)  VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            titulo,
            descripcion,
            tipo_ticket_id,
            observador,
            proyecto_id,
            logistica_id
        ];
        const result = await executeQuery(query, values);

        // 2) verificar id insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear ticket',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        return { newId };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear ticket',
            message: err.message,
            stack: err.stack
        });
    }
}