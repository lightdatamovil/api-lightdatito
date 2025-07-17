import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";

import { Status } from "../../models/status.js";

export async function getAllComentarios() {
    const rows = await executeQuery(`SELECT * FROM comentarios WHERE eliminado = 0`
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'No hay comentarios',
            message: 'No se encontraron comentarios activos',
            status: Status.noContent
        });
    }
    return rows.map(r => Comentario.fromJson(r));
}