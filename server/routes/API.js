const express = require("express")
const api = express.Router()
const cors = require('cors')
const db = require("../database/db_local")
var https = require('https')
api.use(cors())
process.env.SECRET_KEY = 'secret'
const api_name = "/pdr_api/v1";

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

// Start api solicitud
// Parameters
api.get(api_name + '/general/:grupo', (req, res) => {
    db.sequelize
        .query('select codigo as value, descripcion as label,* from general where grupo = :grupo',
            { replacements: { grupo: req.params.grupo }, type: db.sequelize.QueryTypes.SELECT }
        )
        .then((result) => {
            res.json(result);
        });
});

api.get(api_name + '/general', (req, res) => {
    db.sequelize
        .query('select codigo as value, descripcion as label,* from general', { type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json(result);
        });
});

// buscar usuario
api.get(api_name + '/personal/:codigo', (req, res) => {
    db.sequelize
        .query('select * from personal where codigo= :codigo ', { replacements: { codigo: req.params.codigo }, type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json(result);
        })
});

api.get(api_name + '/personal', (req, res) => {
    var query = " select id,ltrim(codigo)as codigo,ltrim(sociedad)as sociedad,ltrim(codigo_division)as codigo_division, " +
        " ltrim(nombre_division_personal)as nombre_division_personal,ltrim(codigo_sub_division)as codigo_sub_division," +
        " ltrim(nombres_sub_division)as nombres_sub_division,ltrim(dni)as dni,ltrim(nombres)as nombres,ltrim(apellido_paterno)as apellido_paterno," +
        " ltrim(apellido_materno)as apellido_materno,ltrim(email_corp)as email_corp,ltrim(email_personal)as email_personal," +
        " ltrim(codigo_posicion)as codigo_posicion,ltrim(descripcion_posicion)as descripcion_posicion,ltrim(codigo_centro_coste)as codigo_centro_coste," +
        " ltrim(centro_coste)as centro_coste,ltrim(codigo_funcion)as codigo_funcion,ltrim(funcion)as funcion,ltrim(codigo_ocupacion)as codigo_ocupacion," +
        " ltrim(ocupacion)as ocupacion,ltrim(codigo_unidad_org)as codigo_unidad_org,ltrim(unidad_organizativa)as unidad_organizativa," +
        " fecha_nac,inicio_contrata,fin_contrata,ltrim(cod_jefe)as cod_jefe," +
        " ltrim(saldo_dias_vacaion)as saldo_dias_vacaion,ltrim(saldo_dias_descanso)as saldo_dias_descanso,ltrim(categoria) as categoria " +
        " from personal";
    db.sequelize
        .query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json(result);
        })
});

// Create Solicitud
api.post(api_name + '/solicitudes', (req, res) => {
    var query = " insert into solicitud(id_aprobador,id_jefe_directo,id_puesto,cantidad,id_modalidad,fecha_estimada_inicio, " +
        " id_plazo,nombre_cliente,descripcion_servicio,volumen_motivo,inicio_estimado_tiempo,estimacion_duracion_tiempo, " +
        " observaciones, descripcion,fecha_registro,usuario_registro,estado )";
    var data = " values(" + req.body.id_aprobador + "," + req.body.id_jefe_directo + ",'" + req.body.id_puesto + "','"
        + req.body.cantidad + "','" + req.body.id_modalidad +
        "','" + req.body.fecha_estimada_inicio + "','" + req.body.id_plazo + "','" + req.body.nombre_cliente + "','"
        + req.body.descripcion_servicio +
        "','" + req.body.volumen_motivo + "','" + req.body.inicio_estimado_tiempo + "','" +
        req.body.estimacion_duracion_tiempo + "','" + req.body.observaciones +
        "','" + req.body.descripcion + "',now(),'" + req.body.usuario_registro
        + "'," + req.body.estado + ")";
    db.sequelize.query(query + data, { type: db.sequelize.QueryTypes.INSERT })
        .then(function (data) {
            if (req.body.detalle_solicitud.length > 0) {
                var query_detalls = "insert into solicitud_detalle(id_solicitud,id_grupo,id_grupo_tipo,descripcion,fecha_registro,usuario_registro,estado)";
                for (let i = 0; i < req.body.detalle_solicitud.length; i++) {
                    const element = req.body.detalle_solicitud[i];
                    var data_detalls = " values((SELECT max(id) from solicitud)," + element.id_grupo + ",'" + element.id_grupo_tipo + "','',now(),'"
                        + req.body.usuario_registro + "',true) ";
                    db.sequelize.query(query_detalls + data_detalls, { type: db.sequelize.QueryTypes.INSERT })
                        .then(function () {
                            res.json({
                                "respuesta": "success",
                                "data": data
                            });
                        }).catch(function (err) {
                            res.json({
                                "respuesta": "error",
                                "data": err
                            });
                        })
                }
            }
        }).catch(function (err) {
            res.json({
                "respuesta": "error",
                "data": err
            });
            console.log(err);
        });
    console.log(req.body);
})




