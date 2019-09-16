import React from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    // Label,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
} from "reactstrap";
// core components
import ReactBSAlert from "react-bootstrap-sweetalert";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import Select from 'react-select'
import { server, api_name } from "variables/general.jsx";
import classnames from "classnames";


class Personal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: 1,
            puestos: [],
            paises: [],
            sedes: [],
            almacenes: [],
            cuentas: [],
            cecos: [],
            cebes: [],
            actividades: [],
            server: server,
            personal: {
                id_usuario: '',
                id_recurso: '', nombres: '', ape_paterno: '', ape_materno: '', correo: '', id_perfil: '',
                id_actividad: '', centroCosto: '', centroBeneficio: '', comentario_adicional: '', id_recurso_superior: '',
                id_pais: '', id_sede: '', id_almacen: '', cuenta: '', id_almacen2: '', id_actividad2: '', id_almacen3: '', id_actividad3: ''
            }
        }

        this.recursoSession = JSON.parse(sessionStorage.recursoSession);

        fetch(this.state.server + api_name + "/getGeneral/" + this.recursoSession.id_recurso + "/PUESTO")
            .then(response => response.json())
            .then(puestos => this.setState({ puestos }));
        fetch(this.state.server + api_name + "/getGeneral/" + this.recursoSession.id_recurso + "/PAIS")
            .then(response => response.json())
            .then(paises => this.setState({ paises }));
        fetch(this.state.server + api_name + "/getUbicaciones/" + this.recursoSession.id_recurso + "/SED")
            .then(response => response.json())
            .then(sedes => this.setState({ sedes }));
        fetch(this.state.server + api_name + "/getUbicaciones/" + this.recursoSession.id_recurso + "/ALM")
            .then(response => response.json())
            .then(almacenes => this.setState({ almacenes }));
        fetch(this.state.server + api_name + "/getCuentas/" + this.recursoSession.id_recurso + "/O")
            .then(response => response.json())
            .then(cuentas => this.setState({ cuentas }));
        fetch(this.state.server + api_name + "/getCentros/" + this.recursoSession.id_recurso + "/CECO/O")
            .then(response => response.json())
            .then(cecos => this.setState({ cecos }));
        fetch(this.state.server + api_name + "/getCentros/" + this.recursoSession.id_recurso + "/CEBE/O")
            .then(response => response.json())
            .then(cebes => this.setState({ cebes }));
        fetch(this.state.server + api_name + "/getGeneral/" + this.recursoSession.id_recurso + "/ACTIVIDAD")
            .then(response => response.json())
            .then(actividades => this.setState({ actividades }));
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
          [state]: index
        });
      };

    savePersonal = _ => {
        const { personal } = this.state
        this.setState({ personal: { ...personal, id_usuario: this.recursoSession.id_recurso } })
        var obj2 = Object.values(this.state.personal);
        var str = '{"data":"';
        for (var i in obj2) {
            str += i > 0 ? ",'" + obj2[i] + "'" : "'" + obj2[i] + "'";
        }
        str += "\"}"

        fetch(this.state.server + api_name + "/registrarPersonal/" + this.recursoSession.id_recurso,
            {
                method: 'POST',
                body: str,
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });
    }

    handleForm = (e) => {
        const { personal } = this.state
        this.setState({ personal: { ...personal, [e.target.name]: e.target.value } });
    }
    handleSelectForm = (e, label) => {
        const { personal } = this.state
        this.setState({ personal: { ...personal, [label]: e.value } });
    }
    successAlert() {
        this.setState({
            alert: (
                <ReactBSAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Registro Exitoso"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                </ReactBSAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
        window.location.reload();
    }
    render() {
        const { personal } = this.state
        return (
            <>
                
                <SimpleHeader name="Registrar personal" parentName="Recursos" />
                <Container className="mt--6" fluid>
                {/* <Row>
            <Col>
              <div className="nav-wrapper">
                <Nav
                  className="nav-fill flex-column flex-md-row"
                  id="tabs-icons-text"
                  pills
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.tabs === 1}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === 1
                      })}
                      onClick={e => this.toggleNavs(e, "tabs", 1)}
                      href="#"
                      role="tab"
                    >
                      <i className="ni ni-cloud-upload-96 mr-2" />
                      Personal
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.tabs === 2}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === 2
                      })}
                      onClick={e => this.toggleNavs(e, "tabs", 2)}
                      href="#"
                      role="tab"
                    >
                      <i className="ni ni-bell-55 mr-2" />
                      Equipos
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
          </Row> */}

          <Row>
            <div className="col">
              <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                  <Card>
                    <CardHeader className="border-0">
                      <Row>
                        <Col xs="6">
                          <h3 className="mb-0">Mi personal</h3>
                        </Col>
                        <Col className="text-right" xs="6">
                      <Button
                        className="btn-neutral btn-round btn-icon"
                        color="default"
                        id="tooltip969372949"
                        onClick={this.savePersonal}
                        size="sm"
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fas fa-user-edit" />
                        </span>
                        <span className="btn-inner--text">Registrar personal</span>
                      </Button>
                      <UncontrolledTooltip delay={0} target="tooltip969372949">
                        Registrar personal
                  </UncontrolledTooltip>
                    </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols1Input"
                                        >
                                            Código
                                        </label>
                                        <Input
                                            id="example3cols1Input"
                                            placeholder="Código de trabajador"
                                            type="text"
                                            value={personal.id_recurso}
                                            onChange={this.handleForm}
                                            name="id_recurso"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols2Input"
                                        >
                                            Correo electrónico
                                        </label>
                                        <Input
                                            id="example3cols2Input"
                                            placeholder="@ransa.net"
                                            type="text"
                                            value={personal.correo}
                                            onChange={this.handleForm}
                                            name="correo"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3" sm="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example4cols1Input"
                                        >
                                            Nombres
                                        </label>
                                        <Input
                                            id="example4cols1Input"
                                            placeholder="Nombres"
                                            type="text"
                                            value={personal.nombres}
                                            onChange={this.handleForm}
                                            name="nombres"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3" sm="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example4cols2Input"
                                        >
                                            Apellido paterno
                                        </label>
                                        <Input
                                            id="example4cols2Input"
                                            placeholder="Apellido paterno"
                                            type="text"
                                            value={personal.ape_paterno}
                                            onChange={this.handleForm}
                                            name="ape_paterno"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3" sm="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example4cols3Input"
                                        >
                                            Apellido materno
                                        </label>
                                        <Input
                                            id="example4cols3Input"
                                            placeholder="Apellido materno"
                                            type="text"
                                            value={personal.ape_materno}
                                            onChange={this.handleForm}
                                            name="ape_materno"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3" sm="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example5cols3Input"
                                        >
                                            Puesto
                                    </label>
                                        <Select options={this.state.puestos}
                                            isClearable
                                            isSearchable
                                            placeholder="Puesto"
                                            onChange={e => this.handleSelectForm(e, 'id_perfil')} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Row>
                        <Col lg="6">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                        <h3 className="mb-0">Ubicación</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="example5cols3Input"
                                                >
                                                    Pais
                                                </label>
                                                <Select options={this.state.paises}
                                                    isClearable
                                                    isSearchable
                                                    onChange={e => this.handleSelectForm(e, 'id_pais')} />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="example5cols3Input"
                                                >
                                                    Sede
                                                </label>
                                                <Select options={this.state.sedes}
                                                    isClearable
                                                    isSearchable
                                                    onChange={e => this.handleSelectForm(e, 'id_sede')} />
                                            </FormGroup>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="example5cols3Input"
                                                >
                                                    Almacen
                                                </label>
                                                <Select options={this.state.almacenes}
                                                    isClearable
                                                    isSearchable
                                                    onChange={e => this.handleSelectForm(e, 'id_almacen')} />
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                        <h3 className="mb-0">Datos administrativos</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="example5cols3Input"
                                            >
                                                Cuenta
                                                </label>
                                            <Select options={this.state.cuentas}
                                                isClearable
                                                isSearchable
                                                onChange={e => this.handleSelectForm(e, 'cuenta')} />
                                        </FormGroup>
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="example5cols3Input"
                                            >
                                                Centro de costo
                                                </label>
                                            <Select options={this.state.cecos}
                                                isClearable
                                                isSearchable
                                                onChange={e => this.handleSelectForm(e, 'centroCosto')} />
                                        </FormGroup>
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="example5cols3Input"
                                            >
                                                Centro de beneficio
                                                </label>
                                            <Select options={this.state.cebes}
                                                isClearable
                                                isSearchable
                                                onChange={e => this.handleSelectForm(e, 'centroBeneficio')} />
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Card className="mb-4">
                        <CardHeader>
                            <h3 className="mb-0">Record</h3>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                {/* <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols1Input"
                                        >
                                            Almacen
                                        </label>
                                        <Select options={this.state.almacenes}
                                            isClearable
                                            isSearchable
                                            value={personal.id_almacen}
                                        />
                                    </FormGroup>
                                </Col> */}
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols2Input"
                                        >
                                            Actividad actual
                                        </label>
                                        <Select options={this.state.actividades}
                                            isClearable
                                            isSearchable
                                            onChange={e => this.handleSelectForm(e, 'id_actividad')} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols1Input"
                                        >
                                            Almacen
                                        </label>
                                        <Select options={this.state.almacenes}
                                            isClearable
                                            isSearchable
                                            onChange={e => this.handleSelectForm(e, 'id_almacen2')} />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols2Input"
                                        >
                                            Actividad
                                        </label>
                                        <Select options={this.state.actividades}
                                            isClearable
                                            isSearchable
                                            onChange={e => this.handleSelectForm(e, 'id_actividad2')} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols1Input"
                                        >
                                            Almacen
                                        </label>
                                        <Select options={this.state.almacenes}
                                            isClearable
                                            isSearchable
                                            onChange={e => this.handleSelectForm(e, 'id_almacen3')} />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="example3cols2Input"
                                        >
                                            Actividad
                                        </label>
                                        <Select options={this.state.actividades}
                                            isClearable
                                            isSearchable
                                            onChange={e => this.handleSelectForm(e, 'id_actividad3')} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row><Col md="8">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="exampleFormControlTextarea2"
                                    >
                                        Comentarios
                        </label>
                                    <Input
                                        id="exampleFormControlTextarea2"
                                        rows="3"
                                        type="textarea"
                                        maxLength="250"
                                        name="comentario_adicional"
                                        value={personal.comentario}
                                        onChange={this.handleForm} />
                                </FormGroup>
                            </Col></Row>
                        </CardBody>
                    </Card>
                    </TabPane></TabContent></div></Row>
                </Container>
            </>
        );
    }
}
export default Personal;
