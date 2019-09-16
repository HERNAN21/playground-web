import React from "react";
import { Card, CardHeader,CardBody,Label, FormGroup, Table, CardFooter, Input, Container, Row, Col, InputGroup, InputGroupAddon,InputGroupText,Button,Progress  } from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name} from "variables/general.jsx";

var  format = require("date-format");

class Siguimientosolicitud extends React.Component {
    constructor(props){
        super(props);

        
        this.state={
            server:server,
            api_name:api_name,
            buscar_listado:{
                num_solicitud:'',
                creador_solicitud:'',
                data_listado_candidato_solicitud:[],
            },
            data_solicitud_list:[],
            data_seguimiento_solicitud:{
                solicitud_id:'',
                nombres:'',
                apellido_paterno:'',
                apellido_materno:'',
                area:'',
                fecha:'',
                hora:'',
                progress1:'0',
                progress_value1:'0',
                progress_color:'danger',
            },
            data_listado_cadidato_all:[],
            data_update_candidato:[],
            data_list_update:[],

            // Test
            test:'input test',
            
            

        }

        // this.cargarData=this.cargarData(this);
        this.cargarData=this.cargarData.bind(this);
        // Cargar candidatos all
        fetch(this.state.server + this.state.api_name +'/listado/candidatos')
        .then(response=>response.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                this.setState({data_listado_cadidato_all:data.result});
            }
        }.bind(this));

        // 
        this.dataContactoSede=this.dataContactoSede.bind(this);

        // this.cambiotest=this.cambiotest.bind(this)

    }

    // cambiotest=(e)=>{
    //     this.setState({test:e.target.value});
    //     console.log(e.target.value);
    // }

    




    cargarData=(e)=>{
        fetch(this.state.server + api_name+ '/listadosolicitudcandidatos',{
            method: 'POST',
            body: JSON.stringify(this.state.buscar_listado),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                this.setState({data_solicitud_list:data.result})
                // console.log(data.result);
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))
    }

    
    btnBuscar=(e)=>{
        this.cargarData();
    }

    dataBuscarNumero=(e)=>{
        this.state.buscar_listado.num_solicitud=e.target.value;
        this.cargarData();
        this.forceUpdate();
    }

    dataBuscarCreador=(e)=>{
        this.state.buscar_listado.creador_solicitud=e.target.value;
        this.cargarData();
        this.forceUpdate();
    }

    buscarCandidato=(data_solicitud)=>{
        console.log(data_solicitud);
        this.state.buscar_listado.data_listado_candidato_solicitud='';

        // Data progress

        if (data_solicitud.estado==1) {
            this.state.data_seguimiento_solicitud.progress1='25';
            this.state.data_seguimiento_solicitud.progress_value1='25%';
            this.state.data_seguimiento_solicitud.progress_color='danger';
        }else if(data_solicitud.estado==2){
            this.state.data_seguimiento_solicitud.progress1='50';
            this.state.data_seguimiento_solicitud.progress_value1='50%';
            this.state.data_seguimiento_solicitud.progress_color='warning';
        }else if(data_solicitud.estado==3){
            this.state.data_seguimiento_solicitud.progress1='100';
            this.state.data_seguimiento_solicitud.progress_value1='100% rechazado por el gerente';
            this.state.data_seguimiento_solicitud.progress_color='danger';
        }else if(data_solicitud.estado==5){
            this.state.data_seguimiento_solicitud.progress1='100';
            this.state.data_seguimiento_solicitud.progress_value1='100% rechazado por vicepresidencia';
            this.state.data_seguimiento_solicitud.progress_color='danger';
        }else if(data_solicitud.estado==6){
            this.state.data_seguimiento_solicitud.progress1='100';
            this.state.data_seguimiento_solicitud.progress_value1='100%';
            this.state.data_seguimiento_solicitud.progress_color='success';

        } else if(data_solicitud.estado==7){
            this.state.data_seguimiento_solicitud.progress1='100';
            this.state.data_seguimiento_solicitud.progress_value1='100% rechazado por el gestor';
            this.state.data_seguimiento_solicitud.progress_color='danger';
        }else if(data_solicitud.estado==0 && data_solicitud.estado_vicepresidencia==0){
            this.state.data_seguimiento_solicitud.progress1='50';
            this.state.data_seguimiento_solicitud.progress_value1='50%';
            this.state.data_seguimiento_solicitud.progress_color='warning';
            // falta añadir 2 condiciones estatus
        }else if(data_solicitud.estado==11){
            this.state.data_seguimiento_solicitud.progress1='100';
            this.state.data_seguimiento_solicitud.progress_value1='finalizado';
            this.state.data_seguimiento_solicitud.progress_color='success';
        }else{
            this.state.data_seguimiento_solicitud.progress1='0';
            this.state.data_seguimiento_solicitud.progress_value1='0';
            this.state.data_seguimiento_solicitud.progress_color='danger';
        }

        // Data Creador Solicitud
        this.state.data_seguimiento_solicitud.solicitud_id=data_solicitud.id;
        this.state.data_seguimiento_solicitud.nombres=data_solicitud.nombres;
        this.state.data_seguimiento_solicitud.apellido_paterno=data_solicitud.apellido_paterno;
        this.state.data_seguimiento_solicitud.apellido_materno=data_solicitud.apellido_materno;
        // this.state.data_seguimiento_solicitud.area=
        this.state.data_seguimiento_solicitud.fecha=format.asString('dd/MM/yyyy', new Date(data_solicitud.fecha_registro));
        this.state.data_seguimiento_solicitud.hora=format.asString('hh:mm:ss SSS', new Date(data_solicitud.fecha_registro));
        
        const data_candidato=this.state.data_listado_cadidato_all;
        var data_candidato_list=[];
        var data_add_update=[];
        for (let i = 0; i < data_candidato.length; i++) {
            const element = data_candidato[i];
            if (data_solicitud.id==element.id_solicitud) {
                data_candidato_list.push(element);
                var data_ele={'candidato_id':element.id,'estado':element.estado,'id_sede_entrevista':element.id_sede_entrevista,'contacto_sede':element.contacto_sede,'fecha_entrevista':element.fecha_entrevista,'prioridad':element.prioridad}
                data_add_update.push(data_ele);
            }
        }
        this.state.buscar_listado.data_listado_candidato_solicitud=data_candidato_list;
        this.state.data_list_update=data_add_update;
        this.forceUpdate();
        console.log(this.state.buscar_listado.data_listado_candidato_solicitud);
    }


    // Update data candidatos
    
    dataSedeEntrevista=(datas)=>{
        // console.log(datas);
        // data_update_candidato
        var data =this.state.data_list_update;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.candidato_id==datas.listado.id) {
                this.state.data_list_update[i].id_sede_entrevista=datas.value;
            }
        }
        this.forceUpdate();
        // console.log(this.state.data_list_update);
        
    }
    
    dataContactoSede=(datas)=>{
        var data =this.state.data_list_update;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.candidato_id==datas.listado.id) {
                this.state.data_list_update[i].contacto_sede=datas.value;
                // var test=this.state.data_list_update[i]=element.contacto_sede;
                // this.setState({test});
            }
        }
        this.forceUpdate();
        // console.log(this.state.data_list_update);
    }
    
    dataProgramarEntrevista=(datas)=>{
        var data =this.state.data_list_update;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.candidato_id==datas.listado.id) {
                this.state.data_list_update[i].fecha_entrevista=datas.value;
            }
        }
        this.forceUpdate();
        // 'fecha_entrevista':element.fecha_entrevista,
    }
    
    dataEstado=(datas)=>{
        var data =this.state.data_list_update;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.candidato_id==datas.listado.id) {
                this.state.data_list_update[i].estado=datas.value;
            }
        }
        this.forceUpdate();
    }
    
    dataPrioridad=(datas)=>{
        var data =this.state.data_list_update;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.candidato_id==datas.listado.id) {
                this.state.data_list_update[i].prioridad=datas.value;
            }
        }
        this.forceUpdate();
    }

    btnSaveUpdate=(e)=>{
        // console.log(this.state.data_list_update);
        fetch(this.state.server + api_name+'/updatecandidato',{
            method: 'PUT',
            body: JSON.stringify(this.state.data_list_update),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                console.log(data.respuesta);
            } else {
                console.log(data.respuesta);
            }
        })

    }


  render() {
        const data_solicitud=this.state.data_solicitud_list;
        // console.log(this.state.data_solicitud_list);
        const data_candidato_listar=this.state.buscar_listado.data_listado_candidato_solicitud;
        // console.log(data_candidato_listar);
        // console.log(this.state.buscar_listado.data_listado_candidato_solicitud);
    return (
      <>
        <SimpleHeader name="Seguimiento de Solicitud de Alta" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-150px", marginTop:"-5px"}}>Nro. Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.dataBuscarNumero} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                    <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.btnBuscar} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-110px", marginTop:"-5px"}}>Creador de Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.dataBuscarCreador} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                    <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.btnBuscar} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                        </CardHeader>
                        <br/>
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Table className="align-items-center table-flush" responsive size="sm" hover>
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{textAlign:"center",width:"2%"} }>Nro. <br/> Solicitud</th>
                                                <th style={{textAlign:"center",width:"3%"} }>Estado</th>
                                                <th style={{textAlign:"center",width:"3%"} }>Fecha <br/> De <br/> Creacion</th>
                                                <th style={{textAlign:"center",width:"5%"} }>Creador <br/> de <br/> Solicitud</th>
                                                <th style={{textAlign:"center",width:"5%"} }>Descripcion <br/> de <br/> Puesto</th>
                                                <th style={{textAlign:"center",width:"2%"} }>Cantidad <br/> de <br/> Recursos</th>
                                                <th style={{textAlign:"center",width:"2%"} }>Fecha <br/> Ingreso</th>
                                                <th style={{textAlign:"center",width:"4%"} }>Ubicación</th>
                                                <th style={{textAlign:"center",width:"5%"} }>Jefe <br/> Directo</th>
                                                <th style={{textAlign:"center",width:"5%"} }>Glosa</th>
                                                <th style={{textAlign:"center",width:"2%"} }>Remuneración</th>
                                                <th style={{textAlign:"center",width:"2%"} }>Requisitos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data_solicitud.map((listado,key)=>{
                                                    return (
                                                    <>
                                                        <tr onClick={()=>this.buscarCandidato(listado)}>
                                                            <td className="table-user">
                                                                <a className="font-weight-bold" href="#pablo" onClick={e => e.preventDefault()}>{listado.id}</a>
                                                            </td>
                                                            <td className="table-user">
                                                                <b>{listado.estado}</b>
                                                            </td>
                                                            <td className="table-user">
                                                                <b>{listado.fecha_registro}</b>
                                                            </td>
                                                            <td className="table-user">
                                                                <b>{listado.codigo_user+' - '+listado.nombres + ', ' + listado.apellido_paterno +' '+ listado.apellido_materno }</b>
                                                            </td>
                                                            <td className="table-user">
                                                                <b>{listado.puesto_des}</b>
                                                            </td>
                                                            <td>
                                                                <span className="text-muted">{listado.cantidad}</span>
                                                            </td>
                                                            <td className="table-user">
                                                                <b>{listado.inicio_estimado_tiempo}</b>
                                                            </td>
                                                            <td>
                                                                {listado.direccion}
                                                            </td>
                                                            <td>
                                                                {listado.codigo_jefe_dir +' - '+ listado.nombre_jefe+', '+ listado.apellido_paterno_jefe+' '+listado.apellido_materno_jefe}
                                                            </td>
                                                            <td>
                                                                {listado.glosa}
                                                            </td>
                                                            <td>
                                                                por ver
                                                            </td>
                                                            <td>
                                                                <Button className="btn btn-sm" color="warning" onClick={()=>alert('por ver'+listado.id)} >Ver Mas Detalles</Button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md="12">
                                    <b>Solicitud {this.state.data_seguimiento_solicitud.solicitud_id}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <b>Seguimiento de Aprobaciones</b>
                                </Col>
                            </Row>
                            <div style={{height:"10px"}}></div>
                            <Row>
                                <Col md="12">
                                    <div>
                                        <Progress color={this.state.data_seguimiento_solicitud.progress_color} value={this.state.data_seguimiento_solicitud.progress1} style={{height:"12px"}}>{this.state.data_seguimiento_solicitud.progress_value1}</Progress>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                    <p>
                                        <span><b>Solicitud Nro. </b> {this.state.data_seguimiento_solicitud.solicitud_id}</span><br/>
                                        <span><b>Nombres: </b> {this.state.data_seguimiento_solicitud.nombres+', '+this.state.data_seguimiento_solicitud.apellido_paterno +' '+this.state.data_seguimiento_solicitud.apellido_materno}</span><br/>
                                        <span><b>Estado: </b>{this.state.data_seguimiento_solicitud.estado}</span><br/>
                                        <span><b>Área: </b>{this.state.data_seguimiento_solicitud.area}</span><br/>
                                        <span><b>Fecha: </b>{this.state.data_seguimiento_solicitud.fecha}</span><br/>
                                        <span><b>Hora: </b>{this.state.data_seguimiento_solicitud.hora}</span><br/>
                                    </p>
                                </Col>
                                <Col md="3">
                                    <p>
                                        <span><b>Aprobacion de Gerente</b></span><br/>
                                        <span><b>Nombres: </b></span><br/>
                                        <span><b>Estado: </b></span><br/>
                                        <span><b>Área: </b></span><br/>
                                        <span><b>Fecha: </b></span><br/>
                                        <span><b>Hora: </b></span><br/>
                                    </p>
                                </Col>
                                <Col md="3">
                                    <p>
                                        <span><b>Aprobacion de Gestor</b></span><br/>
                                        <span><b>Nombres: </b></span><br/>
                                        <span><b>Estado: </b></span><br/>
                                        <span><b>Área: </b></span><br/>
                                        <span><b>Fecha: </b></span><br/>
                                        <span><b>Hora: </b></span><br/>
                                    </p>
                                </Col>
                                <Col md="3">
                                    <p>
                                        <span><b>Estado: </b> Buscando Candidatos</span><br/>
                                        <span><b>Área: </b></span><br/>
                                        <span><b>Fecha: </b></span><br/>
                                        <span><b>Hora: </b></span><br/>
                                    </p>
                                </Col>
                            </Row>
                            <div style={{height:"10px"}}></div>
                            <Row>
                                <Col md="12">
                                    <b>Seguimiento de Candidatos</b>
                                </Col>
                            </Row>
                            <div style={{height:"5px"}}></div>
                            <Row>
                                <Col md="12">
                                    <Table className="align-items-center table-flush" responsive size="lg" hover>
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{textAlign:"center"}} width="8.3%">Nombres <br/> Y <br/> Apellidos</th>
                                                <th style={{textAlign:"center"}} width="8.3%">CV</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Disponibilidad <br/> De <br/> Creacion</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Correo <br/>Electrónico</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Tipo <br/> Documento</th>
                                                <th style={{textAlign:"center"}} width="5%" >Nro. <br/> Documento</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Sede de Entrevista</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Contacto  por Sede</th>
                                                <th style={{textAlign:"center"}} width="15%" >Programar Entrevista</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Estado</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Prioridad</th>
                                                <th style={{textAlign:"center"}} width="8.3%">Observaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data_candidato_listar.map((listado,key)=>{
                                                    return(
                                                        <>
                                                            <tr>
                                                                <td style={{padding:"10px"}} className="table-user">
                                                                    {listado.nombres+', '+listado.apellido_paterno+' '+listado.apellido_materno}
                                                                </td>
                                                                <td style={{padding:"10px"}} className="table-user">
                                                                    <a className="font-weight-bold" href="" onClick={e => e.preventDefault()}>{listado.file_cv}</a>
                                                                </td>
                                                                <td style={{padding:"10px"}} className="table-user">
                                                                    <b>por ver</b>
                                                                </td>
                                                                <td style={{padding:"10px"}} className="table-user">
                                                                    <b>{listado.email}</b>
                                                                </td>
                                                                <td style={{padding:"10px"}} className="table-user">
                                                                    <b>{listado.tipo_documento}</b>
                                                                </td>
                                                                <td style={{padding:"10px",textAlign:"center" }}>
                                                                    <span className="text-muted">{listado.numero_documento}</span>
                                                                </td>
                                                                <td style={{padding:"10px"}} className="table-user">
                                                                    <Input type="select" className="form-control-sm" onChange={(e)=>this.dataSedeEntrevista({value: e.target.value, 'listado':listado})}>
                                                                        <option value="">[Select]</option>
                                                                        <option value="1">Sede 1</option>
                                                                        <option value="2">Sede 2</option>
                                                                    </Input>
                                                                </td>
                                                                <td style={{padding:"10px"}}>
                                                                    <InputGroup>
                                                                        <Input className="form-control-sm" placeholder="" type="text" value={listado.contacto_sede} onChange={(e)=>this.dataContactoSede({value: e.target.value, 'listado':listado})} />
                                                                        <InputGroupAddon addonType="append">
                                                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}}/>
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                </td>
                                                                <td style={{textAlign:"center",padding:"10px"}}>
                                                                    <InputGroup>
                                                                        <Input className="form-control-sm" placeholder="" type="date" onChange={(e)=>this.dataProgramarEntrevista({value: e.target.value, 'listado':listado})} />
                                                                        <InputGroupAddon addonType="append">
                                                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                                                <Button className="btn btn-sm" color="warning" title="Programar"><i class="fa fa-calendar" aria-hidden="true"></i></Button>
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                </td>
                                                                <td>
                                                                    <select type="select" className="form-control-sm form-control" style={{width:"120px"}} onChange={(e)=>this.dataEstado({value: e.target.value, 'listado':listado})}>
                                                                        <option value="">[Select]</option>
                                                                        <option value="0">Activo</option>
                                                                        <option value="1">Inactivo</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <select type="select" className="form-control-sm form-control" style={{width:"120px"}} onChange={(e)=>this.dataPrioridad({value: e.target.value, 'listado':listado})}>
                                                                        <option value="">[Select]</option>
                                                                        <option value="0">Prioridad 1</option>
                                                                        <option value="1">Prioridad 2</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    {listado.observaciones}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <br/>
                        </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="12">
                                <div style={{float:"right"}}>
                                    <Button color="success" className="btn btn-sm" onClick={this.btnSaveUpdate} >Guardar</Button>
                                    <Button color="info" className="btn btn-sm" >Terminar Proceso de Búsqueda</Button>
                                </div>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Container>
        </>
    );
  }
}
export default Siguimientosolicitud;
