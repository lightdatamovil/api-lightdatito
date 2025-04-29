export default class ObservacionLogistica {
    constructor({ id, nombre, eliminado }) {
        this.id = id;
        this.nombre = nombre;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        return new ObservacionLogistica({
            id: row.id,
            nombre: row.nombre,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, eliminado: this.eliminado };
    }
}