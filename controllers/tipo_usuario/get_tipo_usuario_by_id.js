export async function getTipoUsuarioById(id) {
    const rows = await executeQuery('SELECT * FROM tipo_usuario WHERE id = ?', [id]);
    return rows.length ? TipoUsuario.fromJson(rows[0]) : null;
}