// Datos Aprobaciones Pendientes 
api.post(api_name + '/aprobacionespendientes', (req, res) => {
    var query = "select " +
        // data solicitudd
        " sol.id,sol.id_aprobador,sol.id_jefe_directo,sol.id_puesto,sol.cantidad,sol.id_modalidad," +
        " sol.fecha_estimada_inicio,sol.id_plazo,sol.nombre_cliente, " +
        " sol.descripcion_servicio,sol.volumen_motivo,sol.inicio_estimado_tiempo,sol.estimacion_duracion_tiempo, " +
        " sol.observaciones,sol.descripcion,sol.remuneracion,sol.fecha_registro,sol.usuario_registro, " +
        " sol.fecha_modificacion,sol.usuario_modificacion,sol.estado,sol.estado as estado_des,sol.estado as estado_des1,sol.estado_vicepresidencia, " +
        " sol.glosa,sol.sociedad,sol.lider_uo,sol.codigo_uo,sol.descripcion_uo,sol.cod_divicion,sol.cod_sub_div, " +
        " sol.sctr,sol.id_area_personal,sol.id_relacion_personal,sol.file_dp,sol.direccion, " +

        // data users
        " us.codigo as id_apro,us.codigo as codigo_user,us.sociedad sociedad,us.codigo_division,us.nombre_division_personal,us.codigo_sub_division, " +
        " us.nombres_sub_division,us.dni,us.nombres, us.apellido_paterno,us.apellido_materno,us.email_corp, " +
        " us.email_personal,us.codigo_posicion,us.descripcion_posicion,us.codigo_centro_coste, " +
        " us.centro_coste,us.codigo_funcion,us.funcion,us.codigo_ocupacion,us.ocupacion,us.codigo_unidad_org,us.unidad_organizativa, " +
        " us.fecha_nac,us.inicio_contrata,us.fin_contrata,us.cod_jefe,us.saldo_dias_vacaion,us.saldo_dias_descanso,us.categoria, " +
        // data Jefe dir
        " j_d.codigo as id_jefe,j_d.codigo as codigo_jefe_dir, j_d.dni as dni_jefe,j_d.nombres as nombre_jefe, j_d.apellido_paterno as apellido_paterno_jefe, " +
        " j_d.apellido_materno as apellido_materno_jefe,j_d.email_corp as email_corp_jefe,j_d.email_personal as email_personal_jefe, " +
        // data grupo
        " puesto.codigo as puesto_id, puesto.descripcion as puesto_des, puesto.detalle as puesto_detalle, " +
        " modalidad.codigo as modalidad_id, modalidad.descripcion as modalidad_des, modalidad.detalle as modalidad_detalle," +
        " plazo.codigo as plazo_id, plazo.descripcion as plazo_des, plazo.detalle as plazo_detalle " +

        " from public.solicitud as sol " +
        " inner join public.personal as us on us.codigo=sol.id_aprobador " +
        " inner join public.personal as j_d on j_d.codigo=sol.id_jefe_directo " +
        " inner join public.general as puesto on rtrim(sol.id_puesto)=rtrim(puesto.codigo) and 'PUESTO'=rtrim(puesto.grupo) " +
        " inner join public.general as modalidad on rtrim(sol.id_modalidad)=rtrim(modalidad.codigo) and 'MODALIDAD'= rtrim(modalidad.grupo) " +
        " inner join public.general as plazo on rtrim(sol.id_plazo)=rtrim(plazo.codigo) and 'PLAZO'=rtrim(plazo.grupo) " +
        " where 0=0 ";
    // " -- and sol.estado=1  ";
    var condicion1 = "";
    if (req.body.num_solicitud != "") {
        condicion1 = " and  sol.id='" + req.body.num_solicitud + "'";
    }
    var condicion12 = "";
    if (req.body.estado != "") {
        condicion12 = " and sol.estado='" + req.body.estado + "'";
    }
    var limit = " order by sol.id desc limit 15";
    db.sequelize
        .query(query + condicion1 + condicion12 + limit, { type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.json({ "respuesta": "success", "result": result })
        })
        .catch(e => {
            res.json(
                { "respuesta": "error", "result": e }
            );
        })

});

// update solicitud status 
api.put(api_name + '/updatestatus', (req, res) => {
    var query = " update solicitud set estado=:estado where id=:id_solicitud ";
    db.sequelize.query(query, {
        replacements: { estado: req.body.estado, id_solicitud: req.body.id_solicitud },
        type: db.sequelize.QueryTypes.UPDATE
    }, { type: db.sequelize.QueryTypes.UPDATE })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result })
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
});

