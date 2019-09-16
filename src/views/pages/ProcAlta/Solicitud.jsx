import React from "react";
import { Card, CardHeader, CardBody, Label, FormGroup, Input, Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name } from "variables/general.jsx";
import 'react-block-ui/style.css';
import ReactBSAlert from "react-bootstrap-sweetalert";

class Solicitud extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: server,
            puesto: [],
            modalidad: [],
            equipo: [],
            accesos: [],
            plazo: [],
            descripcion_modalidad: '',
            user_aprobador_jefe: [],
            codigo_aprobador: '',
            codigo_jefe: '',
            nombres_aprobador: '',
            nombres_jefe: '',
            script_modalidad: "",

            datasolicitud: {
                id_aprobador: '',
                id_jefe_directo: '',
                id_puesto: '',
                cantidad: '',
                id_modalidad: '',
                fecha_estimada_inicio: '',
                id_plazo: '',
                detalle_solicitud: [],
                nombre_cliente: '',
                descripcion_servicio: "",
                volumen_motivo: "",
                inicio_estimado_tiempo: '',
                estimacion_duracion_tiempo: '',
                observaciones: '',
                descripcion: '',
                usuario_registro: '',
                estado: 1,
            }
        };

        fetch(this.state.server + api_name + '/general')
            .then(response => response.json())
            .then(function (data) {
                var puesto = [];
                var modalidad = [];
                var equipos = [];
                var accesos = [];
                var plazo = [];
                for (let i = 0; i < data.length; i++) {
                    const datos = data[i];
                    if (datos.grupo == 'PUESTO') {
                        puesto.push(datos);
                    } else if (datos.grupo == 'MODALIDAD') {
                        modalidad.push(datos);
                    } else if (datos.grupo == 'EQUIPO') {
                        equipos.push(datos);
                    } else if (datos.grupo == 'ACCESOS') {
                        accesos.push(datos);
                    } else if (datos.grupo == 'PLAZO') {
                        plazo.push(datos);
                    }
                }
                this.setState({ puesto: puesto });
                this.setState({ modalidad: modalidad });
                this.setState({ equipo: equipos });
                this.setState({ accesos: accesos });
                this.setState({ plazo: plazo });
            }.bind(this));
    }

    handleForm = (e) => {
        const { datasolicitud } = this.state
        this.setState({ datasolicitud: { ...datasolicitud, [e.target.name]: e.target.value } });
    }

    handleSelectForm = (e, label) => {
        const { datasolicitud } = this.state
        this.setState({ datasolicitud: { ...datasolicitud, [label]: e.target.value } });
    }

    buscar_user = (label) => {
        const { datasolicitud } = this.state
        var that = this;
        var codigo;
        if (label === 'id_aprobador') {
            codigo = datasolicitud.id_aprobador;
        } else {
            codigo = datasolicitud.id_jefe_directo;
        }
        fetch(this.state.server + api_name + '/personal/' + codigo)
            .then(response => response.json())
            .then(function (personales) {
                for (var i in personales) {
                    if (label === 'id_aprobador') {
                        that.setState({
                            nombres_aprobador: personales[i].nombres + ' ' + personales[i].apellido_paterno
                                + ' ' + personales[i].apellido_materno
                        });
                    } else {
                        that.setState({
                            nombres_jefe: personales[i].nombres + ' ' + personales[i].apellido_paterno
                                + ' ' + personales[i].apellido_materno
                        });
                    }

                }
            });
    }

    modalidad1 = _ =>{
        const components = (<>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2">Nombre Cliente</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" name="nombre_cliente" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Descripción de Servicio</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" name="descripcion_servicio" type="text" onKeyUp={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Inicio estimado del contrato</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" name="inicio_estimado_tiempo" type="date" onChange={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Duracion estimado del tiempo</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" name="estimacion_duracion_tiempo" type="text" onKeyUp={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>);
        this.setState({ script_modalidad: components })
    }

    modalidad2 = _ =>{
        const components = (<>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Nombre Cliente</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2">Ventas Actuales (Volumen)</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Ventas estimadas (volumen)</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginRight: "0px", marginTop: "-5px" }}>Fecha estimada del incremento de volumen</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" name="inicio_estimado_tiempo" placeholder="" type="date" onChange={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Duración estimada del pico de volumen</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>);
        this.setState({ script_modalidad: components })
    }

    modalidad3 = _ =>{
        const components = (<>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Nombre de la persona a reemplazar</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginRight: "0px", marginTop: "-5px" }}>Motivo de la Suplencia</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Fecha de Inicio de la suplencia</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="date" onChange={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginRight: "0px", marginTop: "-5px" }}>Duración estimada de la suplencia</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" name="inicio_estimado_tiempo" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>);
        this.setState({ script_modalidad: components })
    }

    modalidad4 = _ =>{
        const components = (<>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Nombre del cliente o clientes</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginRight: "0px", marginTop: "-5px" }}>Descripción de servicios que se incrementarán</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Motivo del incremento</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginRight: "0px", marginTop: "-5px" }}>Fecha estimada de inicio de campaña</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" name="inicio_estimado_tiempo" placeholder="" type="date" onChange={this.handleForm} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Duración estimada de la campaña</Label>
                        <Col md="3">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" onChange={this.handleForm} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>);
        this.setState({ script_modalidad: components })
    }

    modalidad5 = _ =>{
        const components = (<>
            <Row>
                <Col md="12">
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" >Observaciones</Label>
                        <Col md="8">
                            <InputGroup>
                                <Input className="form-control-sm" name="observaciones" type="text" onKeyUp={this.handleForm} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>);
        this.setState({ script_modalidad: components })
    }

    modalidades = (e) => {
        this.state.datasolicitud.id_modalidad = e.target.value;
        this.state.datasolicitud.nombre_cliente = '';
        this.state.datasolicitud.descripcion_servicio = '';
        this.state.datasolicitud.volumen_motivo = '';
        this.state.datasolicitud.inicio_estimado_tiempo = '';
        this.state.datasolicitud.estimacion_duracion_tiempo = '';
        this.state.datasolicitud.observaciones = '';
        this.forceUpdate();

        if (e.target.value == 1) {
            return this.modalidad1();            
        } if (e.target.value == 2) {
            return this.modalidad2();
        } else if (e.target.value == 3) {
            return this.modalidad3();
        } if (e.target.value == 4) {
            return this.modalidad4();
        } else if (e.target.value == 5) {
            return this.modalidad5();
        }
    }

    // Equipo y acceso
    dataEquipo = (e) => {
        const { datasolicitud } = this.state
        var data = this.state.equipo;
        if (e.target.checked == true) {
            for (let i = 0; i < data.length; i++) {
                
                const element = data[i];                
                if (element.codigo == e.target.value ) {
                    var d = { id_grupo: e.target.value, id_grupo_tipo: 'EQUIPO' };
                    datasolicitud.detalle_solicitud.push(d);
                }
            }
        } else {
            const datos_detall = datasolicitud.detalle_solicitud;
            for (let i = 0; i < datos_detall.length; i++) {
                if (datos_detall[i].id_grupo_tipo === 'EQUIPO' && datos_detall[i].id_grupo === e.target.value) {
                    datos_detall.splice(datos_detall.indexOf(datos_detall[i]), 1);
                }
            }
        }
        //this.setState({ datasolicitud: { ...datasolicitud, detalle_solicitud: e.target.value } });
        //alert(datasolicitud.detalle_solicitud.length);
    }

    dataAccesos = (e) => {
        const { datasolicitud } = this.state
        var data = this.state.accesos;
        if (e.target.checked == true) {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.codigo == e.target.value) {
                    var d = { id_grupo: e.target.value, id_grupo_tipo: element.grupo };
                    datasolicitud.detalle_solicitud.push(d);
                }
            }
        } else {
            const datos_detall = datasolicitud.detalle_solicitud;
            for (let i = 0; i < datos_detall.length; i++) {
                if (datos_detall[i].id_grupo === e.target.value) {
                    datos_detall.splice(datos_detall.indexOf(datos_detall[i]), 1);
                }
            }
        }
        //this.forceUpdate();
    }

    btnguardar = (event) => {
        let self = this;
        fetch(this.state.server + api_name + '/solicitudes', {
            method: 'POST',
            body: JSON.stringify(this.state.datasolicitud),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(function (data) {
                self.customAlert(data.respuesta)
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
        const misEquipos = this.state.equipo;
        const misAccesos = this.state.accesos;
        const misPlazos = this.state.plazo;

        return (
            <>
                {this.state.alert}

                <SimpleHeader name="Proceso de alta de personal" parentName="Forms" />
                <Container className="mt--6" fluid>
                    <Card className="mb-4">
                        <CardHeader>
                            <h3 className="mb-0">Creación de solicitud de alta</h3>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                {/* className="row" */}
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Codigo Aprobador</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" name="id_aprobador" type="text" onChange={this.handleForm} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" >
                                                    <Button className="fas fa-search btn btn-sm" onClick={e=>this.buscar_user('id_aprobador')} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Input className="form-control-sm" id="" placeholder="" type="text" disabled value={this.state.nombres_aprobador} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Código Jefe Directo</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" name="id_jefe_directo" type="text" onChange={this.handleForm} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" >
                                                    <Button className="fas fa-search btn btn-sm " onClick={e=>this.buscar_user('id_jefe_directo')} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Input className="form-control-sm" id="" placeholder="" type="text" disabled value={this.state.nombres_jefe} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span><b>Datos del Requerimiento</b></span>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Descripción del puesto</Label>
                                    <Col md="2">
                                        <Input type="select" name="id_puesto" id="exampleSelect" bsSize="sm" className="form-control-sm" onChange={this.handleForm} >
                                            <option value="">[seleccione]</option>
                                            {
                                                this.state.puesto.map((v, i) => {
                                                    return (<>
                                                        <option value={v.codigo}>{v.descripcion}</option>
                                                    </>);
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Cantidad de recursos</Label>
                                    <Col md="2">
                                        <Input type="number" name="cantidad" id="exampleSelect" className="form-control-sm" onKeyUp={this.handleForm} />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Modalidad</Label>
                                    <Col md="2">
                                        <Input type="select" name="id_modalidad"  bsSize="sm" className="form-control-sm" onChange={e=>this.modalidades(e)}>
                                            {
                                                this.state.modalidad.map((v, i) => {
                                                    return (<>
                                                        <option value={v.codigo}>{v.descripcion}</option>
                                                    </>);
                                                })
                                            }
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Input type="text" value={this.state.descripcion_modalidad} name="" className="form-control-sm" placeholder="Descripción de la modalidad" disabled />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Fecha Estimada de Incio</Label>
                                    <Col md="2">
                                        <Input type="date" name="fecha_estimada_inicio" id="exampleSelect" className="form-control-sm" onChange={this.handleForm} />
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{ marginRight: "29px", marginTop: "-5px" }}>Plazo</Label>
                                    <Col md="3">
                                        <Input type="select" name="id_plazo" id="exampleSelect" bsSize="sm" className="form-control-sm" style={{ width: "90%" }} onChange={e=>this.handleSelectForm(e,'id_plazo')}>
                                            <option value="">[seleccione]</option>
                                            {
                                                misPlazos.map((v, i) => {
                                                    return (<>
                                                        <option value={v.codigo}>{v.descripcion}</option>
                                                    </>);
                                                })
                                            }
                                        </Input>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Equipo</Label>
                                    <Col md="2">
                                        <Card body style={{ padding: "5px", margin: "5px" }}>
                                            {
                                                misEquipos.map((v, i) => {
                                                    return (<>
                                                        <FormGroup check style={{ width: "90%" }}>
                                                            <Label check>
                                                                <Input type="checkbox" value={v.codigo} id="" onClick={this.dataEquipo} />{' '}
                                                                {v.descripcion}
                                                            </Label>
                                                        </FormGroup>
                                                    </>);
                                                })
                                            }
                                        </Card>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{ marginRight: "10px", marginTop: "-5px" }}>Acceso</Label>
                                    <Col md="3">
                                        <Card body style={{ padding: "5px", margin: "5px" }}>
                                            {
                                                misAccesos.map((v, i) => {
                                                    return (<>
                                                        <FormGroup check style={{ width: "90%" }}>
                                                            <Label check>
                                                                <Input type="checkbox" value={v.codigo} id="" onClick={this.dataAccesos} />{' '}
                                                                {v.descripcion}
                                                            </Label>
                                                        </FormGroup>
                                                    </>);
                                                })
                                            }
                                        </Card>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md="7">
                                        <span><b>Motivos que sustentan la contratación</b></span>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md="8">
                                        <div style={{ borderStyle: "dashed", padding: "10px", width: "100%" }}>
                                            {
                                                this.state.script_modalidad
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md="7">
                                        <div style={{ width: "100%" }}>
                                            <div style={{ float: "right", marginRight: "-55px" }}>
                                                <Button color="warning" className="btn btn-sm">Limpiar</Button>
                                                <Button color="success" className="btn btn-sm" onClick={this.btnguardar}>Guardar</Button>
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
export default Solicitud;
