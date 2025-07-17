import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createticket(req) {

    const { titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id } = req.body;

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
    return newId;
}