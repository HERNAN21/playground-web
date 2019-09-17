import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name,estado_proceso_de_bajas } from "variables/general.jsx";
import ReactBSAlert from "react-bootstrap-sweetalert";

class Seguimientosolicitudbajaadmin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            server:server,
            data_solicitud_list:[],
            estado_proceso_de_bajas:estado_proceso_de_bajas

        }


    }

    cargarData = _ => {
        let self = this;
        fetch(this.state.server + api_name + '/solicitud_baja')
            .then(response => response.json())
            .then(function (data) {
                self.setState({data_solicitud_list:data})
            });
    }

    dataFormChange=(e, data1)=>{
        const data=this.state.data_solicitud_list;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id==data1.id) {
                this.state.data_solicitud_list[i].estado_solicitud=e.target.value;
            }
        }
        this.forceUpdate();
    }

    actualizarEstado=(e,dataupdate)=>{
        let self=this;
        fetch(this.state.server + api_name+ '/updateestado',{
            method: 'PUT',
            body: JSON.stringify(dataupdate),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                self.customAlert(data.respuesta)
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))

        setTimeout(() => {
            this.cargarData();
        }, 100);
    }

    showDetalls=(e,data)=>{

    }



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
        console.log(this.state.data_solicitud_list);
        var data_baja_listar=this.state.data_solicitud_list;
        const data_estado_lis=this.state.estado_proceso_de_bajas;
        return (
            <>
            {this.state.alert}
             <SimpleHeader name="Seguimiento de Solicitud de Baja" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-150px", marginTop:"-5px"}}>Nro. Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text"/>
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.cargarData}/>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Creador de Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text"/>
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.cargarData} />
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
                                    <Table className="align-items-center table-flush" responsive size="sm">
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{textAlign:"center"}}>Nro. <br/> Solicitud</th>
                                                <th style={{textAlign:"center"}}>Código <br/> Tabajador</th>
                                                <th style={{textAlign:"center"}}>Estado</th>
                                                <th style={{textAlign:"center"}}>Fecha <br/> Creación</th>
                                                <th style={{textAlign:"center"}}>Descripción de Puesto</th>
                                                <th style={{textAlign:"center"}}>Jefe Directo</th>
                                                <th style={{textAlign:"center"}}>Fecha <br/> de Cese</th>
                                                <th style={{textAlign:"center"}}>Ubicación</th>
                                                <th style={{textAlign:"center"}}>Tiempo faltante <br/> para cierre</th>
                                                <th style={{textAlign:"center"}}>¿Actualizar Estado? </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data_baja_listar.map((listado,key)=>{
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td className="table-user">
                                                                    <a className="font-weight-bold" href="#" onClick={(e)=>this.showDetalls(e,listado)}>{listado.id}</a>
                                                                </td>
                                                                <td className="table-user">
                                                                    <b> {listado.id_trabajador}</b>
                                                                </td>
                                                                <td className="table-user">
                                                                    <Input type="select" name="estado_solicitud" className="form-control-sm" value={listado.estado_solicitud} onChange={(e)=>this.dataFormChange(e,listado)}>
                                                                        {
                                                                           data_estado_lis.map((listado_estado,i)=>{
                                                                                return (<>
                                                                                    <option value={listado_estado.id}>{listado_estado.value}</option>
                                                                                </>
                                                                               )
                                                                           }) 
                                                                        }
                                                                    </Input>
                                                                </td>
                                                                <td className="table-user">
                                                                    <b>{listado.fecha_registro}</b>
                                                                </td>
                                                                <td>
                                                                    {listado.observaciones}
                                                                </td>
                                                                <td className="table-user">
                                                                    <b>{listado.nombre_jefe}</b>
                                                                </td>
                                                                <td>
                                                                    {listado.fecha_cese}
                                                                </td>
                                                                <td style={{textAlign:"right"}}>
                                                                    Lugar
                                                                </td>
                                                                <td>
                                                                    02:00
                                                                </td>
                                                                <td style={{textAlign:"center"}}>
                                                                    <Button className="btn btn-sm" color="success" onClick={(e)=>this.actualizarEstado(e,listado)}>Actualizar</Button>
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
                            <Row>
                                <Col md="12" style={{marginTop:"40px", marginLeft:"50px" }}>
                                    <span> <b> Resumen de Respuesta</b></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{marginTop:"15px", marginLeft:"50px" }}>
                                    <span> <b> Solicitud 100</b></span>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md="4">
                                    <Table className="align-items-center table-flush" responsive size="sm">
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{width:"10%"}}>Área Encargada</th>
                                                <th style={{width:"90%"}}>Respuesta</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><b>Concesionario</b></td>
                                                <td style={{textAlign:"left"}}>asd</td>
                                            </tr>
                                            <tr>
                                                <td><b>Otro</b></td>
                                                <td>asd</td>
                                            </tr>
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td>100000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    {/* <CardFooter>
                    </CardFooter> */}
                </Card>
            </Container>
        </>
    );
  }
}

export default Seguimientosolicitudbajaadmin;