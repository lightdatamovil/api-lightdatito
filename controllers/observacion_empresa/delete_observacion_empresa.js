export async function deleteObservacionEmpresa(id) {
    await executeQuery('DELETE FROM observaciones_logistica WHERE id = ?', [id]);
    return { id };
}