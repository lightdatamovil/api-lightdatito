import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';
import { Status } from '../../models/status.js';

export async function getAllPuestos() {
    const rows = await executeQuery('SELECT * FROM puestos WHERE eliminado = 0');
    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'Puestos no encontrados',
            message: `Puestos no encontrados`,
            status: Status.noContent
        });
    }

    return rows.map(r => PuestoUsuario.fromJson(r));
}