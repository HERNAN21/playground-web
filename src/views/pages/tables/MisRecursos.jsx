import React from "react";
import $ from 'jquery';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import StarRatingComponent from 'react-star-rating-component';
import ReactBSAlert from "react-bootstrap-sweetalert";
import Select from 'react-select'
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Input,
  Col,
  Table,
  TabContent,
  TabPane,
  Button,
  Modal
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { server, api_name, listEstrellas, listDisponible, today, hora_actual } from "variables/general.jsx";
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

class MisRecursos extends React.Component {
  constructor(props) {
    super(props);

    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    this.state = {
      misrecursos: [],
      server: server,
      estrellas: '',
      perfil: '',
      id_actividad: '',
      id_cuenta: '',
      disponible: '',
      tabs: 1,
      listEstrellas: listEstrellas,
      listDisponible: listDisponible,
      estadoDisponible: true,
      cvPersona: false,
      recursoActual: '',
      misEquipos: []
    };

    this.getMiPersonal();
    fetch(this.state.server + api_name + "/generales/" + this.recursoSession.id_recurso + "/PUESTO")
      .then(response => response.json())
      .then(puestos => this.setState({ puestos }));
    fetch(this.state.server + api_name + "/cuentas/" + this.recursoSession.id_recurso + "/O")
      .then(response => response.json())
      .then(cuentas => this.setState({ cuentas }));
    fetch(this.state.server + api_name + "/generales/" + this.recursoSession.id_recurso + "/ACTIVIDAD")
      .then(response => response.json())
      .then(actividades => this.setState({ actividades }));
    fetch(this.state.server + api_name + "/equipos_o/" + this.recursoSession.id_recurso )
      .then(response => response.json())
      .then(misEquipos => this.setState({ misEquipos }));
  }

  toggleBlocking() {
    if (this.recursoSession.mensaje !== null && this.recursoSession.mensaje !== '') {
      this.setState({ blocking: true });
    } else {
      this.setState({ blocking: false });
    }
  }

