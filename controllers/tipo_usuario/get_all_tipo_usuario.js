export async function getAllTipoUsuario() {
    const rows = await executeQuery('SELECT * FROM tipo_usuario');
    return rows.map(r => TipoUsuario.fromJson(r));
}