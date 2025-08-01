import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Aviso from "../../models/aviso.js";
import { Status } from "../../models/status.js";


export async function getAllAvisos() {
    const rows = await executeQuery(`SELECT * FROM avisos WHERE eliminado = 0`
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'No hay avisos',
            message: 'No se encontraron avisos activos',
            status: Status.noContent
        });
    }
    return rows.map(r => Aviso.fromJson(r));
}