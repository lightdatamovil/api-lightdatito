import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";

export async function createComentario(reporteId, texto) {
    try {
        const result = await executeQuery(
            `INSERT INTO comentarios (reporte_id, comentario) VALUES (?, ?)`,
            [reporteId, texto]
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: "Error al crear comentario",
                message: "No se obtuvo el ID del comentario insertado"
            });
        }

        const [row] = await executeQuery(
            `SELECT * FROM comentarios WHERE id = ?`,
            [newId]
        );
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
