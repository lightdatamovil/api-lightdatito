import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Aviso from "../../models/aviso.js";
import { Status } from "../../models/status.js";

export async function getAvisoById(req) {
    const id = req.params.id;
    const rows = await executeQuery(
        `SELECT * FROM avisos WHERE id = ? AND eliminado = 0 LIMIT 1`,
        [id]
    );
    if (rows.length === 0) {
        throw new CustomException({
            title: "Aviso no encontrado",
            message: `No existe un aviso con id: ${id}`,
            status: Status.notFound
        });
    }
    return Aviso.fromJson(rows[0]);
}