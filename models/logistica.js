export default class Logistica {
    constructor({
        id,
        did,
        nombre,
        url_imagen,
        plan_id,
        estado_logistica_id,
        codigo,
        observaciones_logistica_id,
        password_soporte,
        cuit,
        email,
        url_sistema,
        fecha_alta,
        eliminado,
        pais_id
    }) {
        this.id = id;
        this.did = did;
        this.nombre = nombre;
        this.url_imagen = url_imagen;
        this.plan_id = plan_id;
        this.estado_logistica_id = estado_logistica_id;
        this.codigo = codigo;
        this.observaciones_logistica_id = observaciones_logistica_id;
        this.password_soporte = password_soporte;
        this.cuit = cuit;
        this.email = email;
        this.url_sistema = url_sistema;
        this.fecha_alta = fecha_alta;
        this.eliminado = eliminado;
        this.pais_id = pais_id;
    }

    static fromJson(row) {
        return new Logistica({
            id: row.id,
            did: row.did,
            nombre: row.nombre,
            url_imagen: row.url_imagen,
            plan_id: row.plan_id,
            estado_logistica_id: row.estado_logistica_id,
            codigo: row.codigo,
            observaciones_logistica_id: row.observaciones_logistica_id,
            password_soporte: row.password_soporte,
            cuit: row.cuit,
            email: row.email,
            url_sistema: row.url_sistema,
            fecha_alta: row.fecha_alta,
            eliminado: row.eliminado,
            pais_id: row.pais_id
        });
    }

    toJson() {
        return {
            id: this.id,
            did: this.did,
            nombre: this.nombre,
            url_imagen: this.url_imagen,
            plan_id: this.plan_id,
            estado_logistica_id: this.estado_logistica_id,
            codigo: this.codigo,
            observaciones_logistica_id: this.observaciones_logistica_id,
            password_soporte: this.password_soporte,
            cuit: this.cuit,
            email: this.email,
            url_sistema: this.url_sistema,
            fecha_alta: this.fecha_alta,
            eliminado: this.eliminado,
            pais_id: this.pais_id
        };
    }
}