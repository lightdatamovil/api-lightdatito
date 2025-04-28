/**
 * Retrieve a single estado_empresa by ID.
 * @param {number|string} id - The ID of the estado to fetch.
 * @returns {EstadoEmpresa|null} The EstadoEmpresa instance, or null if not found.
 */
export async function getEstadoEmpresaById(id) {
    const rows = await executeQuery('SELECT * FROM estados_logistica WHERE id = ?', [id]);
    return rows.length ? EstadoEmpresa.fromJson(rows[0]) : null;
}