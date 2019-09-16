import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText,
    Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

import { server, api_name} from "variables/general.jsx";
var  format = require("date-format");

class Validarenvioalta extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            server:server,
            api_name:api_name,
            remuneracion_negociado_update:{
                tipo_moneda_neg:'',
                remuneracion_basico_neg:'',
                vales_neg:'',
                fecha_inicio_neg:'',
                id:'',
                solicitud_id:''
            },
            buscar_listado:{
                num_solicitud:'',
                creador_solicitud:''
            },
            solicitud_data_all:[],
            remuneracion_data_all:[],
            remuneracion_data_modal:[],
        };

        this.ModalValidacion = this.ModalValidacion.bind(this);

        fetch(this.state.server + this.state.api_name +'/list/remuneracion')
        .then(response=>response.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                this.setState({remuneracion_data_all:data.result});
            }
        }.bind(this));


    }


    // Listado solicitud
    cargarData=(e)=>{
        fetch(this.state.server + api_name+ '/listadosolicitudcandidatos',{
            method: 'POST',
            body: JSON.stringify(this.state.buscar_listado),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
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



    // /validarremuneracion



    ModalValidacion(data_soli) {
        const id =data_soli.id;
        const data_remuneracion=this.state.remuneracion_data_all;
        const data_push_remuneracion=[];
        for (let i = 0; i < data_remuneracion.length; i++) {
            const element = data_remuneracion[i];
            if (element.solicitud_id==id) {
                data_push_remuneracion.push(element);
                this.state.remuneracion_negociado_update.id=element.id;
                this.state.remuneracion_negociado_update.solicitud_id=id;
                this.forceUpdate();
            }
        }
        this.setState({remuneracion_data_modal:data_push_remuneracion});
        
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

    }

    // update data
    dataTipoMonedaReg=(e)=>{
        this.state.remuneracion_negociado_update.tipo_moneda_neg=e.target.value;
        this.forceUpdate();
    }

    dataRemuneracionBasicReg=(e)=>{
        this.state.remuneracion_negociado_update.remuneracion_basico_neg=e.target.value;
        this.forceUpdate();
    }

    dataValesReg=(e)=>{
        this.state.remuneracion_negociado_update.vales_neg=e.target.value;
        this.forceUpdate();
    }

    dataFechaInicioReg=(e)=>{
        this.state.remuneracion_negociado_update.fecha_inicio_neg=e.target.value;
        this.forceUpdate();
    }

    btnSaveUpdateRemuneracion=(e)=>{
        fetch(this.state.server + api_name+'/updateremuneracionnegociable',{
            method: 'PUT',
            body: JSON.stringify(this.state.remuneracion_negociado_update),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                
            } else {
                
            }
        })
    }

    btndescargar=(e)=>{
        console.log('btn download file');
    }




    render() {
        const data_solicitud_listar=this.state.solicitud_data_all;
        const data_remuneracion_listar=this.state.remuneracion_data_modal;
        return (
            <>
             <SimpleHeader name="Validación y Envió de Alta" parentName="Tables" />
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
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.btnCargarData} />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Creador de Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.dataBuscarCreadorSolicitud} />
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
                                        <th>Creador de Solicitud</th>
                                        <th>Descripcion de Puesto</th>
                                        <th>Cantidad de Recursos</th>
                                        <th>Datos de Ingreso</th>
                                        <th>Ficha de Ingreso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data_solicitud_listar.map((listado,key)=>{
                                            return(
                                                <>
                                                    <tr>
                                                        <td className="table-user">
                                                            <a className="font-weight-bold" href="#pablo" onClick={this.ModalRemoneracion}>{listado.id}{this.props.buttonLabel}</a>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.estado}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{format.asString('dd/MM/yyyy', new Date(listado.fecha_registro))}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.codigo_user+' - ' +listado.nombres+', '+listado.apellido_paterno+' '+listado.apellido_materno}</b>
                                                        </td>
                                                        <td>
                                                            <b>{listado.puesto_des}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.cantidad}</b>
                                                        </td>
                                                        <td>
                                                            <Button className="btn btn-sm" color="warning" onClick={()=>this.ModalValidacion(listado)}>Validar</Button>
                                                        </td>
                                                        <td>
                                                            <Button className="btn btn-sm" color="primary">
                                                                <i class="fa fa-download" aria-hidden="true" onClick={this.btndescargar}>  Descargar</i>
                                                            </Button>
                                                        </td>
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
                                    <Button className="btn btn-sm" color="success">
                                        Enviar a Excellia
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Container>
            {/* Modal Nuevo Registro */}
             {/* Modal Centro de Costos */}
            <Modal size="lg" isOpen={this.state.modal} ModalValidacion={this.ModalValidacion} className={this.props.className} style={{marginTop:"150px" }}>
                {/* <ModalHeader ModalCentroCosto={this.ModalCentroCosto}>Centro de Costos</ModalHeader> */}
                <ModalBody>
                    <Card>
                        {/* <CardHeader style={{textAlign:"center"}}><b>Registrar</b></CardHeader> */}
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Propuesto</th>
                                                <th>Negociado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Row>
                                                        <Col md="12">
                                                            <p>
                                                                <span>
                                                                    Remuneración
                                                                </span>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        {
                                                            data_remuneracion_listar.map((listado,key)=>{
                                                                return (
                                                                    <>
                                                                        <Col md="12">
                                                                            <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginTop:"-5px"}}>Moneda: {listado.tipo_moneda}</Label>
                                                                        </Col><br/>
                                                                        <Col md="12">
                                                                            <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginTop:"-5px"}}>Básico: {listado.remuneracion_basico}</Label>
                                                                        </Col>
                                                                        <Col md="12">
                                                                            <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginTop:"-5px"}}>Vales: {listado.vales} </Label>
                                                                        </Col>
                                                                    </>
                                                                );
                                                            })
                                                        }
                                                        
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row>
                                                        <Col md="12">
                                                            <p>
                                                                <span>Remuneración</span>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"25px", marginTop:"-5px"}}>Moneda:</Label>
                                                        <Col md="9">
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="select" onChange={this.dataTipoMonedaReg}>
                                                                    <option value="">[seleccione]</option>
                                                                    <option value="1">Soles</option>
                                                                    <option value="2">Dolar</option>
                                                                </Input>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"25px", marginTop:"-5px"}}>Básico:</Label>
                                                        <Col md="9">
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="text" name="basico" id="basico" onKeyUp={this.dataRemuneracionBasicReg}/>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"25px", marginTop:"-5px"}}>Vales:</Label>
                                                        <Col md="9">
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="text" name="vales" id="vales" onKeyUp={this.dataValesReg} />
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {/* Date */}
                                                    <Row>
                                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"25px", marginTop:"-5px"}}>Fecha Inicio:</Label>
                                                    </Row>
                                                    {/* End Date */}
                                                </td>
                                                <td>
                                                    <Row>
                                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"28px", marginTop:"-5px"}}>Fecha Inicio:</Label>
                                                        <Col md="9">
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="date" name="startdate" id="startdate" onChange={this.dataFechaInicioReg}/>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Row>
                                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginTop:"-5px"}}>Ficha de Ingreso:</Label>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row>
                                                        <Col md="9">
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="file" name="startdate" id="startdate" />
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
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
                                        <Button color="success" className="btn btn-sm" onClick={this.btnSaveUpdateRemuneracion}>Guardar</Button>
                                        <Button color="danger" className="btn btn-sm" onClick={this.ModalValidacion}>Cerrar</Button>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="success" className="btn btn-sm" onClick={this.ModalRemoneracion}>Guardar</Button>
                    <Button color="danger" className="btn btn-sm" onClick={this.ModalRemoneracion}>Cerrar</Button>
                </ModalFooter> */}
            </Modal>

        </>
    );
  }
}

export default Validarenvioalta;