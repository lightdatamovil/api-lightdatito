import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function createticket(req) {
    const {
        titulo,
        descripcion,
        tipo_ticket_id,
        proyecto_id,
        logistica_id,
        observador // ✅ lo agregamos al destructuring
    } = req.body;

    // Verificar si existe el tipo de ticket
    const tipoTicketExists = await executeQuery(
        `SELECT id FROM tipo_ticket WHERE id = ? AND eliminado = 0 LIMIT 1`,
        [tipo_ticket_id]
    );

    if (tipoTicketExists.length === 0) {
        throw new CustomException({
            title: 'Tipo de ticket no encontrado',
            message: `No existe un tipo de ticket con ID: ${tipo_ticket_id}`,
            status: Status.notFound
        });
    }

    // Observador opcional
    let observadorFinal = null;

    if (observador !== undefined && observador !== null) {
        const observadorExists = await executeQuery(
            `SELECT id FROM usuarios WHERE id = ? AND eliminado = 0 LIMIT 1`,
            [observador]
        );

        if (observadorExists.length === 0) {
            throw new CustomException({
                title: 'Observador no encontrado',
                message: `No existe un observador con ID: ${observador}`,
                status: Status.notFound
            });
        }

        observadorFinal = observador;
    }

    // Insertar ticket
    const query = `INSERT INTO tickets (
    titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id
  ) VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
        titulo,
        descripcion,
        tipo_ticket_id,
        observadorFinal, // ✅ este es el valor correcto
        proyecto_id,
        logistica_id
    ];

    const result = await executeQuery(query, values);

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