// Update estatus all
api.put(api_name + '/updatestatusall', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        var query = " update solicitud set estado=:estado where id=:id_solicitud ";
        db.sequelize.query(query, {
            replacements: { estado: req.body[i].estado, id_solicitud: req.body[i].id },
            type: db.sequelize.QueryTypes.UPDATE
        }, { type: db.sequelize.QueryTypes.UPDATE })
            .then((result) => {
                console.log(result);
                res.json({ 'respuesta': 'success', 'result': result })
            })
            .catch((e) => {
                console.log(e);
                res.json({ 'respuesta': 'error', 'result': e });
            })
    }
});


// DETALL SOLICITUD

api.get(api_name + '/detallesolicitud', (req, res) => {
    var query = 'select * from solicitud_detalle as sd inner join general as gen on gen.codigo=sd.id_grupo and gen.grupo=sd.id_grupo_tipo ';
    db.sequelize
        .query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result });
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
});







// Inssert remuneracion

api.post(api_name + '/remuneracion', (req, res) => {
    var query = " insert into remuneracion(solicitud_id,tipo_moneda,remuneracion_basico,vales,asig_movilidad,asignacion_otros,fecha_registro,usuario_registro,estado) ";
    var values = " values(" + req.body.solicitud_id + "," + req.body.tipo_moneda + ",'" + req.body.remuneracion_basico + "','" + req.body.vales + "','" +
        req.body.asig_movilidad + "','" + req.body.asignacion_otros + "',now(),'" + req.body.usuario_registro + "'," + req.body.estado + ")";
    db.sequelize.query(query + values, { type: db.sequelize.QueryTypes.INSERT })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result })
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e })
        })
    // console.log(req.body);
});


// Aprobacion viceprosidencia
api.put(api_name + '/updatestatusvicepresidencia', (req, res) => {
    var query = " update solicitud set estado_vicepresidencia=:estado_vicepresidencia where id=:id_solicitud ";
    db.sequelize.query(query, { replacements: { estado_vicepresidencia: req.body.estado_vicepresidencia, id_solicitud: req.body.id_solicitud }, type: db.sequelize.QueryTypes.UPDATE })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result })
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
});

// guardar requerimiento solicitud
// , ceco=:ceco, descuento_ceco=:descuento_ceco, porcentaje=:porcentaje

api.put(api_name + '/updaterequerimiento', (req, res) => {
    var query = " update solicitud set glosa=:glosa,  sociedad=:sociedad, lider_uo=:lider_uo, codigo_uo=:codigo_uo, descripcion_uo=:descripcion_uo, " +
        " cod_divicion=:cod_divicion, cod_sub_div=:cod_sub_div, sctr=:sctr, id_area_personal=:id_area_personal, id_relacion_personal=:id_relacion_personal, " +
        " file_dp=:file_dp, direccion=:direccion  where id=:id ";
    var data = {
        id: req.body.solicitud_id,
        glosa: req.body.glosa,
        sociedad: req.body.sociedad,
        lider_uo: req.body.lider_uo,
        codigo_uo: req.body.codigo_uo,
        descripcion_uo: req.body.descripcion_uo,
        cod_divicion: req.body.cod_divicion,
        cod_sub_div: req.body.cod_sub_div,
        sctr: req.body.sctr,
        id_area_personal: req.body.id_area_personal,
        id_relacion_personal: req.body.id_relacion_laboral,
        file_dp: req.body.file_dp,
        direccion: req.body.direccion
    }
    db.sequelize.query(query, { replacements: data, type: db.sequelize.QueryTypes.UPDATE })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result })
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
});


// Datos registro candidatos

