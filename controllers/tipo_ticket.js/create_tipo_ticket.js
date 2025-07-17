import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function createTipoTicket(req) {

    const { nombre, color } = req.body;
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
            status: Status.internalServerError
        });
    }

    return newId;

}