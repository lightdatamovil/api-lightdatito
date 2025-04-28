/**
 * Retrieve a single empresa by ID.
 * @param {number|string} id - The ID of the empresa to fetch.
 * @returns {Empresa|null} The Empresa instance, or null if not found.
 */
export async function getEmpresaById(id) {
    const query = 'SELECT * FROM logisticas WHERE id = ? AND eliminado = 0';
    const rows = await executeQuery(query, [id]);
    if (!rows.length) return null;
    return Empresa.fromJson(rows[0]);
}