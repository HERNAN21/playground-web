import React from "react";

// reactstrap components
import { Badge, Button, Card, CardHeader, CardBody, CardFooter, Table, Container, Row, Col, FormGroup, Label, InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name, listEstrellas, listDisponible, today, listUnidadTiempo } from "variables/general.jsx";
import ReactBSAlert from "react-bootstrap-sweetalert";
class Seguimientosolicitudbaja extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            server: server,
            data_solicitud_list: [],
            // data_solicitud_deuda:[],
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

    guardar = _ => {
        let self=this;
        var update_data =this.state.data_solicitud_list;
        fetch(this.state.server + api_name+ '/solicituddeuda',{
            method: 'POST',
            body: JSON.stringify(update_data),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                self.customAlert(data.respuesta)
                console.log(data.result);
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))

        setTimeout(() => {
            this.cargarData();
        }, 100);

    }
    
    formInserDeuda=(e,data)=>{
        var update_data =this.state.data_solicitud_list;
        for (let i = 0; i < update_data.length; i++) {
            if (update_data[i].id==data.id) {
                this.state.data_solicitud_list[i].usuario_creacion='HROJAS';
                if (e.target.name=='estado') {
                    this.state.data_solicitud_list[i].estado=1;
                }else if(e.target.name=='monto'){
                    this.state.data_solicitud_list[i].monto=e.target.value;
                }else if(e.target.name=='tipo_moneda'){
                    this.state.data_solicitud_list[i].tipo_moneda=e.target.value;
                }else if(e.target.name=='id_tipo'){
                    this.state.data_solicitud_list[i].id_tipo=e.target.value;
                }
            }
        }
        this.forceUpdate();
    }

    // SHOW MESAGE ALERT
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
        const data_solicitud_list = this.state.data_solicitud_list;
        console.log(data_solicitud_list);
        return (
            <>
                {this.state.alert}
                <SimpleHeader name="Seguimiento de Solicitud de Baja" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{ marginBottom: "-50px" }}>
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="2">Nro. Solicitud</Label>
                                <Col md="2">
                                    <InputGroup>
                                        <Input className="form-control-sm" placeholder="" type="text" />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} onClick={e => this.cargarData(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Label className="form-control-label" htmlFor="example-text-input" md="2">Creador de Solicitud</Label>
                                <Col md="2">
                                    <InputGroup>
                                        <Input className="form-control-sm" placeholder="" type="text" />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </CardHeader>
                        <br />
                        <CardBody>
                            <Table className="align-items-center table-flush" responsive size="sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Nro. <br/> Solicitud</th>
                                        <th style={{ textAlign: "center" }}>Tipo</th>
                                        <th style={{ textAlign: "center" }}>Código <br/>   Tabajador</th>
                                        <th style={{ textAlign: "center" }}>Nombres</th>
                                        <th style={{ textAlign: "center" }}>Descripción de Puesto</th>
                                        <th style={{ textAlign: "center" }}>Fecha <br/> de Cese</th>
                                        <th style={{ textAlign: "center" }}>Ubicación</th>
                                        <th style={{ textAlign: "center" }}>Tiempo Faltante <br /> para cierre</th>
                                        <th style={{ textAlign: "center" }}>Deuda</th>
                                        <th style={{ textAlign: "center" }}>Moneda </th>
                                        <th style={{ textAlign: "center" }}>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data_solicitud_list.map((listado, key) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="table-user">
                                                            <a className="font-weight-bold" href="" onClick={this.ModalRemoneracion}> 
                                                            {listado.id}
                                                            {this.props.buttonLabel}</a>
                                                        </td>
                                                        <td>
                                                            <Input type="select" className="form-control-sm" name="id_tipo" value={listado.id_tipo} onChange={(e)=>this.formInserDeuda(e,listado)}>
                                                                <option value="">[Seleccione]</option>
                                                                <option value="1">tipo 1</option>
                                                                <option value="2">tipo 2</option>
                                                            </Input>
                                                        </td>
                                                        <td className="table-user">
                                                        {listado.id_trabajador}
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.nombre_trabajador}</b>
                                                        </td>
                                                        
                                                        <td>
                                                            Descripcion
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.fecha_cese}</b>
                                                        </td>
                                                        <td>
                                                            Miraflores
                                                        </td>
                                                        <td style={{ textAlign: "right" }}>
                                                            24:00
                                                        </td>
                                                        <td>
                                                            <label className="custom-toggle">
                                                                <input type="checkbox" name="estado"
                                                                checked={listado.monto ? 'checked' :''}
                                                                onChange={(e)=>this.formInserDeuda(e,listado)} value={listado.estado}/>
                                                                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <Input type="select" className="form-control-sm" name="tipo_moneda" value={listado.tipo_moneda} onChange={(e)=>this.formInserDeuda(e,listado)}>
                                                                <option value="">[Seleccione]</option>
                                                                <option value="1">S/.</option>
                                                                <option value="2">$</option>
                                                            </Input>
                                                        </td>
                                                        <td>
                                                            <Input type="text" className="form-control-sm" name="monto" onChange={(e)=>this.formInserDeuda(e,listado)} value={listado.monto}/>
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
                                        <Button className="btn btn-sm" color="success" onClick={this.guardar}>Guardar</Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Container>

            </>
        );
    }
}

export default Seguimientosolicitudbaja;