import React from "react";
import {
    Card, CardHeader, CardBody, Label, FormGroup, Form, Input, Container,
    Row, Col, InputGroup, InputGroupAddon, InputGroupText, Button,
    CardTitle, CardText
} from "reactstrap";
// core components
import Select from 'react-select'
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name, listEstrellas, listDisponible, today, listUnidadTiempo } from "variables/general.jsx";
import ReactBSAlert from "react-bootstrap-sweetalert";

var  format = require("date-format");

class Creacionsolicitudbaja extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            server: server,

            nombre_trabajador: '',
            descripcion_posicion: '',
            nombre_jefe: '',

            tipoBaja: [],
            tipoCeseFormal: [],
            tipoCeseReal: [],
            personales: [],

            dataSolicitudBaja: {
                id_trabajador: '',
                tipo_baja: '',
                tipo_cese_formal: '',
                tipo_cese_real: '',
                id_jefe: '',
                fecha_cese: '',
                fecha_hora_notificacion: '',
                fecha_carta: '',
                observaciones: ''
            }

        };

        fetch(this.state.server + api_name + '/service_grupo')
            .then(response => response.json())
            .then(function (data) {
                var tipoBaja = [];
                var tipoCeseFormal = [];
                var tipoCeseReal = [];
                for (let i = 0; i < data.length; i++) {
                    const datos = data[i];
                    if (datos.grupo == 'TIPO_BAJA') {
                        tipoBaja.push(datos);
                    } else if (datos.grupo == 'TIPO_CESE_FORMAL') {
                        tipoCeseFormal.push(datos);
                    } else if (datos.grupo == 'TIPO_CESE_REAL') {
                        tipoCeseReal.push(datos);
                    }
                }
                this.setState({ tipoBaja: tipoBaja });
                this.setState({ tipoCeseFormal: tipoCeseFormal });
                this.setState({ tipoCeseReal: tipoCeseReal });
            }.bind(this));

        /*fetch(this.state.server + api_name + '/aprobador/' + this.state.id_trabajador)
            .then(response => response.json())
            .then((personales) => this.setState({ personales }));*/

        // Insert data solicitud        
        /*this.inputchange = this.inputchange.bind(this);
        this.buscar_user_apro = this.buscar_user_apro.bind(this);        
        this.inputJefe=this.inputJefe.bind(this);
        this.buscar_user_jefe=this.buscar_user_jefe.bind(this);
        this.btnguardar=this.btnguardar.bind(this);  */
    }

    handleSelectForm = (e, label) => {
        const { dataSolicitudBaja } = this.state
        this.setState({ dataSolicitudBaja: { ...dataSolicitudBaja, [label]: e.value } });
    }

    handleForm = (e) => {
        const { dataSolicitudBaja } = this.state
        this.setState({ dataSolicitudBaja: { ...dataSolicitudBaja, [e.target.name]: e.target.value } });
    }

    buscar_user = (e, label) => {
        var that = this;
        var codigo;
        if (label === 'id_trabajador') {
            codigo = this.state.dataSolicitudBaja.id_trabajador;
        } else {
            codigo = this.state.dataSolicitudBaja.id_jefe;
        }
        fetch(this.state.server + api_name + '/personal/' + codigo)
            .then(response => response.json())
            .then(function (personales) {
                for (var i in personales) {
                    if (label === 'id_trabajador') {
                        that.setState({
                            nombre_trabajador: personales[i].nombres + ' ' + personales[i].apellido_paterno
                                + ' ' + personales[i].apellido_materno,
                            descripcion_posicion: personales[i].descripcion_posicion
                        });
                    } else {
                        that.setState({
                            nombre_jefe: personales[i].nombres + ' ' + personales[i].apellido_paterno
                                + ' ' + personales[i].apellido_materno
                        });
                    }

                }
            });
    }

    limpiar(){

    }

    guardar = _ =>{
        let self = this;
        const { dataSolicitudBaja } = this.state
        fetch(this.state.server + api_name + "/solicitudes_baja",
      {
        method: 'POST',
        body: JSON.stringify(dataSolicitudBaja),
        headers:
        {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) { return response.json(); })
      .then(function (e_return) {
        self.customAlert(e_return[0].text);
      });
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
        const { dataSolicitudBaja } = this.state
        return (
            <>
            {this.state.alert}

                <SimpleHeader name="Proceso de bajas" parentName="Forms" />
                <Container className="mt--6" fluid>
                    <Card className="mb-4">
                        <CardHeader>
                            <h3 className="mb-0">Creación de Solicitud de Baja</h3>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">DNI / Codigo Trabajador</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.handleForm} name="id_trabajador"
                                                value={dataSolicitudBaja.id_trabajador} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                    <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} onClick={e => this.buscar_user(e, 'id_trabajador')} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Nombres y Apellidos</Label>
                                    <Col md="3">
                                        <FormGroup>
                                            <Input className="form-control-sm" name="" id="example3cols1Input" placeholder="" type="text" disabled
                                                value={this.state.nombre_trabajador} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Descripcion de Puesto</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" name="" id="" type="text" disabled
                                                value={this.state.descripcion_posicion} />
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Tipo de Baja</Label>
                                    <Col md="3">
                                        <FormGroup>
                                            <Select
                                                bsSize="sm" className="form-control-sm"
                                                options={this.state.tipoBaja}
                                                isClearable
                                                placeholder=""
                                                onChange={e => this.handleSelectForm(e, 'tipo_baja')} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Código Jefe Directo</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.handleForm} name="id_jefe"
                                                value={dataSolicitudBaja.id_jefe} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                    <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} onClick={e => this.buscar_user(e, 'id_jefe')} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" style={{ width: "89%" }} disabled
                                                value={this.state.nombre_jefe} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Tipo de Cese Formal</Label>
                                    <Col md="2">
                                    <FormGroup>
                                        <Select
                                            bsSize="sm" className="form-control-sm"
                                            options={this.state.tipoCeseFormal}
                                            isClearable
                                            placeholder=""
                                            onChange={e => this.handleSelectForm(e, 'tipo_cese_formal')} />
                                            </FormGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Tipo de Cese Real</Label>
                                    <Col md="3">
                                    <FormGroup>
                                        <Select
                                            bsSize="sm" className="form-control-sm"
                                            options={this.state.tipoCeseReal}
                                            isClearable
                                            placeholder=""
                                            onChange={e => this.handleSelectForm(e, 'tipo_cese_real')} />
                                            </FormGroup>
                                    </Col>
                                </Row>



                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Fecha de Cese</Label>
                                    <Col md="2">
                                        <Input type="date" id="enddate" className="form-control-sm" onChange={this.handleForm} name="fecha_cese"
                                                value={dataSolicitudBaja.fecha_cese}/>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Fecha y Hora de <br /> Notificación</Label>
                                    <Col md="3">
                                        <Input type="date" id="notificationdate" bsSize="sm" className="form-control-sm" onChange={this.handleForm} 
                                        name="fecha_hora_notificacion" value={dataSolicitudBaja.fecha_hora_notificacion}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Fecha presentación de <br /> Carta</Label>
                                    <Col md="2">
                                        <Input type="date" id="datepresentation" className="form-control-sm" onChange={this.handleForm} 
                                        name="fecha_carta" value={dataSolicitudBaja.fecha_carta}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Observaciones</Label>
                                    <Col md="7">
                                        <FormGroup>
                                            <Input type="textarea" id="glosa" className="form-control-sm" rows="4" cols="50" style={{ width: "92%" }} 
                                            onChange={this.handleForm} 
                                            name="observaciones" value={dataSolicitudBaja.observaciones}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="7">
                                        <div style={{ width: "100%" }}>
                                            <div style={{ float: "right", marginRight: "-90px" }}>
                                                <Button color="warning" className="btn btn-sm" onClick={this.limpiar}>Limpiar</Button>
                                                <Button color="success" className="btn btn-sm" onClick={this.guardar}>Guardar</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}
export default Creacionsolicitudbaja;
