import React from "react";
import { Card, CardHeader, CardBody, Label, FormGroup, Form, Input, Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Button, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name, listEstrellas, listDisponible, today, listUnidadTiempo } from "variables/general.jsx";
import ReactBSAlert from "react-bootstrap-sweetalert";

class Requerimiento extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data_solicitud: this.props.location.state,
            modal: false,
            data_solicitud_update: {
                solicitud_id: '',
                glosa: '',
                sociedad: '',
                lider_uo: '',
                codigo_uo: '',
                descripcion_uo: '',
                cod_divicion: '',
                cod_sub_div: '',
                sctr: '',
                id_area_personal: '',
                id_relacion_laboral: '',
                file_dp: '',
                direccion: ''
            }
        };
        this.ModalCentroCosto = this.ModalCentroCosto.bind(this);

        // const { data } = this.props.location.state;
        // console.log(data);

    }

    ModalCentroCosto() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Data Update Save

    dataGlosa = (e) => {
        this.state.data_solicitud_update.glosa = e.target.value;
        this.forceUpdate();
    }

    dataSociedad = (e) => {
        this.state.data_solicitud_update.sociedad = e.target.value;
        this.forceUpdate();
    }

    dataLideUo = (e) => {
        this.state.data_solicitud_update.lider_uo = e.target.value;
        this.forceUpdate();
    }

    dataCodigoUo = (e) => {
        this.state.data_solicitud_update.codigo_uo = e.target.value;
        this.forceUpdate();
    }

    dataDescripcionUo = (e) => {
        this.state.data_solicitud_update.descripcion_uo = e.target.value;
        this.forceUpdate();
    }

    dataDivicion = (e) => {
        this.state.data_solicitud_update.cod_divicion = e.target.value;
        this.forceUpdate();
    }

    dataCodSubDiv = (e) => {
        this.state.data_solicitud_update.cod_sub_div = e.target.value;
        this.forceUpdate();
    }
    dataSctr = (e) => {
        this.state.data_solicitud_update.sctr = e.target.value;
        this.forceUpdate();
    }
    dataIdAreaPersonal = (e) => {
        this.state.data_solicitud_update.id_area_personal = e.target.value;
        this.forceUpdate();
    }
    dataIdRelacionLaboral = (e) => {
        this.state.data_solicitud_update.id_relacion_laboral = e.target.value;
        this.forceUpdate();
    }
    dataFileDp = (e) => {
        this.state.data_solicitud_update.file_dp = e.target.value;
        this.forceUpdate();
    }
    dataDireccion = (e) => {
        this.state.data_solicitud_update.direccion = e.target.value;
        this.forceUpdate();
    }

    updateRequerimiento = (e) => {
        let self = this;
        fetch(server + api_name + '/updaterequerimiento', {
            method: 'PUT',
            body: JSON.stringify(this.state.data_solicitud_update),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(function (data) {
                if (data.respuesta == 'success') {                    
                    self.customAlert(data.respuesta);
                } else {
                    console.log(data.respuesta);
                }
            })
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
        var data_list = this.state.data_solicitud['data'];
        this.state.data_solicitud_update.solicitud_id = data_list.id;
        return (
            <>
            {this.state.alert}
                <SimpleHeader name="Datos de Requerimiento" parentName="Forms" />
                <Container className="mt--6" fluid>
                    <Card className="mb-4">
                        <CardHeader>
                            {/* <h3 className="mb-0">Creación de Solicitud de Alta</h3> */}
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                {/* className="row" */}
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Codigo Aprobador</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" disabled value={data_list.codigo_user} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" disabled value={data_list.nombres + ', ' + data_list.apellido_paterno + ' ' + data_list.apellido_materno} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Código Jefe Directo</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" disabled value={data_list.codigo_jefe_dir} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" disabled value={data_list.nombre_jefe + ',' + data_list.apellido_paterno_jefe + ' ' + data_list.apellido_materno_jefe} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Descripción de Puesto</Label>
                                    <Col md="2">
                                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled value={data_list.puesto_des} />
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Cantidad de recursos</Label>
                                    <Col md="1">
                                        <FormGroup>
                                            <Input type="text" name="select" id="exampleSelect" className="form-control-sm" style={{ width: "90%" }} disabled value={data_list.cantidad} />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Modalidad</Label>
                                    <Col md="6">
                                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled value={data_list.modalidad_des} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Especificación de la modalidad contractual </Label>
                                    <Col md="6">
                                        <FormGroup>
                                            <Input type="text" name="" id="" className="form-control-sm" disabled value={data_list.modalidad_detalle} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Fecha Estimada de Incio</Label>
                                    <Col md="2">
                                        <Input type="date" name="select" id="exampleSelect" className="form-control-sm" disabled value={data_list.fecha_estimada_inicio} />
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Plazo</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" disabled value={data_list.plazo_des} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Equipo</Label>
                                    <Col md="2">
                                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled />
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Accesos</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" disabled />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>

                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Tipo de Contratacion</Label>
                                    <Col md="5">
                                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled />
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" >Motivo / sustento</Label>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input type="text" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" disabled />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="9">
                                        <div style={{ borderStyle: "dashed", padding: "10px", width: "93.5%" }}>
                                            <Row>
                                                <Col md="12">
                                                    <Row>
                                                        <Col md="4">
                                                            <Label>Nombre Cliente</Label>
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="text" disabled />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>Ventas Actuales (Volumen)</Label>
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="text" disabled />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>Venta Estimada (Volumen)</Label>
                                                            <InputGroup>
                                                                <Input className="form-control-sm" placeholder="" type="text" disabled />
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                {/* Section Enabled */}
                                <Row>
                                    <Col md="8">
                                        <Row>
                                            <Label className="form-control-label" htmlFor="example-text-input" md="3" >Glosa</Label>
                                            <Col md="9">
                                                <FormGroup>
                                                    <Input type="textarea" name="text" id="exampleText" className="form-control-sm" rows="4" cols="50" onKeyUp={this.dataGlosa} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8">
                                        <Row>
                                            <Label className="form-control-label" htmlFor="example-text-input" md="3" >Sociedad</Label>
                                            <Col md="3">
                                                <FormGroup>
                                                    <Input type="text" name="text" id="exampleText" className="form-control-sm" onKeyUp={this.dataSociedad} />
                                                </FormGroup>
                                            </Col>
                                            <Label className="form-control-label" htmlFor="example-text-input" md="2" >Líder de UO</Label>
                                            <Col md="3">
                                                <FormGroup>
                                                    <Input type="select" name="text" id="exampleText" className="form-control-sm" onChange={this.dataLideUo}>
                                                        <option value="1">Dir 1</option>
                                                        <option value="2">Dir 2</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Label className="form-control-label" htmlFor="example-text-input" md="2" >Código UO</Label>
                                            <Col md="4">
                                                <FormGroup>
                                                    <Input type="text" name="text" id="exampleText" className="form-control-sm" onKeyUp={this.dataCodigoUo} />
                                                </FormGroup>
                                            </Col>
                                            <Label className="form-control-label" htmlFor="example-text-input" md="2" >Descripción</Label>
                                            <Col md="4">
                                                <FormGroup>
                                                    <Input type="text" name="text" id="exampleText" className="form-control-sm" disabled />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Cod. División</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="text" id="exampleText" className="form-control-sm" onKeyUp={this.dataDivicion} />
                                        </FormGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Cod. Sub División</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="text" id="exampleText" className="form-control-sm" onKeyUp={this.dataCodSubDiv} />
                                        </FormGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >SCTR</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="text" id="exampleText" className="form-control-sm" onKeyUp={this.dataSctr} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Área de Personal</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.dataIdAreaPersonal} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                    <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {/* <FormGroup>
                                <Input type="text" name="text" id="exampleText" className="form-control-sm"/>
                            </FormGroup> */}
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Cod. Área Personal</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="text" id="exampleText" className="form-control-sm" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Área Nomina</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="text" id="exampleText" className="form-control-sm" disabled />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >CECO</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.dataIdRelacionLaboral} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                    <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {/* <FormGroup>
                                <Input type="text" name="text" id="exampleText" className="form-control-sm"/>
                            </FormGroup> */}
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Cod. Laboral</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="text" name="text" id="exampleText" className="form-control-sm" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" >Adjuntar archivo DP</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.dataFileDp} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText className="form-control-sm" style={{ margin: 0, padding: 0 }}>
                                                    <Button className="fas fa-search btn btn-sm " style={{ width: "100%" }} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {/* <FormGroup>
                                <Input type="text" name="text" id="exampleText" className="form-control-sm" disabled/>
                            </FormGroup> */}
                                    </Col>
                                </Row>

                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{ marginRight: "-120px", marginTop: "-5px" }}>CECO</Label>
                                    <Col md="2">
                                        {/* <Button color="primary" className="fas fa-plus btn btn-sm" style={{width:"30%"}}></Button> */}
                                        <Button color="primary" className="fas fa-plus btn btn-sm" style={{ width: "30%" }} onClick={this.ModalCentroCosto}>{this.props.buttonLabel}</Button>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{ marginLeft: "-65px", marginTop: "-5px" }}>Ubicación</Label>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input type="select" name="text" id="exampleText" className="form-control-sm" onChange={this.dataDireccion} >
                                                <option value="1">Dir 1</option>
                                                <option value="2">Dir 2</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <div style={{ width: "100%", marginLeft: "10px" }}>
                                            <Button color="warning" className="btn btn-sm" style={{ width: "45%" }}>Limpiar</Button>
                                            <Button color="success" className="btn btn-sm" style={{ width: "45%" }} onClick={this.updateRequerimiento} >Guardar</Button>
                                        </div>
                                    </Col>
                                </Row>

                            </FormGroup>
                        </CardBody>
                    </Card>
                </Container>
                {/* Modal Centro de Costos */}
                <Modal isOpen={this.state.modal} ModalCentroCosto={this.ModalCentroCosto} className={this.props.className} style={{ marginTop: "150px" }}>
                    {/* <ModalHeader ModalCentroCosto={this.ModalCentroCosto}>Centro de Costos</ModalHeader> */}
                    <ModalBody>
                        <Card>
                            <CardHeader style={{ textAlign: "center" }}><b>Centro de Costos</b></CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="5" style={{ textAlign: "center" }}>
                                        CECO
                            </Col>
                                    <Col md="5" style={{ textAlign: "center" }}>
                                        DESC CECO
                            </Col>
                                    <Col md="2" style={{ textAlign: "center" }}>
                                        %
                            </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm " />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm " />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm " />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm " />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm " />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm " />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Input className="form-control-sm" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="10">
                                        <div style={{ float: "right" }}>
                                            <Button color="success" className="btn btn-sm" onClick={this.ModalCentroCosto}>Guardar</Button>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div style={{ float: "right" }}>
                                            <Button color="danger" className="btn btn-sm" onClick={this.ModalCentroCosto}>Cerrar</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    {/* <ModalFooter>
                <Button color="primary" onClick={this.ModalCentroCosto}>Do Something</Button>
                <Button color="danger" className="btn btn-sm" onClick={this.ModalCentroCosto}>Cerrar</Button>
            </ModalFooter> */}
                </Modal>
            </>
        );
    }
}
export default Requerimiento;
