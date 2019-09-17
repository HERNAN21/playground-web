import React from "react";


// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText,Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name,estado_proceso_de_altas} from "variables/general.jsx";


var  format = require("date-format");

class Registrodatosalta extends React.Component {
    constructor(props){
        super(props);

        this.state={
            server:server,
            api_name:api_name,
            buscar_listado:{
                num_solicitud:'',
                creador_solicitud:''
            },
            solicitud_data_all:[],
            solicitud_data_uno:[],
            data_solicitud_detall_all_candidato:[],
            data_solicitud_detall_candidatos:[],
            data_ver:{
                solicitud_id:'',
                puesto_des:'',
            },

            equipos_accesos:[],
            solicitud_detalle:[],
            modal: false,

            

        }

        fetch(this.state.server + this.state.api_name +'/listado/candidatos')
        .then(response=>response.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                this.setState({data_solicitud_detall_all_candidato:data.result});
            }
        }.bind(this));

        fetch(this.state.server + api_name + '/detallesolicitud')
        .then(response => response.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                this.setState({ equipos_accesos: data.result});
            }else{
                this.setState({equipos_accesos:''});
            }
        }.bind(this));

        
        this.showModalDetalle = this.showModalDetalle.bind(this);

    }

    cargarData=(e)=>{
        fetch(this.state.server + api_name+ '/listadosolicitudcandidatos',{
            method: 'POST',
            body: JSON.stringify(this.state.buscar_listado),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            console.log(data);
            if (data.respuesta=='success') {
                for (let i = 0; i < data.result.length; i++) {
                    data.result[i].estado_des1=false;
                    if (data.result[i].estado==1) {
                        data.result[i].estado_des=estado_proceso_de_altas[0].value;
                        data.result[i].estado=false;    
                    }else if(data.result[i].estado==2){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[1].value;
                    }else if(data.result[i].estado==3){
                        data.result[i].estado=false;
                        data.result[i].estado_des=estado_proceso_de_altas[2].value;
                        data.result[i].estado_des1=true;
                    }else if(data.result[i].estado==4){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[3].value;
                    }else if(data.result[i].estado==5){
                        data.result[i].estado=false;
                        data.result[i].estado_des=estado_proceso_de_altas[4].value;
                    }else if(data.result[i].estado==6){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[5].value;
                    }else if(data.result[i].estado==7){
                        data.result[i].estado=false;
                        data.result[i].estado_des=estado_proceso_de_altas[6].value;
                        data.result[i].estado_des1=true;
                    } else if(data.result[i].estado==11){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[10].value;
                    }
                }
                this.setState({solicitud_data_all:data.result})
            } else {
                
            }
        }.bind(this))
    }


    btnCargarData=(e)=>{
        this.cargarData();
    }

    dataBuscarNumero=(e)=>{
        this.state.buscar_listado.num_solicitud=e.target.value;
        this.forceUpdate();
        this.cargarData();
    }

    dataBuscarCreadorSolicitud=(e)=>{
        this.state.buscar_listado.creador_solicitud=e.target.value
        this.forceUpdate();
        this.cargarData();
    }

    dataDetallshow=(data)=>{
        // console.log(data);
        this.setState({solicitud_data_uno:data})
        // data_solicitud_detall_all
        var data_detall=this.state.data_solicitud_detall_all_candidato;
        var data_solicitud_detall_candidatos = [];
        this.state.data_ver.solicitud_id=data.id;
        this.state.data_ver.puesto_des=data.puesto_des;
        
        for (let i = 0; i < data_detall.length; i++) {
            const element = data_detall[i];
            if (data.id==element.id_solicitud) {
                data_solicitud_detall_candidatos.push(element);
            }
        }
        this.setState({data_solicitud_detall_candidatos:data_solicitud_detall_candidatos});
        // console.log(this.state.data_solicitud_detall_all_candidato);

    }


    updateFormCandidatos=(e,data)=>{
        console.log(e.target.name);
        // data_solicitud_detall_candidatos
        var data_alter_view=this.state.data_solicitud_detall_candidatos;
        for (let i = 0; i < data_alter_view.length; i++) {
            if (data.id==data_alter_view[i].id) {
                if (e.target.name=="cod_trabajo") {
                    this.state.data_solicitud_detall_candidatos[i].codigo_trabajo=e.target.value;
                }else if(e.target.name=="talla_1"){
                    this.state.data_solicitud_detall_candidatos[i].talla_1=e.target.value;
                }else if(e.target.name=="talla_2"){
                    this.state.data_solicitud_detall_candidatos[i].talla_2=e.target.value;
                }else if(e.target.name=="talla_3"){
                    this.state.data_solicitud_detall_candidatos[i].talla_3=e.target.value;
                }else if(e.target.name=="genero"){
                    this.state.data_solicitud_detall_candidatos[i].genero=e.target.value;
                }

            }
        }
        this.forceUpdate();
    }

    btnUpdateDatosCandidato=(e)=>{
        var update_data=this.state.data_solicitud_detall_candidatos;
        console.log(update_data);
        fetch(this.state.server + api_name+ '/updatecandidatodatos',{
            method: 'PUT',
            body: JSON.stringify(update_data),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                alert(data.respuesta)
                console.log(data.result);
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))
    }


    // SHOW MODAL DETALLS
    showModalDetalle=(e,data)=>{
        var datos_detalle=this.state.equipos_accesos;
        var data_push=[];
        if (data!=null) {
            for (let i = 0; i < datos_detalle.length; i++) {
                if (datos_detalle[i].id_solicitud==data.id) {
                    data_push.push(datos_detalle[i]);
                }    
            }
            this.setState({solicitud_detalle:data_push});
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));

    }

    render() {
        // console.log(this.state.solicitud_data_all)
        const data_list=this.state.solicitud_data_all;
        // console.log(this.state.data_solicitud_detall_candidatos);
        var listado_detalle=this.state.data_solicitud_detall_candidatos;
        var detalle_solicitud=this.state.solicitud_detalle;
        return (
            <>
             <SimpleHeader name="Registro de Datos de Alta" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-150px", marginTop:"-5px"}}>Nro. Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.dataBuscarNumero} />
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.btnCargarData} />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Creador de Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.dataBuscarCreadorSolicitud} />
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.btnCargarData} />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                        </CardHeader>
                        <br/>
                        <CardBody>
                            <Table className="align-items-center table-flush" responsive size="sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Nro. Solicitud</th>
                                        <th>Estado</th>
                                        <th>Fecha De Creacion</th>
                                        <th>Descripcion de Puesto</th>
                                        <th>Cantidad de Recursos</th>
                                        <th>Ficha de Ingreso</th>
                                        <th>Ubicación</th>
                                        <th>Equipos y Accesos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data_list.map((listado,key)=>{
                                            return (
                                                <>
                                                    <tr onClick={()=>this.dataDetallshow(listado)}>
                                                        <td className="table-user">
                                                            <a className="font-weight-bold" href="#pablo" onClick={this.ModalRemoneracion}>{listado.id}{this.props.buttonLabel}</a>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.estado_des}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{format.asString('dd/MM/yyyy', new Date(listado.fecha_registro))}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.puesto_des}</b>
                                                        </td>
                                                        <td>
                                                            {listado.cantidad}
                                                        </td>
                                                        <td className="table-user">
                                                            <b>file por ver</b>
                                                        </td>
                                                        <td>
                                                            {listado.direccion}
                                                        </td>
                                                        <td style={{textAlign:"right"}}>
                                                            <Button className="btn btn-sm" color="primary" onClick={(e)=>this.showModalDetalle(e,listado)}>
                                                                <span> Ver Detalle +</span> 
                                                                <i class="fa fa-info" aria-hidden="true"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="11">
                            </Col>
                            <Col md="1">
                                <InputGroup>
                                    <Button className="btn btn-sm" color="success">
                                        Confirmar
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="border-0" style={{marginTop:"-20px",marginBottom:"-30px" }}>
                        <Row>
                            <Label className="form-control-label" htmlFor="example-text-input" md="2"> <b>Solicitud {this.state.data_ver.solicitud_id}</b> </Label>
                        </Row>
                        <Row  style={{marginTop:"-15px"}}>
                            <Col md="10">
                                <Label className="form-control-label" htmlFor="example-text-input" md="2">Agregar Datos</Label>
                            </Col>
                            <Col md="2">
                                <Button color='primary' className="btn btn-sm" onClick={this.btnUpdateDatosCandidato}>Actualizar Datos</Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                            <Table className="align-items-center table-flush" responsive size="sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Descripcion de Puesto</th>
                                        <th>Cód. Trabajador</th>
                                        <th>Genero</th>
                                        <th style={{textAlign:"center"}}>Talla <br/>Camisa/Chompa/Casaca</th>
                                        <th>Tallas Pantalón</th>
                                        <th>Talla Calzado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listado_detalle.map((listado_detalle,key)=>{
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="table-user">
                                                            {listado_detalle.numero_documento}
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado_detalle.nombres}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado_detalle.apellido_paterno+' '+listado_detalle.apellido_materno}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{this.state.data_ver.puesto_des}</b>
                                                        </td>
                                                        <td>
                                                            <Input name="cod_trabajo"  type="text" className="form-control-sm" value={listado_detalle.codigo_trabajo} onChange={(e)=>{this.updateFormCandidatos(e,listado_detalle)}}/>
                                                        </td>
                                                        <td className="table-user">
                                                            <Input name="genero" className="form-control-sm" type="select" value={listado_detalle.genero} onChange={(e)=>{this.updateFormCandidatos(e,listado_detalle)}}>
                                                                <option value="">[Seleccione]</option>
                                                                <option value="1">Hombre</option>
                                                                <option value="2">Mujer</option>
                                                            </Input>
                                                        </td>
                                                        <td>
                                                            <Input name="talla_1" className="form-control-sm" type="select" value={listado_detalle.talla_1} onChange={(e)=>{this.updateFormCandidatos(e,listado_detalle)}}>
                                                                <option value="">[Seleccione]</option>
                                                                <option value="1">Talla 1</option>
                                                                <option value="2">Talla 2</option>
                                                                <option value="3">Talla 3</option>
                                                                <option value="4">Talla 4</option>
                                                            </Input>
                                                        </td>
                                                        <td>
                                                        <Input name="talla_2" className="form-control-sm" type="select" value={listado_detalle.talla_2} onChange={(e)=>{this.updateFormCandidatos(e,listado_detalle)}}>
                                                                <option value="">[Seleccione]</option>
                                                                <option value="1">Talla 1</option>
                                                                <option value="2">Talla 2</option>
                                                                <option value="3">Talla 3</option>
                                                                <option value="4">Talla 4</option>
                                                            </Input>
                                                        </td>
                                                        <td style={{textAlign:"right"}}>
                                                        <Input name='talla_3' className="form-control-sm" type="select" value={listado_detalle.talla_3} onChange={(e)=>{this.updateFormCandidatos(e,listado_detalle)}}>
                                                                <option value="">[Seleccione]</option>
                                                                <option value="1">Talla 1</option>
                                                                <option value="2">Talla 2</option>
                                                                <option value="3">Talla 3</option>
                                                                <option value="4">Talla 4</option>
                                                            </Input>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                                {/* <Row>
                                    <Col md="11">
                                    </Col>
                                    <Col md="1" style={{float:"right" }}>
                                        <Button color='primary' className="btn btn-sm">Guardar</Button>
                                    </Col>
                                </Row> */}
                        </CardFooter>
                </Card>

            </Container>
            {/* MODAL DETALLS */}
            <Modal isOpen={this.state.modal} showModalDetalle={this.showModalDetalle} className={this.props.className} style={{marginTop:"150px"}} size="md">
                <ModalBody>
                    <Card>
                        {/* <CardHeader style={{textAlign:"center"}}><b>Registrar</b></CardHeader> */}
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th style={{textAlign:"center"}}> <b>EQUIPOS Y ACCESOS </b></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detalle_solicitud.map((listado,key)=>{
                                                    return (<>
                                                        <tr>
                                                            <td>{(key+1)}</td>
                                                            <td>{listado.grupo}</td>
                                                            <td>{listado.descripcion}</td>
                                                        </tr>
                                                    </>);
                                                })
                                            }
                                            
                                        </tbody>
                                        <tfoot>

                                        </tfoot>
                                    </Table>
                                </Col>
                               
                            </Row>
                            <br/>
                            <Row>
                                <Col md="12">
                                    <div style={{float:"right", marginTop:"12px"}}>
                                        {/* cerrar modal por verse this.ModalNuevo */}
                                        <Button color="danger" className="btn btn-sm" onClick={(e)=>this.showModalDetalle(e,null)}>Cerrar</Button>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </ModalBody>
                
            </Modal>
            
        </>
    );
  }
}

export default Registrodatosalta;