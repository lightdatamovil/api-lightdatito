
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function getAllTipoParticularidad() {
    const rows = await executeQuery('SELECT * FROM tipo_particularidad WHERE eliminado = 0',);
    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'No se encontraron tipos de particularidad activos',
            message: 'No se encontraron tipos de particularidad activos',
            status: Status.noContent,
        });
    }

    return rows.map(row => {
        return {
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion || null,
            eliminado: row.eliminado === 1
        };
    });
}       
