export async function updateObservacionEmpresa(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateObservacionEmpresa');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE observaciones_logistica SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getObservacionEmpresaById(id);
}