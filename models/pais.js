export default class Pais {
    constructor({ id, nombre, codigo_iso, existe_en_sistema }) {
        this.id = id;
        this.nombre = nombre;
        this.codigo_iso = codigo_iso;
        this.existe_en_sistema = existe_en_sistema;
    }

    static fromJson(row) {
        return new Pais({
            id: row.id,
            nombre: row.nombre,
            codigo_iso: row.codigo_iso,
            existe_en_sistema: row.existe_en_sistema

        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, codigo_iso: this.codigo_iso };
    }
}