  getMiPersonal = _ => {
    let self = this;
    fetch(this.state.server + api_name + "/personales/" + this.recursoSession.id_recurso + "/" + today)
      .then(response => response.json())
      .then(function (misrecursos) {
        for (var i in misrecursos) {
          misrecursos[i].i = Number(i)
          misrecursos[i].nombre = misrecursos[i].id_recurso + ' ' + misrecursos[i].nombres.split(' ')[0] + ' ' + misrecursos[i].ape_paterno;
          misrecursos[i].calificacion = misrecursos[i].calificacion_acumulada / misrecursos[i].cant_calificacion;
          misrecursos[i].disponible = misrecursos[i].horainicio != null ? true : false;
          misrecursos[i].horainicio = misrecursos[i].horainicio != null ? misrecursos[i].horainicio : '00:00';
          misrecursos[i].horafin = misrecursos[i].horafin != null ? misrecursos[i].horafin : '00:00';
          misrecursos[i].estrellas = misrecursos[i].calificacion_acumulada > 0 ? Number(misrecursos[i].calificacion_acumulada / misrecursos[i].cant_calificacion) : 0;
          misrecursos[i].disponibleNow = false;
        }
        self.setState({ misrecursos, misrecursosoriginal: misrecursos });
      });
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  successAlert = txt => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Éxito"
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

  errorAlert = txt => {
    this.setState({
      alert: (
        <ReactBSAlert
          error
          style={{ display: "block", marginTop: "-100px" }}
          title="Error"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="error"
          confirmBtnText="Ok"
          btnSize=""
        >
          {txt}
        </ReactBSAlert>
      )
    });
  }

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  inputInicioFormat(cell, row) {
    if (row.id_solicitante !== null) {
      return cell.substring(0, 5);
    } else {
      return (
        <Input
          defaultValue={cell}
          type="time"
          id={"horaInicio" + row.i}
          name="horaInicio"
        />
      )
    }
  }

  txtNombre(cell, row) {
    return cell;
  }

  inputFinFormat(cell, row) {
    if (row.id_solicitante !== null) {
      return cell.substring(0, 5);
    } else {
      return (
        <Input
          defaultValue={cell}
          type="time"
          id={"horaFin" + row.i}
          name="horaFin"
        />
      )
    }
  }

  changeCB = (e, row) => {
    let self = this
    let datadisponibilidad = {
      id_usuario: self.recursoSession.id_recurso,
      id: row.id,
    }
    if (!$("#cb" + row.i).prop("checked")) {
      self.setState({ estadoDisponible: false });
      fetch(this.state.server + api_name + "/disponibilidades/" + row.id,
        {
          method: 'DELETE',
          body: JSON.stringify(datadisponibilidad),
          headers: { 'Content-Type': 'application/json' }
        }).then(function (response) { return response.json(); })
        .then(function (e_return) {
          self.successAlert(e_return[0].text);
        });
      return;
    } else if ($("#cb" + row.i).prop("checked") && ($("#horaInicio" + row.i).val() === '00:00' || $("#horaFin" + row.i).val() === '00:00'
      || ($("#horaInicio" + row.i).val() >= $("#horaFin" + row.i).val()))
    ) {
      self.errorAlert('La hora de fin debe ser mayor a la hora de inicio');
      $("#cb" + row.i).prop("checked", false);
      return;
    } else if ($("#cb" + row.i).prop("checked") && ($("#horaInicio" + row.i).val() !== '00:00' && $("#horaFin" + row.i).val() !== '00:00')
      && ($("#horaInicio" + row.i).val() < $("#horaFin" + row.i).val())
    ) {
      self.setState({ estadoDisponible: false });
      datadisponibilidad = {
        ...datadisponibilidad,
        id_recurso: row.id_recurso,
        is_active: true,
        estado: 'D',
        hora_inicio: $("#horaInicio" + row.i).val(),
        hora_fin: $("#horaFin" + row.i).val(),
        fecha: today,
        id: 0,
      }
      fetch(this.state.server + api_name + "/disponibilidades",
        {
          method: 'POST',
          body: JSON.stringify(datadisponibilidad),
          headers: { 'Content-Type': 'application/json' }
        }).then(function (response) { return response.json(); })
        .then(function (e_return) {
          self.setState({ estadoDisponible: true });
          self.successAlert(e_return[0].text);
          let mr = self.state.misrecursos;
          for (var i in mr) {
            if (mr[i].id_recurso === row.id_recurso) {
              mr[i].id = e_return[0].id;
              return;
            }
          }
        });
    }
  }

  checkBoxFormat = (cell, row) => {
    if (row.disponible) {
      if (row.id_solicitante != null && row.id_solicitante != '') {
        return (
          <label className="custom-toggle custom-toggle-success mr-1">
            <input defaultChecked type="checkbox" id={"cb" + row.i} disabled />
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
            <input defaultChecked type="checkbox" id={"cb" + row.i} onChange={e => this.changeCB(e, row)} />
            <span
              className="custom-toggle-slider rounded-circle"
              data-label-off="No"
              data-label-on="Si"
            />
          </label>)
      }
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

  filtrar = _ => {
    const { misrecursosoriginal, estrellas, perfil, id_actividad, id_cuenta, disponible } = this.state;
    var listaVariables = [];
    listaVariables.push({ value: estrellas, key: 'estrellas' });
    listaVariables.push({ value: perfil, key: 'perfil' });
    listaVariables.push({ value: id_actividad, key: 'id_actividad' });
    listaVariables.push({ value: id_cuenta, key: 'id_cuenta' });
    listaVariables.push({ value: disponible, key: 'disponible' });
    let misrecursosfiltrados = misrecursosoriginal.filter(function (recurso) {
      for (var i in listaVariables) {
        if (listaVariables[i].value !== '') {
          if (recurso[listaVariables[i].key] !== listaVariables[i].value) {
            return false;
          }
        }
      }
      return true;
    }
    );
    this.setState({ misrecursos: misrecursosfiltrados });
  }

  handleFilters = (e, id) => {
    e !== null ? this.setState({ [id]: e.value }) : this.setState({ [id]: '' });;
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    const misEquipos = this.state.misEquipos
    return (
      <>
        {this.state.alert}
        <SimpleHeader name="Mis Recursos" parentName="Inicio" toggleNavs={this.toggleNavs} />

        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.cvPersona}
          toggle={() => this.toggleModal("cvPersona")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="cvPersonaLabel">
              {this.state.recursoActual.id_recurso + ' - ' + this.state.recursoActual.nombres
                + ' ' + this.state.recursoActual.ape_paterno + ' ' + this.state.recursoActual.ape_materno}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("cvPersona")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
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
              value={this.state.recursoActual.cuenta}
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
                <Select options={this.state.cebes}
                  isClearable
                  isSearchable
                  placeholder="Centro de beneficio"
                  onChange={this.handleChangeCebe} />
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
                  starColor='#F29104'
                  name={"star"}
                  emptyStarColor='#9D9D9C'
                />
              </Col></Row>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("cvPersona")}
            >
              Cerrar
            </Button>
          </div>
        </Modal>

        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                  <Card>
                    <CardBody>
                      <ToolkitProvider
                        data={this.state.misrecursos}
                        keyField="id_recurso"
                        columns={[
                          { dataField: "nombre", text: "Nombre", sort: true, formatter: this.txtNombre },
                          { dataField: "cuenta", text: "Cuenta", sort: true, },
                          { dataField: "perfil", text: "Perfil", sort: true, },
                          { dataField: "horainicio", text: "Hora inicio", sort: true, formatter: this.inputInicioFormat, },
                          { dataField: "horafin", text: "Hora fin", sort: true, formatter: this.inputFinFormat, },
                          { dataField: "estrellas", text: "Calific", sort: true, formatter: this.rate, },
                          { dataField: "disponible", text: "", sort: true, formatter: this.checkBoxFormat },
                          { dataField: "id_solicitante", text: "Solicitante", sort: true, },
                          { dataField: "id_cuenta", text: "IdCuenta", hidden: true },
                        ]}
                        search
                      >
                        {props => (
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
                                    onChange={e => this.handleFilters(e, 'perfil')}
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
                                  <Select options={this.state.listDisponible} className="form-control-sm"
                                    isClearable
                                    isSearchable
                                    placeholder="Disponible"
                                    onChange={e => this.handleFilters(e, 'disponible')}
                                  />
                                </Col>
                                <Col>
                                  <Button
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
                                  </Button>
                                </Col>
                              </Row>
                              <Row><Col><span>&nbsp;</span></Col></Row>
                            </Container>
                            <BootstrapTable
                              ref={el => (this.componentRef = el)}
                              {...props.baseProps}
                              bootstrap4={true}
                              pagination={pagination}
                              bordered={false}
                              id="react-bs-table"
                            />
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
                              Ubicación
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

export default MisRecursos;