api.post(api_name + '/listadosolicitudcandidatos', (req, res) => {
    console.log(req.body);

    var query = "select " +
        // data solicitudd
        " sol.id,sol.id_aprobador,sol.id_jefe_directo,sol.id_puesto,sol.cantidad,sol.id_modalidad," +
        " sol.fecha_estimada_inicio,sol.id_plazo,sol.nombre_cliente, " +
        " sol.descripcion_servicio,sol.volumen_motivo,sol.inicio_estimado_tiempo,sol.estimacion_duracion_tiempo, " +
        " sol.observaciones,sol.descripcion,sol.remuneracion,sol.fecha_registro,sol.usuario_registro, " +
        " sol.fecha_modificacion,sol.usuario_modificacion,sol.estado,sol.estado as estado_des,sol.estado as estado_des1,sol.estado_vicepresidencia, " +
        " sol.glosa,sol.sociedad,sol.lider_uo,sol.codigo_uo,sol.descripcion_uo,sol.cod_divicion,sol.cod_sub_div, " +
        " sol.sctr,sol.id_area_personal,sol.id_relacion_personal,sol.file_dp,sol.direccion, " +
        // data users
        " us.codigo as id_apro,us.codigo as codigo_user,us.sociedad sociedad,us.codigo_division,us.nombre_division_personal,us.codigo_sub_division, " +
        " us.nombres_sub_division,us.dni,us.nombres, us.apellido_paterno,us.apellido_materno,us.email_corp, " +
        " us.email_personal,us.codigo_posicion,us.descripcion_posicion,us.codigo_centro_coste, " +
        " us.centro_coste,us.codigo_funcion,us.funcion,us.codigo_ocupacion,us.ocupacion,us.codigo_unidad_org,us.unidad_organizativa, " +
        " us.fecha_nac,us.inicio_contrata,us.fin_contrata,us.cod_jefe,us.saldo_dias_vacaion,us.saldo_dias_descanso,us.categoria, " +
        // data Jefe dir
        " j_d.codigo as id_jefe,j_d.codigo as codigo_jefe_dir, j_d.dni as dni_jefe,j_d.nombres as nombre_jefe, j_d.apellido_paterno as apellido_paterno_jefe, " +
        " j_d.apellido_materno as apellido_materno_jefe,j_d.email_corp as email_corp_jefe,j_d.email_personal as email_personal_jefe, " +
        // data grupo
        " puesto.codigo as puesto_id, puesto.grupo as puesto_grupo, puesto.descripcion as puesto_des, puesto.detalle as puesto_detalle, " +
        " modalidad.codigo as modalidad_id, modalidad.grupo as modalidad_grupo, modalidad.descripcion as modalidad_des, modalidad.detalle as modalidad_detalle," +
        " plazo.codigo as plazo_id, plazo.grupo as plazo_grupo, plazo.descripcion as plazo_des, plazo.detalle as plazo_detalle, " +
        // Cantidad solicitante
        " (select count(*) from solicitud_candidato as s where s.id_solicitud=sol.id) as cantidad_candidato " +

        " from public.solicitud as sol" +
        " inner join public.personal as us on us.codigo=sol.id_aprobador " +
        " inner join public.personal as j_d on j_d.codigo=sol.id_jefe_directo" +
        " inner join public.general as puesto on sol.id_puesto=puesto.codigo and 'PUESTO'=puesto.grupo " +
        " inner join public.general as modalidad on sol.id_modalidad=modalidad.codigo and 'MODALIDAD'= modalidad.grupo " +
        " inner join public.general as plazo on sol.id_plazo=plazo.codigo and 'PLAZO'=plazo.grupo " +
        " where 0=0 ";
    // Por verser
    //  and sol.estado=0 ;

    var condicion1 = "";
    if (req.body.num_solicitud != "") {
        condicion1 = " and  sol.id='" + req.body.num_solicitud + "'";
    }

    var condicion2 = '';
    if (req.body.creador_solicitud != "") {
        condicion2 = " and ltrim(us.codigo) like '%" + req.body.creador_solicitud + "%' ";
    }
    var limit = " order by sol.id desc limit 10";
    db.sequelize
        .query(query + condicion1 + condicion2 + limit, { type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.json({ "respuesta": "success", "result": result })
        })
        .catch(e => {
            res.json(
                { "respuesta": "error", "result": e }
            );
        })

});


// agregar candidatos

api.post(api_name + '/candidatos', (req, res) => {
    var query = "     insert into solicitud_candidato  (id_solicitud,nombres,apellido_paterno,apellido_materno,tipo_documento, numero_documento,disponibilidad,email,file_cv,observaciones,fecha_registro,usuario_registro,estado) ";
    var values = "values(" + req.body.id_solicitud + ",'" + req.body.nombres + "','" + req.body.apellido_paterno + "','" +
        req.body.apellido_materno + "','" + req.body.tipo_documento + "','" +
        req.body.numero_documento + "','" + req.body.disponibilidad + "','" + req.body.email + "','" + req.body.file_cv + "','" +
        req.body.observaciones + "',now(),'" + req.body.usuario_registro + "',0)";
    db.sequelize.query(query + values, { type: db.sequelize.QueryTypes.INSERT })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result })
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e })
        })
    // console.log(req.body);
});


// listado candidatos

api.get(api_name + '/listado/candidatos', (req, res) => {
    var query = " select id,id_solicitud,nombres,apellido_paterno,apellido_materno,tipo_documento,numero_documento,disponibilidad, " +
        " email,file_cv,observaciones,fecha_registro,usuario_registro,fecha_modificacion,usuario_modificacion,estado, " +
        " CASE " +
        " WHEN estado=0 THEN 'Activo' " +
        " WHEN estado=1 THEN 'Inactivo' " +
        " END as estado_des, " +
        " id_sede_entrevista,contacto_sede,fecha_entrevista,prioridad,codigo_posicion, " +
        " rtrim(codigo_trabajo) as codigo_trabajo, genero,rtrim(talla_1) as talla_1,rtrim(talla_2) as talla_2,rtrim(talla_3) as talla_3 " +
        " from solicitud_candidato ";
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result });
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
});


