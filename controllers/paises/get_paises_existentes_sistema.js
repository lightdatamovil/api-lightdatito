import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Pais from '../../models/pais.js';
import { Status } from '../../models/status.js';

export async function getAllPaisesEnSistema() {
    const rows = await executeQuery(
        'SELECT * FROM paises WHERE eliminado = 0 AND existe_en_sistema = 1'
    );
    if (rows.length === 0) {
        throw new CustomException({
            title: 'No se encontraron países',
            message: 'No hay países existentes en el sistema',
            status: Status.notFound
        });
    }
    return rows.map(r => Pais.fromJson(r));

}
