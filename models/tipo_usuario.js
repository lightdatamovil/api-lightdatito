import { logYellow } from "../src/funciones/logsCustom.js";

export default class TipoUsuario {
    constructor({ id, nombre, fecha_creacion, eliminado }) {
        this.id = id;
        this.nombre = nombre;
        this.fecha_creacion = fecha_creacion;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        logYellow(`${JSON.stringify(row)}`)
        return new TipoUsuario({
            id: row.id,
            nombre: row.nombre,
            fecha_creacion: row.fecha_creacion,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, fecha_creacion: this.fecha_creacion, eliminado: this.eliminado };
    }
}
