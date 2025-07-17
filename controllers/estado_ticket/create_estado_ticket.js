import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createEstadoticket(body) {
    const { nombre, color } = body;
    try {
        const nombre_limpio = nombre.trim().toLowerCase();
        const color_limpio = color.trim().toLowerCase();
        //verificar si ya existe tipo_usuario
        const [{ count }] = await executeQuery(`SELECT COUNT(*) AS count FROM estados_ticket WHERE nombre = ? and color= ?`,
            [nombre_limpio, color_limpio],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Estado ticket duplicado',
                message: `Ya existe un estado con nombre "${nombre_limpio}" y  color "${color_limpio}`,
                status: Status.badRequest
            });
        }

        const result = await executeQuery(
            `INSERT INTO estados_ticket (nombre, color) VALUES (?, ?)`,
            [nombre_limpio, color_limpio]
        );

        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear estado_ticket',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }
        return { newId };
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al crear estado_ticket',
            message: error.message,
            stack: error.stack
        });
    }
}
