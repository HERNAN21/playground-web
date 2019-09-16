import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import Select from 'react-select'
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  CardBody,
  Input,
  Button,
  Col,
  Modal,
  Card,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Table,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { server, api_name } from "variables/general.jsx";

class CerrarSolicitud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misrecursos: [],
      listaEquipos: [],
      cuentas: [],
      cecos: [],
      actividades: [],
      server: server,
      exampleModal: false,
      equiposModal: false,
      recursoActual: '',
      comentarios: [],
      mensaje: '',
      tabs: 1,
    };

    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    var that = this
    this.setState({ mensaje: this.recursoSession.mensaje });

    fetch(this.state.server + api_name + "/solicitudes/" + this.recursoSession.id_recurso)
      .then(response => response.json())
      .then(function (misrecursos) {
        for (var i in misrecursos) {
          misrecursos[i].i = Number(i);
          misrecursos[i].nombre = misrecursos[i].id_recurso + ' ' + misrecursos[i].nombres + ' ' + misrecursos[i].ape_paterno;
          misrecursos[i].hora_real_inicio = misrecursos[i].horainicio
          misrecursos[i].hora_real_fin = misrecursos[i].horafin
        }
        that.setState({ misrecursos });
      });

    fetch(this.state.server + api_name + "/requerimientos_abiertos/" + this.recursoSession.id_recurso)
      .then(response => response.json())
      .then(function (listaEquipos) {
        for (var i in listaEquipos) {
          listaEquipos[i].i = Number(i);
          listaEquipos[i].fecha_inicio_real = listaEquipos[i].fecha_sol;
          listaEquipos[i].fecha_fin_real = listaEquipos[i].fecha_sol;
        }
        that.setState({ listaEquipos });
      });

    fetch(this.state.server + api_name + "/cuentas/" + this.recursoSession.id_recurso + "/O")
      .then(response => response.json())
      .then(cuentas => this.setState({ cuentas }));
    fetch(this.state.server + api_name + "/centros/" + this.recursoSession.id_recurso + "/CECO/O")
      .then(response => response.json())
      .then(cecos => this.setState({ cecos }));
    fetch(this.state.server + api_name + "/generales/" + this.recursoSession.id_recurso + "/ACTIVIDAD")
      .then(response => response.json())
      .then(actividades => this.setState({ actividades }));
    fetch(this.state.server + api_name + "/generales/" + this.recursoSession.id_recurso + "/COMENTARIOPER")
      .then(response => response.json())
      .then(comentarios => this.setState({ comentarios }));
    fetch(this.state.server + api_name + "/ubicaciones/" + this.recursoSession.id_recurso + "/ALM")
      .then(response => response.json())
      .then(almacenes => this.setState({ almacenes }));
  }

  esValido = val => {
    if (val == null || val == '') {
      return false;
    } else {
      return true;
    }
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  closeRequest = _ => {
    let self = this
    const { misrecursos, recursoActual } = this.state
    let rec = this.state.misrecursos[recursoActual.i];
    let i = recursoActual.i
    if (!this.esValido(rec.cuenta) || !this.esValido(rec.calificacion) ||
      !this.esValido(rec.id_comentario) || !this.esValido(rec.hora_real_inicio) ||
      !this.esValido(rec.hora_real_fin) || !this.esValido(rec.id_recurso) ||
      !this.esValido(rec.actividad) || !this.esValido(rec.centroCosto) ||
      !this.esValido(rec.almacen)) {
      self.errorAlert();
      return;
    }
    var datadisponibilidad = {
      id_cuenta: this.state.misrecursos[i].cuenta,
      calificacion: this.state.misrecursos[i].calificacion,
      id_comentario: this.state.misrecursos[i].id_comentario,
      hora_inicio: this.state.misrecursos[i].hora_real_inicio,
      hora_fin: this.state.misrecursos[i].hora_real_fin,
      id_usuario: this.recursoSession.id_recurso,
      id_actividad: this.state.misrecursos[i].actividad,
      ceco: this.state.misrecursos[i].centroCosto,
      id_almacen: this.state.misrecursos[i].almacen,
      is_active: true,
      estado: 'C'
    }

    fetch(this.state.server + api_name + "/disponibilidades/" + this.state.misrecursos[i].id,
      {
        method: 'PUT',
        body: JSON.stringify(datadisponibilidad),
        headers:
        {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) { return response.json(); })
      .then(function (e_return) {
        self.customAlert(e_return[0].text);
        delete misrecursos[i];
        self.toggleModal("exampleModal");
      });
  }

  closeRequestEq = _ => {
    let self = this
    const { listaEquipos, recursoActual } = this.state
    let rec = this.state.listaEquipos[recursoActual.i];
    var dataEq = {
      id_usuario: this.recursoSession.id_recurso,
      fechaInicio: rec.fecha_inicio_real,
      fechaFin: rec.fecha_fin_real,
      id_ubicacion: rec.id_ubicacion,
      id_cuenta: rec.id_cuenta,
      ceco: rec.id_ceco,
      is_closed: true
    }

    fetch(this.state.server + api_name + "/solicitudes_c/" + rec.id,
      {
        method: 'PUT',
        body: JSON.stringify(dataEq),
        headers:
        {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) { return response.json(); })
      .then(function (e_return) {
        self.customAlert(e_return[0].text);
        delete listaEquipos[recursoActual.i];
        self.toggleModal("equiposModal");
      });
  }

  idRecursoFormat(cell, row) {
    return (
      <Input value={cell} type="hidden" id={"idRecurso" + row.i} />
    )
  }

  inputInicioFormat(cell, row) {
    return (
      <Input defaultValue={cell} type="time" id={"horaInicio" + row.i} name="horaInicio" />
    )
  }

  inputFinFormat(cell, row) {
    return (
      <Input defaultValue={cell} type="time" id={"horaFin" + row.i} name="horaFin" />
    )
  }

  checkBoxFormat = (cell, row) => {
    if (this.state.misrecursos[row.i].disponible) {
      return (
        <input type="checkbox" checked={this.state.misrecursos[row.i].disponible} readOnly />
      )
    } else {
      return (
        <input id={"cb" + row.i} type="checkbox" />
      )
    }
  }

  fechaFormat = (cell, row) => {
    return cell.substring(0, 10);
  }

  rate(cell, row) {
    return (
      <div>
        <StarRatingComponent
          editing={true} starCount={5} value={cell} editing={false}
          starColor='#F29104' name={"star" + row.i} emptyStarColor='#9D9D9C'
        />
      </div>
    )
  }

  cancelarSolicitud = v => {
    let self = this;
    this.setState({ recursoActual: v });
    const { misrecursos } = this.state
    var datadisponibilidad = {
      id_usuario: this.recursoSession.id_recurso,
      estado: 'D'
    }

    fetch(this.state.server + api_name + "/disponibilidades/" + v.id,
      {
        method: 'PATCH',
        body: JSON.stringify(datadisponibilidad),
        headers:
        {
          'Content-Type': 'application/json'
        }
      })
      .then(function (data) {
        self.customAlert('Se canceló la solicitud seleccionada');
        delete misrecursos[v.i];
      })
  }

  cancelarSolicitudEq = v => {
    let self = this;
    this.setState({ recursoActual: v });
    const { listaEquipos } = this.state
    var datadisponibilidad = {
      id_usuario: this.recursoSession.id_recurso,
      is_assigned: false
    }

    fetch(this.state.server + api_name + "/solicitudes/" + v.id,
      {
        method: 'PATCH',
        body: JSON.stringify(datadisponibilidad),
        headers:
        {
          'Content-Type': 'application/json'
        }
      })
      .then(function (data) {
        self.customAlert('Se canceló la solicitud seleccionada');
        delete listaEquipos[v.i];
      })
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
          Ocurrió un error al cerrar las solicitudes registradas
        </ReactBSAlert>
      )
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

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  rowEvents = row => {
    this.setState({ recursoActual: row });
    this.toggleModal("exampleModal");
  };

  rowEventsEq = row => {
    this.setState({ recursoActual: row });
    this.toggleModal("equiposModal");
  };

  handleChangeCuenta = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].cuenta = selectedOption.value;
    this.setState(misrecursos);
  }

  handleChangeCuentaEq = (selectedOption) => {    
    const { listaEquipos, recursoActual } = this.state
    listaEquipos[recursoActual.i].id_cuenta = selectedOption.value;
    this.setState(listaEquipos);
  }


  handleChangeCeco = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].centroCosto = selectedOption.value;
    this.setState(misrecursos);
  }

  handleChangeCeCoEq = (selectedOption) => {
    const { listaEquipos, recursoActual } = this.state
    listaEquipos[recursoActual.i].id_ceco = selectedOption.value;
    this.setState(listaEquipos);
  }

  handleChangeCebe = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].centroBeneficio = selectedOption.value;
    this.setState(misrecursos);
  }

  handleChangeStar = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].calificacion = selectedOption;
    this.setState(misrecursos);
  }

  handleChangeHoraInicio = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].hora_real_inicio = selectedOption.target.value;
    this.setState(misrecursos);
  }

  handleChangeHoraFin = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].hora_real_fin = selectedOption.target.value;
    this.setState(misrecursos);
  }

  handleChangeFechaInicioEq = (selectedOption) => {
    const { listaEquipos, recursoActual } = this.state
    listaEquipos[recursoActual.i].fecha_inicio_real = selectedOption.target.value;
    this.setState(listaEquipos);
  }

  handleChangeFechaFinEq = (selectedOption) => {
    const { listaEquipos, recursoActual } = this.state
    listaEquipos[recursoActual.i].fecha_fin_real = selectedOption.target.value;
    this.setState(listaEquipos);
  }

  handleChangeActividades = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].actividad = selectedOption.value;
    this.setState(misrecursos);
  }

  handleChangeAlmacen = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].almacen = selectedOption.value;
    this.setState(misrecursos);
  }

  handleChangeAlmacenEq = (selectedOption) => {
    const { listaEquipos, recursoActual } = this.state
    listaEquipos[recursoActual.i].id_ubicacion = selectedOption.value;
    this.setState(listaEquipos);
  }

  handleChangeComentarios = (selectedOption) => {
    const { misrecursos, recursoActual } = this.state
    misrecursos[recursoActual.i].id_comentario = selectedOption.value;
    this.setState(misrecursos);
  }

  render() {
    const misRecursos = this.state.misrecursos;
    const { listaEquipos } = this.state
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
              {this.state.recursoActual.nombre}
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
            <Row>
              <Col md="4" sm="6">
                <Input
                  defaultValue={this.state.recursoActual.horainicio}
                  type="time"
                  name="horaFin"
                  onChange={this.handleChangeHoraInicio}
                />
              </Col>
              <Col md="4" sm="6">
                <Input
                  defaultValue={this.state.recursoActual.horafin}
                  type="time"
                  name="horaFin"
                  onChange={this.handleChangeHoraFin}
                />
              </Col>
            </Row>
            <span>&nbsp;</span>
            <Row>
              <Col>
                <Select options={this.state.almacenes}
                  isClearable
                  isSearchable
                  placeholder="Almacen"
                  onChange={this.handleChangeAlmacen} />
              </Col>
            </Row>
            <span>&nbsp;</span>
            <Select options={this.state.cuentas}
              isClearable
              isSearchable
              placeholder="Cuenta"
              onChange={this.handleChangeCuenta}
            />
            <span>&nbsp;</span>
            <Select options={this.state.actividades}
              isClearable
              isSearchable
              placeholder="Actividad"
              onChange={this.handleChangeActividades} />
            <span>&nbsp;</span>
            <Row>
              <Col md="6" >
                <Select options={this.state.cecos}
                  isClearable
                  isSearchable
                  placeholder="Centro de costo"
                  onChange={this.handleChangeCeco} />
              </Col><Col md="6">
              </Col></Row>
            <span>&nbsp;</span>
            <Select options={this.state.comentarios}
              isClearable
              isSearchable
              placeholder="Comentario"
              onChange={this.handleChangeComentarios} />
            <span>&nbsp;</span>
            <Row>
              <Col md="6" >
                Calificación</Col><Col md="6" >
                <StarRatingComponent
                  editing={true}
                  starCount={5}
                  defaultValue={this.state.recursoActual.calificacion}
                  starColor='#F29104'
                  name={"star"}
                  emptyStarColor='#9D9D9C'
                  onStarClick={this.handleChangeStar.bind(this)}
                />
              </Col></Row>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              Cerrar
            </Button>
            <Button color="primary" type="button" onClick={this.closeRequest}>
              Guardar
            </Button>
          </div>
        </Modal>

        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.equiposModal}
          toggle={() => this.toggleModal("equiposModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="equiposModalLabel">
              {this.state.recursoActual.cantidad_pres} {this.state.recursoActual.des_recurso}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("equiposModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col md="6" sm="6">
                <Input
                  defaultValue={this.state.recursoActual.fecha_sol}
                  type="date"
                  name="fechaInicio"
                  onChange={this.handleChangeFechaInicioEq}
                />
              </Col>
              <Col md="6" sm="6">
                <Input
                  defaultValue={this.state.recursoActual.fecha_sol}
                  type="date"
                  name="fechaFin"
                  onChange={this.handleChangeFechaFinEq}
                />
              </Col>
            </Row>
            <span>&nbsp;</span>
            <Row>
              <Col>
                <Select options={this.state.almacenes}
                  isClearable
                  isSearchable
                  placeholder="Almacen"
                  onChange={this.handleChangeAlmacenEq} />
              </Col>
            </Row>
            <span>&nbsp;</span>
            <Select options={this.state.cuentas}
              isClearable
              isSearchable
              placeholder="Cuenta"
              onChange={this.handleChangeCuentaEq}
            />
            <span>&nbsp;</span>
            <Row>
              <Col md="6" >
                <Select options={this.state.cecos}
                  isClearable
                  isSearchable
                  placeholder="Centro de costo"
                  onChange={this.handleChangeCeCoEq}
                />
              </Col><Col md="6">
              </Col></Row>
            <span>&nbsp;</span>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("equiposModal")}
            >
              Cerrar
            </Button>
            <Button color="primary" type="button" onClick={this.closeRequestEq}>
              Guardar
            </Button>
          </div>
        </Modal>

        <SimpleHeader name="Cerrar solicitud" parentName="Inicio" toggleNavs={this.toggleNavs} />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                  <Card>
                    <CardBody>
                      <div className="table-responsive" ref="first-list">
                        <Table className="align-items-center table-flush">
                          <thead className="thead-light">
                            <tr>
                              <th className="sort" data-sort="name" scope="col">
                                Nombre
                        </th>
                              <th className="sort" data-sort="budget" scope="col">
                                Fecha
                        </th>
                              <th className="sort" data-sort="status" scope="col">
                                Hora inicio planificada
                        </th>
                              <th scope="col"> Hora fin planificada</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody className="list">
                            {misRecursos.map((v, i) => {
                              return (

                                <tr key={v.id}>
                                  <th scope="row">
                                    <span className="name mb-0 text-sm">
                                      {v.nombre}
                                    </span>
                                  </th>
                                  <td className="budget">{v.fecha}</td>
                                  <td className="budget">{v.horainicio}</td>
                                  <td className="budget">{v.horafin}</td>

                                  <td className="text-right">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        className="btn-icon-only text-light"
                                        color=""
                                        role="button"
                                        size="sm"
                                      >
                                        <i className="fas fa-ellipsis-v" />
                                      </DropdownToggle>
                                      <DropdownMenu className="dropdown-menu-arrow" right>
                                        <DropdownItem
                                          href="#"
                                          onClick={e => this.rowEvents(v)}>
                                          Cerrar solicitud
                              </DropdownItem>
                                        <DropdownItem
                                          href="#"
                                          onClick={e => this.cancelarSolicitud(v)}>
                                          Cancelar solicitud
                              </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId="tabs2">
                  <Card>
                    <CardBody>
                      <Table className="align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th className="sort" data-sort="name" scope="col">
                              Equipo
                            </th>
                            <th className="sort" data-sort="budget" scope="col">
                              Solicitado
                            </th>
                            <th className="sort" data-sort="status" scope="col">
                              Almacen
                            </th>
                            <th className="sort" data-sort="status" scope="col">
                              Cuenta
                            </th>
                            <th className="sort" data-sort="status" scope="col">
                              Solicitante
                            </th>
                            <th className="sort" data-sort="status" scope="col">
                              Prestado
                            </th>
                            <th className="sort" data-sort="status" scope="col">

                            </th>
                          </tr>
                        </thead>
                        <tbody className="list">
                          {listaEquipos.map((v, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row">
                                  <span className="name mb-0 text-sm">
                                    {v.des_recurso}
                                  </span>
                                </th>
                                <td>
                                  <span className="name mb-0 text-sm">
                                    {v.cantidad}
                                  </span>
                                </td>
                                <td>
                                  <span className="name mb-0 text-sm">
                                    {v.desc_alm_ofer}
                                  </span>
                                </td>
                                <td>
                                  <span className="name mb-0 text-sm">
                                    {v.des_cuenta_ofer}
                                  </span>
                                </td>
                                <td>
                                  <span className="name mb-0 text-sm">
                                    {v.nombre_sol}
                                  </span>
                                </td>
                                <td>
                                  {v.cantidad_pres}
                                </td>
                                <td>
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      color=""
                                      role="button"
                                      size="sm"
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                      <DropdownItem
                                        href="#"
                                        onClick={e => this.rowEventsEq(v)}>
                                        Cerrar solicitud
                                    </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={e => this.cancelarSolicitudEq(v)}>
                                        Cancelar solicitud
                                    </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
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

export default CerrarSolicitud;
