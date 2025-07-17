import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";

export async function createComentario(body) {
    const { usuario_id, ticket_id, texto } = body;

    try {
        // 1) Verificar que el usuario exista y no esté eliminado
        const userCheck = await executeQuery(
            `SELECT 1
         FROM usuarios
        WHERE id = ?
          AND eliminado = 0
        LIMIT 1`,
            [usuario_id],
            true
        );
        if (!userCheck || userCheck.length === 0) {
            throw new CustomException({
                title: 'Usuario no encontrado',
                message: `No existe un usuario activo con id=${usuario_id}`,
                status: Status.notFound
            });
        }

        // 2) Verificar que el ticket exista y no esté eliminado
        const ticketCheck = await executeQuery(
            `SELECT 1
         FROM tickets
        WHERE id = ?
          AND eliminado = 0
        LIMIT 1`,
            [ticket_id],
            true
        );
        if (!ticketCheck || ticketCheck.length === 0) {
            throw new CustomException({
                title: 'Ticket no encontrado',
                message: `No existe un ticket activo con id=${ticket_id}`,
                status: Status.notFound
            });
        }

        // 3) Insertar el comentario
        const result = await executeQuery(
            `INSERT INTO comentarios (usuario_id, ticket_id, contenido)
       VALUES (?, ?, ?)`,
            [usuario_id, ticket_id, texto],
            true
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear comentario',
                message: 'No se obtuvo el ID del comentario insertado',
                status: Status.internalServerError
            });
        }

        return { newId };

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear comentario',
            message: err.message,
            stack: err.stack,
            status: Status.internalServerError
        });
    }
}
