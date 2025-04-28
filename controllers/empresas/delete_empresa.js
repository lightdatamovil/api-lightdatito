/**
 * Soft-delete an empresa by ID (mark as eliminado).
 * @param {number|string} id - The ID of the empresa to delete.
 * @returns {Object} The ID of the deleted empresa.
 */
export async function deleteEmpresa(id) {
    const query = 'UPDATE logisticas SET eliminado = 1 WHERE id = ?';
    await executeQuery(query, [id]);
    return { id };
}
