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


class Equipos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            equipo:{},
            equipos: [],
            cuentas: [],
            tabs: 1,
            puestos: [],
            paises: [],
            sedes: [],
            almacenes: [],
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

        fetch(this.state.server + api_name + "/cuentas/" + this.recursoSession.id_recurso + "/O")
            .then(response => response.json())
            .then(cuentas => this.setState({ cuentas }));
        fetch(this.state.server + api_name + "/centros/" + this.recursoSession.id_recurso + "/CECO/O")
            .then(response => response.json())
            .then(cecos => this.setState({ cecos }));        
        fetch(this.state.server + api_name + "/ubicaciones/" + this.recursoSession.id_recurso + "/ALM")
            .then(response => response.json())
            .then(almacenes => this.setState({ almacenes }));
        fetch(this.state.server + api_name + "/equipos_t/" + this.recursoSession.id_recurso)
            .then(response => response.json())
            .then(equipos => this.setState({ equipos }));
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    saveEquipo = _ => {
        let self = this;
        const {equipo} = this.state
        let dataEquipo = {
            id_usuario: this.recursoSession.id_recurso,
            id_equipo: equipo.id_equipo, 
            id_ubicacion: equipo.id_ubicacion, 
            id_cuenta: equipo.id_cuenta, 
            id_ceco: equipo.id_ceco, 
            codigo_activo: equipo.codigo_activo, 
            cantidad: equipo.cantidad, 
          }
          if(equipo==={}){
            self.errorAlert("Debe completar los campos obligatorios");
            return;
          }
        
            fetch(this.state.server + api_name + "/equipos_t",
        {
          method: 'POST',
          body: JSON.stringify(dataEquipo),
          headers: { 'Content-Type': 'application/json' }
        }).then(function (response) { return response.json(); })
        .then(function (e_return) {
          self.setState({ estadoDisponible: true });
          if(e_return[0].code==='S'){
            self.successAlert(e_return[0].text);
          }else{
            self.errorAlert(e_return[0].text);
          }
              
        });
    }

    handleForm = (eq) => {
        const { equipo } = this.state
        this.setState({ equipo: { ...equipo, [eq.target.name]: eq.target.value } });
    }
    handleSelectForm = (eq, label) => {
        const { equipo } = this.state
        this.setState({ equipo: { ...equipo, [label]: eq.value } });
    }

    successAlert = msg => {
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

      errorAlert = msg => {
        this.setState({
          alert: (
            <ReactBSAlert
              error
              style={{ display: "block", marginTop: "-100px" }}
              title="Error"
              onConfirm={() => this.hideCustomAlert()}
              onCancel={() => this.hideCustomAlert()}
              confirmBtnBsStyle="error"
              confirmBtnText="Ok"
              btnSize=""
            >
              {msg}
            </ReactBSAlert>
          )
        });
      }

    hideCustomAlert() {
        this.setState({
            alert: null
        });
    }
    render() {
        return (
            <>
                {this.state.alert}
                <SimpleHeader name="Gestión de equipos" parentName="Equipos" />
                <Container className="mt--6" fluid>
                    

                    <Row>
                        <div className="col">
                            <TabContent activeTab={"tabs" + this.state.tabs}>
                                <TabPane tabId="tabs1">
                                    <Card>
                                        <CardHeader className="border-0">
                                            <Row>
                                                <Col xs="6">
                                                    <h3 className="mb-0">Registrar nuevo equipo</h3>
                                                </Col>
                                                <Col className="text-right" xs="6">
                                                    <Button
                                                        className="btn-neutral btn-round btn-icon"
                                                        color="default"
                                                        id="tooltip969372949"
                                                        onClick={this.saveEquipo}
                                                        size="sm"
                                                    >
                                                        <span className="btn-inner--icon mr-1">
                                                            <i className="fas fa-user-edit" />
                                                        </span>
                                                        <span className="btn-inner--text">Registrar equipo</span>
                                                    </Button>
                                                    <UncontrolledTooltip delay={0} target="tooltip969372949">
                                                        Registrar equipo
                  </UncontrolledTooltip>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col md="3" sm="1">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="example3cols1Input"
                                                        >
                                                            Tipo de equipo
                                        </label>
                                        <Select options={this.state.equipos}
                                                            isClearable
                                                            isSearchable
                                                            onChange={e => this.handleSelectForm(e, 'id_equipo')} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="2" sm="1">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="example3cols2Input"
                                                        >
                                                            Almacén
                                        </label>
                                                        <Select options={this.state.almacenes}
                                                            isClearable
                                                            isSearchable
                                                            onChange={e => this.handleSelectForm(e, 'id_ubicacion')} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="3" sm="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="example4cols1Input"
                                                        >
                                                            Cuenta
                                        </label>
                                        <Select options={this.state.cuentas}
                                                            isClearable
                                                            isSearchable
                                                            onChange={e => this.handleSelectForm(e, 'id_cuenta')} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="3" sm="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="example4cols1Input"
                                                        >
                                                            Centro de costo
                                        </label>
                                        <Select options={this.state.cecos}
                                                            isClearable
                                                            isSearchable
                                                            onChange={e => this.handleSelectForm(e, 'id_ceco')} />
                                                    </FormGroup>
                                                </Col>
                                                </Row><Row>
                                                <Col md="3" sm="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="example4cols2Input"
                                                        >
                                                            Código de equipo
                                        </label>
                                                        <Input
                                                            id="example4cols2Input"
                                                            placeholder="Código de equipo"
                                                            type="text"                                                            
                                                            onChange={this.handleForm}
                                                            name="codigo_activo"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="2" sm="1">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="example4cols3Input"
                                                        >
                                                            Cantidad
                                        </label>
                                                        <Input
                                                            id="example4cols3Input"
                                                            // defaultValue="1"
                                                            type="number"
                                                            onChange={this.handleForm}
                                                            name="cantidad"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>


                                </TabPane></TabContent></div></Row>
                </Container>
            </>
        );
    }
}
export default Equipos;
