import React from 'react';
import $ from 'jquery';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import StarRatingComponent from 'react-star-rating-component';
import Select from 'react-select'
import ReactBSAlert from "react-bootstrap-sweetalert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Input,
  Button,
  Col,
  Table,
  TabContent,
  TabPane,
  Modal
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { server, api_name, listEstrellas, listDisponible, today } from "variables/general.jsx";
import 'react-block-ui/style.css';

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Mostrando{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={e => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        registros.
      </label>
    </div>
  )
});

class Disponibles extends React.Component {
  constructor(props) {
    super(props);

    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    this.state = {
      recursos_disponibles: [],
      estrellas: '',
      id_perfil: '',
      id_actividad: '',
      id_cuenta: '',
      disponible: '',
      tabs: 1,
      listEstrellas: listEstrellas,
      listDisponible: listDisponible,
      id_ubicacion: '',
      recursoActual: {},
      personal: {},
      tipoequipos: [],
      startDate: new Date(),
      misEquipos: []
    };

    this.handleChange = this.handleChange.bind(this);

    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    var that = this

    fetch(server + api_name + "/personales_disponibles/" + this.recursoSession.id_recurso + "/" + today)
      .then(response => response.json())
      .then(function (recursos_disponibles) {
        for (var i in recursos_disponibles) {
          recursos_disponibles[i].i = Number(i);
          recursos_disponibles[i].nombre = recursos_disponibles[i].id_recurso + ' ' + recursos_disponibles[i].nombres.split(' ')[0] + ' ' + recursos_disponibles[i].ape_paterno;
          recursos_disponibles[i].calificacion = recursos_disponibles[i].calificacion_acumulada / recursos_disponibles[i].cant_calificacion;
          recursos_disponibles[i].estrellas = recursos_disponibles[i].calificacion_acumulada > 0 ? Number(recursos_disponibles[i].calificacion_acumulada / recursos_disponibles[i].cant_calificacion) : 0;
          recursos_disponibles[i].solicitado = recursos_disponibles[i].id_solicitante === that.recursoSession.id_recurso ?
            true : false;
          recursos_disponibles[i].solicitar = false;
        }
        that.setState({ recursos_disponibles, recursos_disponibles_original: recursos_disponibles });
      });

    fetch(server + api_name + "/generales/" + this.recursoSession.id_recurso + "/PUESTO")
      .then(response => response.json())
      .then(puestos => this.setState({ puestos }));
    fetch(server + api_name + "/cuentas/" + this.recursoSession.id_recurso + "/X")
      .then(response => response.json())
      .then(cuentas => this.setState({ cuentas }));
    fetch(server + api_name + "/generales/" + this.recursoSession.id_recurso + "/ACTIVIDAD")
      .then(response => response.json())
      .then(actividades => this.setState({ actividades }));
    fetch(server + api_name + "/ubicaciones/" + this.recursoSession.id_recurso + "/ALM")
      .then(response => response.json())
      .then(almacenes => this.setState({ almacenes }));
    fetch(server + api_name + "/generales/" + this.recursoSession.id_recurso + "/TIPOEQUIPO")
      .then(response => response.json())
      .then(tipoequipos => this.setState({ tipoequipos }));
  }

  onChange = date => this.setState({ date })

