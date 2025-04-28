/**
 * Update an existing estado_empresa by ID.
 * @param {number|string} id - The ID of the estado to update.
 * @param {Object} data - Fields and values to update.
 * @returns {EstadoEmpresa|null} The updated EstadoEmpresa instance, or null if not found.
 */
export async function updateEstadoEmpresa(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateEstadoEmpresa');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE estados_logistica SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getEstadoEmpresaById(id);
}
