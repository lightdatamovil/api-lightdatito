export async function updateTipoReporte(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateTipoReporte');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE tipo_reporte SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getTipoReporteById(id);
}