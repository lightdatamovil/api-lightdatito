import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Pais from '../../models/pais.js';
import { Status } from '../../models/status.js';

export async function getAllPaises() {
    const rows = await executeQuery(
        'SELECT * FROM paises WHERE eliminado = 0'
    );
    if (rows.length === 0) {
        throw new CustomException({
            title: 'No se encontraron países',
            message: 'No hay países disponibles en el sistema',
            status: Status.notFound

        });
    }
    const paises = rows.map(r => Pais.fromJson(r));

    const existente_en_sistema = paises
        .filter(p => p.existe_en_sistema === 1)
        .map(p => p.toJson());
    const no_existente_en_sistema = paises
        .filter(p => p.existe_en_sistema === 0)
        .map(p => p.toJson());

    return {
        existente_en_sistema,
        no_existente_en_sistema
    };
}