// Api Update candidato
api.put(api_name + '/updatecandidato', (req, res) => {

    for (let i = 0; i < req.body.length; i++) {
        const element = req.body[i];
        var fecha_entrevista = 'now()';
        if (element.fecha_entrevista != '') {
            fecha_entrevista = "'" + element.fecha_entrevista + "'";
        }

        var query = " update  solicitud_candidato set id_sede_entrevista='" + element.id_sede_entrevista + "', contacto_sede='" + element.contacto_sede +
            "', fecha_entrevista=" + fecha_entrevista + ", estado='" + element.estado + "' ,prioridad='" + element.prioridad + "' where id='" + element.candidato_id + "' ";

        db.sequelize.query(query, { type: db.sequelize.QueryTypes.UPDATE })
            .then((result) => {
                res.json({ 'respuesta': 'success', 'result': result });
            })
            .catch((e) => {
                res.json({ 'respuesta': 'error', 'result': e });
            })

    }

});

// Update codigo_posicion candidato
api.put(api_name + '/updatecandidatoposicion', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        const element = req.body[i];
        var query = " update  solicitud_candidato set codigo_posicion='" + element.codigo_posicion + "' where id='" + element.candidato_id + "' ";
        db.sequelize.query(query, { type: db.sequelize.QueryTypes.UPDATE })
            .then((result) => {
                res.json({ 'respuesta': 'success', 'result': result });
            })
            .catch((e) => {
                res.json({ 'respuesta': 'error', 'result': e });
            })
    }
});


// Update candidato datos
api.put(api_name + '/updatecandidatodatos', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        var query = " update solicitud_candidato set codigo_trabajo=:codigo_trabajo, genero=:genero, talla_1=:talla_1, talla_2=:talla_2, talla_3=:talla_3 where id=:id_candidato ";
        var data = {
            codigo_trabajo: req.body[i].codigo_trabajo,
            genero: req.body[i].genero,
            talla_1: req.body[i].talla_1,
            talla_2: req.body[i].talla_2,
            talla_3: req.body[i].talla_3,
            id_candidato: req.body[i].id
        }
        db.sequelize.query(query, { replacements: data, type: db.sequelize.QueryTypes.UPDATE })
            .then((result) => {
                res.json({ 'respuesta': 'success', 'result': result })
                console.log(result);
            })
            .catch((e) => {
                res.json({ 'respuesta': 'error', 'result': e })
                console.log(e)
            })
    }
});



/*// exist
api.get(api_name + '/validarremuneracion', (req, res) => {
    var query = " select * from solicitud_candidato_remuneracion where solicitud_id=" + req.body.solicitud_id;
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result });
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
})*/

/*// list all
api.get(api_name + '/list/remuneracion', (req, res) => {
    var query = " select * from remuneracion";
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result });
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
})*/

// Update remuneracion negociado
api.put(api_name + '/updateremuneracionnegociable', (req, res) => {
    var fecha_neg = 'now()';
    if (req.body.fecha_inicio_neg != '') {
        fecha_neg = req.body.fecha_inicio_neg;
    }
    var query = " update remuneracion set  tipo_moneda_neg=:tipo_moneda_neg,remuneracion_basico_neg=:remuneracion_basico_neg, " +
        " vales_neg=:vales_neg,fecha_inicio_neg=:fecha_inicio_neg where id=:id and solicitud_id=:solicitud_id ";
    var data = {
        tipo_moneda_neg: req.body.tipo_moneda_neg,
        remuneracion_basico_neg: req.body.remuneracion_basico_neg,
        vales_neg: req.body.vales_neg,
        fecha_inicio_neg: fecha_neg,
        id: req.body.id,
        solicitud_id: req.body.solicitud_id
    }
    db.sequelize.query(query, { replacements: data, type: db.sequelize.QueryTypes.UPDATE })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result });
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e });
        })
});

//INICIO DE SOLICITUD DE BAJA
api.post(api_name + '/solicitudes_baja', (req, res) => {
    db.sequelize.query("select * from post_solicitud_baja(:id_trabajador, :id_jefe, :tipo_baja, :tipo_cese_formal," +
        ":tipo_cese_real, :fecha_cese, :fecha_hora_notificacion, :fecha_carta, :observaciones)",
        {
            replacements: {
                id_trabajador: req.body.id_trabajador, id_jefe: req.body.id_jefe, tipo_baja: req.body.tipo_baja,
                tipo_cese_formal: req.body.tipo_cese_formal, tipo_cese_real: req.body.tipo_cese_real, fecha_cese: req.body.fecha_cese,
                fecha_hora_notificacion: req.body.fecha_hora_notificacion, fecha_carta: req.body.fecha_carta, observaciones: req.body.observaciones
            },
            type: db.sequelize.QueryTypes.SELECT
        }).then((result) => res.json(result))
})

