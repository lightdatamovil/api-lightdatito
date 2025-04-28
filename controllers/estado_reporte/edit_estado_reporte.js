export async function updateEstadoReporte(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateEstadoReporte');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE estados_reporte SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getEstadoReporteById(id);
}