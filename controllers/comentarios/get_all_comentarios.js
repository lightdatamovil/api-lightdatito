import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";

export async function getAllComentarios() {
    try {
        const rows = await executeQuery(
            `SELECT * FROM comentarios
       WHERE eliminado = 0`
        );
        return rows.map(r => Comentario.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al obtener comentarios",
            message: err.message,
            stack: err.stack
        });
    }
}