api.get(api_name + '/solicitud_baja/:id', (req, res) => {
    db.sequelize.query("select * from get_solicitud_baja(" + req.params.id + ");",
        { type: db.sequelize.QueryTypes.SELECT }).then((result) => res.json(result))
})

api.get(api_name + '/solicitud_baja', (req, res) => {
    db.sequelize.query("select * from get_solicitud_baja();",
        { type: db.sequelize.QueryTypes.SELECT }).then((result) => res.json(result))
})
//FIN DE SOLICITUD DE BAJA

// SEGIMIENTO DE SOLICITUD DE ALTA 

api.post(api_name + '/solicituddeuda', (req, res) => {
    // console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
        var dataselect = {
            id_solicitud: req.body[i].id,
            id_tipo: req.body[i].id_tipo
        }
        db.sequelize.query('select * from solicitud_baja_deuda where id_solicitud=:id_solicitud and id_tipo=:id_tipo', { replacements: dataselect, type: db.sequelize.QueryTypes.SELECT })
            .then((result) => {
                if (result.length > 0) {
                    var query = " update solicitud_baja_deuda set id_tipo=:id_tipo, tipo_moneda=:tipo_moneda, monto=:monto, estado=:estado where id_solicitud=:id_solicitud ";
                    var data = {
                        id_solicitud: req.body[i].id_solicitud,
                        id_tipo: req.body[i].id_tipo,
                        tipo_moneda: req.body[i].tipo_moneda,
                        monto: req.body[i].monto,
                        estado: req.body[i].estado
                    }
                    db.sequelize.query(query, { replacements: data, type: db.sequelize.QueryTypes.UPDATE })
                        .then((result) => {
                            res.json({ 'respuesta': 'success', 'result': result });
                            console.log(result);
                        })
                        .catch((e) => {
                            res.json({ 'respuesta': 'error', 'result': e })
                            console.log(e);
                        })
                } else {
                    var query = 'insert into solicitud_baja_deuda(id_solicitud,id_tipo,tipo_moneda,monto,estado,usuario_creacion,fecha_creacion) ';
                    var values = ' values(:id_solicitud,:id_tipo,:tipo_moneda,:monto,:estado,:usuario_creacion,now())';
                    var data = {
                        id_solicitud: req.body[i].id,
                        id_tipo: req.body[i].id_tipo,
                        tipo_moneda: req.body[i].tipo_moneda,
                        monto: req.body[i].monto,
                        estado: req.body[i].estado,
                        usuario_creacion: req.body[i].usuario_creacion
                    }
                    // console.log(data);
                    db.sequelize.query(query + values, { replacements: data, type: db.sequelize.QueryTypes.INSERT })
                        .then((result) => {
                            res.json({ 'respuesta': 'success', 'result': result });
                            console.log(result);
                        })
                        .catch((e) => {
                            res.json({ 'respuesta': 'error', 'result': e })
                            console.log(e);
                        })
                }
            })
        // if (req.body[i].id_solicitud==null || req.body.id_tipo==null) {
        // }else{
        // }
    }

})


api.put(api_name + '/updateestado', (req, res) => {
    var query = " update solicitud_baja set estado=:estado where id=:id ";
    var data = {
        estado: req.body.estado_solicitud,
        id: req.body.id
    }
    db.sequelize.query(query, { replacements: data, type: db.sequelize.QueryTypes.UPDATE })
        .then((result) => {
            res.json({ 'respuesta': 'success', 'result': result });
        })
        .catch((e) => {
            res.json({ 'respuesta': 'error', 'result': e })
        })

})


// FIN SOLICITUD ALTA




