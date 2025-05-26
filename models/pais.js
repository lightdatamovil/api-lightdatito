export default class Pais {
    constructor({ id, nombre, codigo_iso }) {
        this.id = id;
        this.nombre = nombre;
        this.codigo_iso = codigo_iso;
    }

    static fromJson(row) {
        return new Pais({
            id: row.id,
            nombre: row.nombre,
            codigo_iso: row.codigo_iso
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, codigo_iso: this.codigo_iso };
    }
}