  toggleBlocking() {
    this.setState({ blocking: !this.state.blocking });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  customAlert = txt => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Exito"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          confirmBtnText="Ok"
          btnSize=""
        >
          {txt}
        </ReactBSAlert>
      )
    });
  }

  successAlert = _ => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Exito"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          confirmBtnText="Ok"
          btnSize=""
        >
          Se solicitó el personal seleccionado
        </ReactBSAlert>
      )
    });
  }

  errorAlert = _ => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Error"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="warning"
          confirmBtnText="Ok"
          btnSize=""
        >
          Ocurrió un error al registrar el personal disponible
        </ReactBSAlert>
      )
    });
  }

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };



  pendienteAlert = _ => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Error"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="warning"
          confirmBtnText="Ok"
          btnSize=""
        >
          {this.recursoSession.mensaje}
        </ReactBSAlert>
      )
    });
  }

  idRecursoFormat(cell, row) {
    return (
      <Input
        value={cell}
        type="hidden"
        id={"idRecurso" + row.i}
      />
    )
  }

  inputHoraFormat(cell, row) {
    return cell.substring(0, 5);
  }

  checkBoxFormat = (cell, row) => {
    if (row.solicitado) {
      return (
        <label className="custom-toggle custom-toggle-success mr-1">
          <input defaultChecked type="checkbox" id={"cb" + row.i} onChange={e => this.changeCB(e, row)} />
          <span
            className="custom-toggle-slider rounded-circle"
            data-label-off="No"
            data-label-on="Si"
          />
        </label>
      )
    } else {
      return (
        <label className="custom-toggle custom-toggle-success mr-1">
          <input type="checkbox" id={"cb" + row.i} onChange={e => this.changeCB(e, row)} />
          <span
            className="custom-toggle-slider rounded-circle"
            data-label-off="No"
            data-label-on="Si"
          />
        </label>
      )
    }
  }

  changeCB = (e, row) => {
    let self = this
    if ($("#cb" + row.i).prop("checked")) {
      var datadisponibilidad = {
        id_usuario: this.recursoSession.id_recurso,
        estado:'O'
      }

      fetch(server + api_name + "/disponibilidades/" + this.state.recursos_disponibles[row.i].id,
        {
          method: 'PATCH',
          body: JSON.stringify(datadisponibilidad),
          headers:
          {
            'Content-Type': 'application/json'
          }
        })        
        .then(function (response) { return response.json(); })
        .then(function (e_return) {
          self.setState({ estadoDisponible: true });
          self.customAlert(e_return[0].text);
        });
    }
  }

  rate(cell, row) {
    return (
      <div>
        <StarRatingComponent
          name={"rate"}
          editing={false}
          starCount={5}
          value={cell}
        />
      </div>
    )
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  filtrar = _ => {
    const { recursos_disponibles_original, estrellas, id_perfil, id_actividad, id_cuenta, disponible, id_ubicacion } = this.state;
    var listaVariables = [];
    listaVariables.push({ value: estrellas, key: 'estrellas' });
    listaVariables.push({ value: id_perfil, key: 'id_perfil' });
    listaVariables.push({ value: id_actividad, key: 'id_actividad' });
    listaVariables.push({ value: id_cuenta, key: 'id_cuenta' });
    listaVariables.push({ value: disponible, key: 'disponible' });
    listaVariables.push({ value: id_ubicacion, key: 'id_ubicacion' });
    let misrecursosfiltrados = recursos_disponibles_original.filter(function (recurso) {
      for (var i in listaVariables) {
        if (listaVariables[i].value !== '') {
          if (recurso[listaVariables[i].key] != listaVariables[i].value) {
            return false;
          }
        }
      }
      return true;
    }
    );
    this.setState({ recursos_disponibles: misrecursosfiltrados });
  }

  handleFilters = (e, id) => {
    e !== null ? this.setState({ [id]: e.value }) : this.setState({ [id]: '' });
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  verDetalle = _ => {

    this.toggleModal("exampleModal");
  }

  getPersonal = id_personal => {
    let self = this;
    fetch(server + api_name + "/obtenerPersonal/" + id_personal)
      .then(response => response.json())
      .then(function (data) {
        if (data != null && data.length > 0) {
          self.setState({ personal: data[0] });
        } else {
          self.errorAlert();
        }
      });
  }

  handleReactDatetimeChange = (who, date) => {
    this.setState({
      [who]: date
    });
  };

  getClassNameReactDatetimeDays = date => {
    if (this.state.startDate && this.state.endDate) {
    }
    if (
      this.state.startDate &&
      this.state.endDate &&
      this.state.startDate._d + "" !== this.state.endDate._d + ""
    ) {
      if (
        new Date(this.state.endDate._d + "") > new Date(date._d + "") &&
        new Date(this.state.startDate._d + "") < new Date(date._d + "")
      ) {
        return " middle-date";
      }
      if (this.state.endDate._d + "" === date._d + "") {
        return " end-date";
      }
      if (this.state.startDate._d + "" === date._d + "") {
        return " start-date";
      }
    }
    return "";
  };

  render() {
    const { personal } = this.state
    const misEquipos = this.state.misEquipos
    return (
      <>
        {this.state.alert}

        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {personal.id_recurso}
              {personal.nombres}&nbsp;
              {personal.ape_paterno}&nbsp;
              {personal.ape_materno}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Input
              defaultValue={this.state.recursoActual.horainicio}
              type="time"
              name="horaFin"
            />
            <span>&nbsp;</span>
            <Input
              defaultValue={this.state.recursoActual.horafin}
              type="time"
              name="horaFin"
            />
            <span>&nbsp;</span>
            <Select options={this.state.cuentas}
              isClearable
              isSearchable
              placeholder="Cuenta"
            />
            <span>&nbsp;</span>
            <Select options={this.state.actividades}
              isClearable
              isSearchable
              placeholder="Actividad" />
            <span>&nbsp;</span>
            <br></br>
            Calificación<br></br>
            <StarRatingComponent
              editing={true}
              starCount={5}
              value={this.state.recursoActual.estrellas}
              starColor='#F29104'
              name={"star"}
              emptyStarColor='#9D9D9C'
            />
          </div>
        </Modal>

        <SimpleHeader name="Recursos disponibles" toggleNavs={this.toggleNavs} />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                  <Card>
                    <CardBody>
                      <ToolkitProvider
                        data={this.state.recursos_disponibles}
                        keyField="id"
                        columns={[
                          {
                            dataField: "nombre",
                            text: "Nombre",
                            sort: true,
                          },
                          {
                            dataField: "nom_ubicacion",
                            text: "Ubicación",
                            sort: true,
                          },
                          {
                            dataField: "cuenta",
                            text: "Cuenta",
                            sort: true,
                          },
                          {
                            dataField: "id_perfil",
                            text: "Perfil",
                            sort: true,
                          },
                          {
                            dataField: "estrellas",
                            text: "",
                            sort: true,
                            formatter: this.rate,
                          },
                          {
                            dataField: "horainicio",
                            text: "Hora inicio",
                            sort: true,
                            formatter: this.inputHoraFormat,
                          },
                          {
                            dataField: "horafin",
                            text: "Hora fin",
                            sort: true,
                            formatter: this.inputHoraFormat,
                          },
                          {
                            dataField: "solicitar",
                            text: "",
                            sort: true,
                            formatter: this.checkBoxFormat
                          },
                        ]}
                      // search
                      >
                        {props => (
                          <div className="py-4 table-responsive">
                            <div className="py-4 table-responsive">
                              <Container fluid>
                                <Row>
                                  <Col>
                                    <Select options={this.state.listEstrellas} className="form-control-sm"
                                      isClearable
                                      isSearchable
                                      placeholder="Calificación"
                                      onChange={e => this.handleFilters(e, 'estrellas')}
                                    />
                                  </Col>
                                  <Col>
                                    <Select options={this.state.puestos} className="form-control-sm"
                                      isClearable
                                      isSearchable
                                      placeholder="Perfil"
                                      onChange={e => this.handleFilters(e, 'id_perfil')}
                                    />
                                  </Col>
                                  <Col>
                                    <Select options={this.state.actividades} className="form-control-sm"
                                      isClearable
                                      isSearchable
                                      placeholder="Actividad"
                                      onChange={e => this.handleFilters(e, 'id_actividad')}
                                    />
                                  </Col>
                                  <Col>
                                    <Select options={this.state.cuentas} className="form-control-sm"
                                      isClearable
                                      isSearchable
                                      placeholder="Cuenta"
                                      onChange={e => this.handleFilters(e, 'id_cuenta')}
                                    />
                                  </Col>
                                  <Col>
                                    <Select options={this.state.almacenes} className="form-control-sm"
                                      isClearable
                                      isSearchable
                                      placeholder="Almacen"
                                      onChange={e => this.handleFilters(e, 'id_ubicacion')}
                                    />
                                  </Col>
                                  <Col><Button
                                    className="btn-neutral btn-round btn-icon"
                                    color="default"
                                    id="tooltip969372949"
                                    onClick={this.filtrar}
                                    size="sm"
                                  >
                                    <span className="btn-inner--icon mr-1">
                                      <i className="fas fa-user-edit" />
                                    </span>
                                    <span className="btn-inner--text">Filtrar</span>
                                  </Button></Col>
                                </Row>
                                <Row><Col><span>&nbsp;</span></Col></Row>
                              </Container>
                              <BootstrapTable
                                ref={el => (this.componentRef = el)}
                                {...props.baseProps}
                                bootstrap4={true}
                                pagination={pagination}
                                bordered={false}
                                // rowEvents={this.rowEvents}
                                id="react-bs-table"
                              />
                            </div>
                          </div>
                        )}
                      </ToolkitProvider>
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId="tabs2">
                  <Card>
                    <CardHeader></CardHeader>
                    <CardBody>
                      <Table className="align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th className="sort" data-sort="name" scope="col">
                              Equipo
                        </th>
                            <th className="sort" data-sort="budget" scope="col">
                              Codigo activo
                        </th>
                            <th className="sort" data-sort="status" scope="col">
                              Cantidad
                        </th>
                            <th className="sort" data-sort="status" scope="col">
                              Ubicacion
                        </th>
                          </tr>
                        </thead>
                        <tbody className="list">
                          {misEquipos.map((v, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row">
                                  <span className="name mb-0 text-sm">
                                    {v.desc_equipo}
                                  </span>
                                </th>
                                <td>
                                  {v.codigo_activo}
                                </td>
                                <td>
                                  {v.cantidad}
                                </td>
                                <td>
                                  {v.desc_ubicacion}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </TabPane>
              </TabContent>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Disponibles;
