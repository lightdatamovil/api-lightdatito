import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Estadoticket from '../../models/estado_ticket.js';
import { Status } from '../../models/status.js';
import { getEstadoLogisticaById } from './get_estado_logistica_by_id.js';

export async function createEstadoticket(req) {
    const { nombre, color } = req.body;
    try {
        const nombre_limpio = nombre.trim().toLowerCase();
        const color_limpio = color.trim().toLowerCase();
        const verificar = await executeQuery(`SELECT COUNT(*) AS count FROM estados_ticket WHERE nombre = ? and color= ? LIMIT 1`,
            [nombre_limpio, color_limpio],
            true, 0
        );
        if (verificar == null || verificar.length === 0) {
            throw new CustomException({
                title: 'Estado ticket duplicado',
                message: `Ya existe un estado con nombre "${nombre_limpio}" y  color "${color_limpio}`,
                status: Status.conflict
            });
        }

        const result = await executeQuery(
            `INSERT INTO estados_ticket (nombre, color) VALUES (?, ?)`, [nombre_limpio, color_limpio]
        );

        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear estado_ticket',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        const row = getEstadoLogisticaById(newId);

        return Estadoticket.fromJson(row);
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al crear estado_ticket',
            message: error.message,
            stack: error.stack
        });
    }
}
