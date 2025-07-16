import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { Status } from "../../models/status.js";


export async function createComentario(body) {
    const { usuario_id, ticket_id, texto } = body;
    try {
        // Insertar y obtener el comentario en una sola consulta
        const query = `INSERT INTO comentarios (usuario_id, ticket_id, contenido) VALUES (?, ?, ?)`;
        const params = [usuario_id, ticket_id, texto];

        const results = await executeQuery(query, params);

        // results[1][0] contiene el comentario insertado (puede variar según el driver)
        const row = Array.isArray(results) && results.length > 1 ? results[1][0] : null;
        if (!row) {
            throw new CustomException({
                title: "Error al crear comentario",
                message: "No se obtuvo el comentario insertado",
                status: Status.internalServerError
            });
        }

        return Comentario.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al crear comentario",
            message: err.message,
            stack: err.stack
        });
    }
}
