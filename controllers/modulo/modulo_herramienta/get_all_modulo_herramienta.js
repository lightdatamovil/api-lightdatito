import { executeQuery } from '../../../db.js';

export async function getAllModuloHerramienta() {
    return await executeQuery(
        `SELECT 
       id,
       modulo_id,
       herramienta_id,
       fecha_creacion
     FROM modulo_herramienta
     WHERE eliminado = 0`
    );
}
