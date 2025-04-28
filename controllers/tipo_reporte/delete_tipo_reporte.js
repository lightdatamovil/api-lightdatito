export async function deleteTipoReporte(id) {
    await executeQuery('DELETE FROM tipo_reporte WHERE id = ?', [id]);
    return { id };
}