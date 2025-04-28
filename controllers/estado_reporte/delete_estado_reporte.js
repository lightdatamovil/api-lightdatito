export async function deleteEstadoReporte(id) {
    await executeQuery('DELETE FROM estados_reporte WHERE id = ?', [id]);
    return { id };
}