//LOGIN
api.post(api_name + '/login', (req, res) => {
    var options = {
        host: "apiseguridad-dot-pe-gromero-ransa-gcp.appspot.com",
        path: "/api/login?key=AIzaSyAdLDyWkxvLgDL-kSh7PDs-2-lnT1GtnJE",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    var req1 = https.request(options, function (res1) {
        var responseString = "";
        res1.on("data", function (data) {
            responseString += data;
        });
        res1.on("end", function () {
            res.json(responseString);
        });
    })

    var datalogin = {
        idAplicacion: 'f35176de-a73a-11e9-a428-42010a80035d',
        correo: req.body.correo,
        clave: req.body.clave,
    };

    var reqBody = JSON.stringify(datalogin);
    req1.write(reqBody)
    req1.end();
});
/*
api.post(api_name + '/login', (req, res) => {
    const poolData = {
        UserPoolId: "", // Your user pool id here    
        ClientId: "" // Your client id here
    };
    const pool_region = 'us-east-1';
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: req.body.correo,
        Password: req.body.clave,
    });

    var userData = {
        Username: req.body.correo,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function (err) {
            console.log(err);
        },

    });
    res.send(200).end();
});

api.post(api_name + '/changepassword', (req, res) => {
    const poolData = {
        UserPoolId: "", // Your user pool id here    
        ClientId: "" // Your client id here
    };
    const pool_region = 'us-east-1';
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: req.body.correo,
        Password: req.body.clave,
    });

    var userData = {
        Username: req.body.correo,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.changePassword(req.body.clave, req.body.newclave, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully changed password of the user.");
                    console.log(result);
                }
            });
        },
        onFailure: function (err) {
            console.log(err);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            // User was signed up by an admin and must provide new 
            // password and required attributes, if any, to complete 
            // authentication.

            // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
            // Required attributes according to schema, which don’t have any values yet, will have blank values.
            // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

            console.log(userAttributes);
            console.log(requiredAttributes);
            // Get these details and call 
            // newPassword: password that user has given
            // attributesData: object with key as attribute name and value that the user has given.
            cognitoUser.completeNewPasswordChallenge(req.body.newclave, { name: req.body.name, given_name: req.body.given_name, family_name: req.body.family_name }, this)
        }
    });
    res.send(200).end();
});

api.post(api_name + '/renew', (req, res) => {
    const poolData = {
        UserPoolId: "", // Your user pool id here    
        ClientId: "" // Your client id here
    };

    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: "your_refresh_token_from_a_previous_login" });
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: req.body.correo,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
        if (err) {
            console.log(err);
        } else {
            let retObj = {
                "access_token": session.accessToken.jwtToken,
                "id_token": session.idToken.jwtToken,
                "refresh_token": session.refreshToken.token,
            }
            console.log(retObj);
        }
    })
});*/

AWS.config.update({
    accessKeyId: 'AKIA5S2NFPNBYXPUWFOI',
    secretAccessKey: '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',
    region: 'us-east-1'
});

api.post(api_name + '/sendMailAlta', (req, res) => {
    var id_solicitud='';
    setTimeout(() =>{
        db.sequelize.query("SELECT max(id) as id from solicitud",{ type: db.sequelize.QueryTypes.SELECT })
        .then((result) =>{
            id_solicitud=result[0].id;
            console.log(result[0].id);
        })
    }, 500);
    setTimeout(() => {
        const ses = new AWS.SES({ apiVersion: "2010-12-01" });
        const params = {
            Destination: {
                ToAddresses: req.body.mailTo // Email address/addresses that you want to send your email
                // ToAddresses: [ 'hrojas@summit.com.pe' ]
            },
            //ConfigurationSetName: sjd,
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data:
                        "<html><p>Su solicitud fue creada – Solicitud # "+id_solicitud+"</p>"+
                        "Descripción del puesto: "+req.body.descripcionPuesto+"<br>"+
                        "Cantidad de recursos: "+req.body.cantidadRecursos+"<br>"+
                        "Modalidad: "+req.body.modalidad+"<br>"+
                        "Fecha estimada de inicio: "+req.body.fechaEstimadaInicio+"<br>"+
                        "Plazo de contratación: "+req.body.plazo+"<br>"+
                        "</html>"
                    },
                    /*Text: {
                        Charset: "UTF-8",
                        Data: "Hola Ransa, todos estamos en Modo C"
                    }*/
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Su solicitud fue creada – Solicitud #"+req.body.id_solicitud
                }
            },
            Source: "wpereyrac@ransa.net"
        };
    
        const sendEmail = ses.sendEmail(params).promise();
        sendEmail
            .then(data => {
                console.log("email enviado", data);
            })
            .catch(error => {
                console.log(error);
            });
        res.send(200).end();
    }, 1000);
});

api.post(api_name + '/sendMailSolicitarAprobacion', (req, res) => {    
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            ToAddresses: [req.body.mailTo] // Email address/addresses that you want to send your email
        },
        //ConfigurationSetName: sjd,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:
                    "<html><p>Por favor tu  VB para cubrir la siguiente posición:</p>"+
                    "Descripción del puesto: "+req.body.descripcionPuesto+"<br>"+
                    "Cantidad de recursos: "+req.body.cantidadRecursos+"<br>"+
                    "Modalidad: "+req.body.modalidad+"<br>"+
                    "Fecha estimada de inicio: "+req.body.fechaEstimadaInicio+"<br>"+
                    "Plazo de contratación: "+req.body.plazo+"<br>"+
                    "</html>"
                },
                /*Text: {
                    Charset: "UTF-8",
                    Data: "Hola Ransa, todos estamos en Modo C"
                }*/
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Solicito tu VB para proceder con la selección de personal – Solicitud #"+req.body.id_solicitud
            }
        },
        Source: "wpereyrac@ransa.net"
    };

    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
        .then(data => {
            console.log("email enviado", data);
        })
        .catch(error => {
            console.log(error);
        });
    res.send(200).end();
});

