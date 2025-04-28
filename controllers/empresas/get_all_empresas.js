/**
 * Retrieve all empresas (logisticas) that are not deleted.
 * @returns {Array<Empresa>} List of Empresa instances.
 */
export async function getAllEmpresas() {
    const query = 'SELECT * FROM logisticas WHERE eliminado = 0';
    const rows = await executeQuery(query);
    return rows.map(row => Empresa.fromJson(row));
}