/**
 * Retrieve all estados_empresas.
 * @returns {Array<EstadoEmpresa>} List of EstadoEmpresa instances.
 */
export async function getAllEstadosEmpresas() {
    const rows = await executeQuery('SELECT * FROM estados_logistica');
    return rows.map(r => EstadoEmpresa.fromJson(r));
}