import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText,Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name,estado_proceso_de_altas} from "variables/general.jsx";
import 'react-block-ui/style.css';
import ReactBSAlert from "react-bootstrap-sweetalert";

var format = require('date-format');

class Seguimientonuevopersonal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            server:server,
            api_name:api_name,
            buscar_listado:{
                num_solicitud:'',
                creador_solicitud:''
            },
            solicitud_data_all:[],
            equipos_accesos:[],
            solicitud_detalle:[],
            modal: false,
        }

        this.cargarData=this.cargarData.bind(this);
        this.showModalDetalle = this.showModalDetalle.bind(this);


        fetch(this.state.server + api_name + '/general')
        .then(response => response.json())
        .then(function (data) {
            var equipos_accesos_push = [];
            for (let i = 0; i < data.length; i++) {
                const datos = data[i];
                if (datos.grupo == 'EQUIPO' || datos.grupo == 'ACCESOS') {
                    equipos_accesos_push.push(datos);
                }
            }
            this.setState({ equipos_accesos: equipos_accesos_push });
            
        }.bind(this));
    }

    cargarData=(e)=>{
        fetch(this.state.server + api_name+ '/listadosolicitudcandidatos',{
            method: 'POST',
            body: JSON.stringify(this.state.buscar_listado),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                var data_add=[];
                for (let i = 0; i < data.result.length; i++) {
                    if (data.result[i].estado>=8) {
                        data_add.push(data.result[i]);
                    }
                }
                this.setState({solicitud_data_all:data_add})

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

    // SHOW MODAL DETALLS
    showModalDetalle=(e,data)=>{
        // console.log(data);
        console.log(this.state.equipos_accesos);

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // console.log('show modal');
        // equipos_accesos
        // solicitud_detalle
    }

    dataEstadoChange=(e,data)=>{
        var data_alter_view=this.state.solicitud_data_all;
        for (let i = 0; i < data_alter_view.length; i++) {
            if (data.id==data_alter_view[i].id) {
                this.state.solicitud_data_all[i].estado=e.target.value;
            }
        }
        this.forceUpdate();
    }

    updateEstado=(e)=>{
        let self=this;
        fetch(this.state.server + api_name+'/updatestatusall',{
            method: 'PUT',
            body: JSON.stringify(this.state.solicitud_data_all),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                self.customAlert(data.respuesta)
                console.log(data.respuesta);
            } else {
                console.log(data.respuesta);
            }
        })

        setTimeout(() => {
            this.cargarData();
        }, 100);
    }


    // Data Mensaje

    customAlert = msg => {
        this.setState({
            alert: (
                <ReactBSAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Éxito"
                    onConfirm={() => this.hideCustomAlert()}
                    onCancel={() => this.hideCustomAlert()}
                    confirmBtnBsStyle="success"
                    confirmBtnText="Ok"
                    btnSize=""
                >
                    {msg}
                </ReactBSAlert>
            )
        });
    }

    hideCustomAlert = () => {
        this.setState({
            alert: null
        });
    };


   
    render() {
        // console.log(this.state.solicitud_data_all);
        var solicitud_data=this.state.solicitud_data_all;
        return (
            <>
            {/* {this.state.alert} */}
             <SimpleHeader name="Seguimiento de Nuevo Personal" parentName="Tables" />
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
                                        <th>Fecha Ingreso</th>
                                        <th>Ubicación</th>
                                        <th>Equipos y Accesos</th>
                                        <th>Archivo de Personal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        solicitud_data.map((listado,key)=>{
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="table-user">
                                                            <a className="font-weight-bold" href="#pablo" onClick={this.ModalRemoneracion}>{listado.id}{this.props.buttonLabel}</a>
                                                        </td>
                                                        <td className="table-user">
                                                            <Input type="select" name="estado" className="form-control-sm" value={listado.estado} onChange={(e)=>this.dataEstadoChange(e,listado)}>
                                                                <option value="8">Cargo Asignado</option>
                                                                <option value="11">Finalizado</option>
                                                            </Input>
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
                                                            <b>{listado.fecha_estimada_inicio}</b>
                                                        </td>
                                                        <td>
                                                            {listado.direccion}
                                                        </td>
                                                        <td style={{textAlign:"right"}}>
                                                            <Button className="btn btn-sm" color="primary" onClick={(e)=>this.showModalDetalle(e,listado)}>
                                                                <span> Ver Detalle </span> 
                                                                <i class="fa fa-info" aria-hidden="true"></i>
                                                            </Button>
                                                        </td>
                                                        <th>
                                                            <Button className="btn btn-sm" color="info">
                                                                <span> Documentos </span> 
                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                            </Button>
                                                        </th>
                                                    </tr>
                                                </>
                                            )
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
                                    <Button className="btn btn-sm" color="success" onClick={this.updateEstado}>
                                        Actualizar Estado
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Container>
            {/* MODAL DETALLS */}
            <Modal isOpen={this.state.modal} showModalDetalle={this.showModalDetalle} className={this.props.className} style={{marginTop:"150px"}} size="lg">
                <ModalBody>
                    <Card>
                        {/* <CardHeader style={{textAlign:"center"}}><b>Registrar</b></CardHeader> */}
                        <CardBody>
                            <Row>
                                <Col md="6">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:"center"}}>EQUIPOS</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {
                                                data_candidato_solicitud_list.map((listar,key)=>{
                                                    return (<>
                                                        <tr>
                                                            <td>Candidato {(key+1)}</td>
                                                            <td>{listar.numero_documento}</td>
                                                            <td>{listar.nombres+' - '+ listar.apellido_paterno+', '+listar.apellido_materno}</td>
                                                            <td>
                                                                <Input className="form-control-sm" type="text" onKeyUp={(e)=>this.dataCodigoPosicion({value:e.target.value,'listado':listar})} ></Input>
                                                            </td>
                                                            <td style={{textAlign:"center"}}><Input type="checkbox"></Input> </td>
                                                        </tr>
                                                    </>);
                                                })
                                            } */}
                                        </tbody>
                                        <tfoot>

                                        </tfoot>
                                    </Table>
                                </Col>
                                <Col md="6">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:"center"}}>ACCESOS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {
                                                data_candidato_solicitud_list.map((listar,key)=>{
                                                    return (<>
                                                        <tr>
                                                            <td>Candidato {(key+1)}</td>
                                                            <td>{listar.numero_documento}</td>
                                                            <td>{listar.nombres+' - '+ listar.apellido_paterno+', '+listar.apellido_materno}</td>
                                                            <td>
                                                                <Input className="form-control-sm" type="text" onKeyUp={(e)=>this.dataCodigoPosicion({value:e.target.value,'listado':listar})} ></Input>
                                                            </td>
                                                            <td style={{textAlign:"center"}}><Input type="checkbox"></Input> </td>
                                                        </tr>
                                                    </>);
                                                })
                                            } */}
                                        </tbody>
                                        <tfoot>

                                        </tfoot>
                                    </Table>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md="12">
                                    <div style={{float:"right"}}>
                                        {/* cerrar modal por verse this.ModalNuevo */}
                                        <Button color="success" className="btn btn-sm" onClick={this.showModalDetalle}>Asignar Cargo</Button>
                                        <Button color="danger" className="btn btn-sm" onClick={this.showModalDetalle}>Cerrar</Button>
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

export default Seguimientonuevopersonal;