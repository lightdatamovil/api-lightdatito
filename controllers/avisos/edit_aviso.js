import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";


export async function updateAviso(req) {
    const id = req.params.id;
    const contenido = req.body.contenido;
    // Intento directo de UPDATE y compruebo si afectó alguna fila
    const result = await executeQuery(`UPDATE avisos SET contenido = ?  WHERE id = ?  AND eliminado = 0`, [contenido, id], true
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Aviso no encontrado',
            message: `No existe un aviso activo con id: ${id}`,
            status: Status.notFound
        });
    }

}