
export async function updatePuesto(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updatePuesto');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE puestos SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getPuestoById(id);
}