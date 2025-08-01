import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";

export async function deleteAviso(req) {
    const id = req.params.id;
    // Intento directo de soft-delete y compruebo si afectó alguna fila
    const result = await executeQuery(
        `UPDATE avisos SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id], true
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Aviso no encontrado',
            message: `No existe un aviso activo con id: ${id}`,
            status: Status.notFound
        });
    }

}