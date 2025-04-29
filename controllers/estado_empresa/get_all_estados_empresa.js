import { executeQuery } from '../../db.js';
import EstadoEmpresa from '../../models/estado_empresa.js';

/**
 * Retrieve all estados_empresas.
 * @returns {Array<EstadoEmpresa>} List of EstadoEmpresa instances.
 */
export async function getAllEstadosEmpresas() {
    const rows = await executeQuery('SELECT * FROM estados_logistica');
    return rows.map(r => EstadoEmpresa.fromJson(r));
}