api.post(api_name + '/sendMailSolicitarAprobacionGestor', (req, res) => {    
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            ToAddresses: [req.body.mailTo] // Email address/addresses that you want to send your email
        },
        //ConfigurationSetName: sjd,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:
                    "<html><p>Estimado(a) solicitamos valides la viabilidad de la siguiente búsqueda</p>"+
                    "Es importante que para iniciarla verifiques:<br>"+
                    "•	DP, adjuntarla. De no existir la DP coordina con la Gerencia Corporativa de Organización, Compensaciones y Beneficios, para la creación y elaboración de la nueva DP.<br>"+
                    "•	Estructura remunerativa con el área solicitante y gestiona su aprobación.<br>"+
                    "•	Valida el resto de información, imput para el inicio del proceso.<br>"+
                    "</html>"
                },
                /*Text: {
                    Charset: "UTF-8",
                    Data: "Hola Ransa, todos estamos en Modo C"
                }*/
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Validación de requerimiento e información relevante para iniciar la selección de personal – Solicitud #"+req.body.id_solicitud
            }
        },
        Source: "wpereyrac@ransa.net"
    };

    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
        .then(data => {
            console.log("email enviado", data);
        })
        .catch(error => {
            console.log(error);
        });
    res.send(200).end();
});

api.post(api_name + '/sendMailInicioBusquedaNuevoPersonal', (req, res) => {    
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            ToAddresses: [req.body.mailTo] // Email address/addresses that you want to send your email
        },
        //ConfigurationSetName: sjd,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:
                    "<html><p>Equipo de Atracción por favor iniciemos la siguiente búsqueda.</p>"+
                    "</html>"
                },
                /*Text: {
                    Charset: "UTF-8",
                    Data: "Hola Ransa, todos estamos en Modo C"
                }*/
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Requerimiento de Personal – Solicitud #"+req.body.id_solicitud
            }
        },
        Source: "wpereyrac@ransa.net"
    };

    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
        .then(data => {
            console.log("email enviado", data);
        })
        .catch(error => {
            console.log(error);
        });
    res.send(200).end();
});

api.post(api_name + '/sendMailGenerarCodigoPosicion', (req, res) => {    
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            ToAddresses: [req.body.mailTo] // Email address/addresses that you want to send your email
        },
        //ConfigurationSetName: sjd,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:
                    "<html><p>Estimado(a)  colaborador(a),  agradeceremos nos envíes el código de posición para poder reportar el ingreso.</p>"+
                    "•	Denominación del puesto"+""+"<br/>"+
                    "•	División"+""+"<br/>"+
                    "•	Subdivisión"+""+"<br/>"+
                    "•	Jefe directo:"+""+"<br/>"+
                    "•	Uo"+""+"<br/>"+
                    "•	Ceco"+""+"<br/>"+
                    "•	Área de persona: "+""+"<br/>"+//Puesto estable, contratado, practicante
                    "</html>"
                },
                /*Text: {
                    Charset: "UTF-8",
                    Data: "Hola Ransa, todos estamos en Modo C"
                }*/
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Solicito código de posición -  Solicitud #"+req.body.id_solicitud
            }
        },
        Source: "wpereyrac@ransa.net"
    };

    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
        .then(data => {
            console.log("email enviado", data);
        })
        .catch(error => {
            console.log(error);
        });
    res.send(200).end();
});

api.post(api_name + '/sendMailGenerarCodigoPosicion', (req, res) => {    
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            ToAddresses: [req.body.mailTo] // Email address/addresses that you want to send your email
        },
        //ConfigurationSetName: sjd,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data:
                    "<html><p>Estimado(a)  colaborador(a),  agradeceremos nos envíes el código de posición para poder reportar el ingreso.</p>"+
                    "•	Denominación del puesto"+""+"<br/>"+
                    "•	División"+""+"<br/>"+
                    "•	Subdivisión"+""+"<br/>"+
                    "•	Jefe directo:"+""+"<br/>"+
                    "•	Uo"+""+"<br/>"+
                    "•	Ceco"+""+"<br/>"+
                    "•	Área de persona: "+""+"<br/>"+//Puesto estable, contratado, practicante
                    "</html>"
                },
                /*Text: {
                    Charset: "UTF-8",
                    Data: "Hola Ransa, todos estamos en Modo C"
                }*/
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Solicito código de posición -  Solicitud #"+req.body.id_solicitud
            }
        },
        Source: "wpereyrac@ransa.net"
    };

    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
        .then(data => {
            console.log("email enviado", data);
        })
        .catch(error => {
            console.log(error);
        });
    res.send(200).end();
});

module.exports = api