export async function deleteTipoUsuario(id) {
    await executeQuery('DELETE FROM tipo_usuario WHERE id = ?', [id]);
    return { id };
}