import React from "react";
import Chart from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Button } from "reactstrap";
import CardsHeader from "components/Headers/CardsHeader.jsx";
import ReactExport from "react-data-export";
import Select from 'react-select'
import ReactDatetime from "react-datetime";
import {
  chartOptions,
  parseOptions,
} from "variables/charts.jsx";
import { server, api_name, inicio_mes, fin_mes } from "variables/general.jsx";
// import BlockUi from 'react-block-ui';
// import 'react-block-ui/style.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Informes extends React.Component {
  constructor(props) {
    super(props);
    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    this.state = {
      misrecursos: [],
      misequipos: [],
      solOfre: [],
      server: server,
      horasAlmacen: [],
      horAlmLbl: [],
      horAlmVal: [],
      horasAlmacenSolicitado: [],
      horAlmLblSolicitado: [],
      horAlmValSolicitado: [],
      horPueLbl: [],
      horPueVal: [],
      horPueLblSolicitado: [],
      horPueValSolicitado: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      startDate: inicio_mes,
      endDate: fin_mes,
      almacen: 0,
      // blocking: true,
    };

    fetch(this.state.server + api_name + "/ubicaciones/" + this.recursoSession.id_recurso + "/ALM")
      .then(response => response.json())
      .then(almacenes => this.setState({ almacenes }));

    fetch(this.state.server + api_name + "/repGetMiPersonal/" + this.recursoSession.id_recurso)
      .then(response => response.json())
      .then(misrecursos => this.setState({ misrecursos }));

    fetch(this.state.server + api_name + "/repGetMiEquipo/" + this.recursoSession.id_recurso)
      .then(response => response.json())
      .then(misequipos => this.setState({ misequipos }));

    fetch(this.state.server + api_name + "/repGetSolOfre/" + this.recursoSession.id_recurso)
      .then(response => response.json())
      .then(solOfre => this.setState({ solOfre }));

    this.filtrar();
  }

  // toggleBlocking() {
  //   this.setState({ blocking: !this.state.blocking });
  // }

  filtrar = _ => {

    var dateStart = this.state.startDate.length === 10 ? this.state.startDate : (this.state.startDate._d).getDate();
    var monthStart = this.state.startDate.length === 10 ? this.state.startDate : (this.state.startDate._d).getMonth();
    var yearStart = this.state.startDate.length === 10 ? this.state.startDate : (this.state.startDate._d).getFullYear();

    var dateEnd = this.state.endDate.length === 10 ? this.state.endDate : (this.state.endDate._d).getDate();
    var monthEnd = this.state.endDate.length === 10 ? this.state.endDate : (this.state.endDate._d).getMonth();
    var yearEnd = this.state.endDate.length === 10 ? this.state.endDate : (this.state.endDate._d).getFullYear();

    let start = this.state.startDate.length === 10 ? this.state.startDate : (yearStart) + '-' + (monthStart > 9 ? monthStart + 1 : '0' + (monthStart + 1)) + '-' + (dateStart < 9 ? '0' + dateStart : dateStart);
    let end = this.state.endDate.length === 10 ? this.state.endDate : (yearEnd) + '-' + (monthEnd > 9 ? monthEnd + 1 : '0' + (monthEnd + 1)) + '-' + (dateEnd < 9 ? '0' + dateEnd : dateEnd);

    let self = this;
    fetch(this.state.server + api_name + "/horasAlmacenPrestado/" + this.recursoSession.id_recurso + "/" + this.state.almacen + "/" + start + "/" + end)
      .then(response => response.json())
      .then(function (horasAlmacen) {
        var horAlmVal = [], horAlmLbl = []
        for (var i in horasAlmacen) {
          horAlmVal.push(horasAlmacen[i].value);
          horAlmLbl.push(horasAlmacen[i].label);
        }
        self.setState({ horAlmVal, horAlmLbl });
      });

    fetch(this.state.server + api_name + "/horasAlmacenSolicitado/" + this.recursoSession.id_recurso + "/" + this.state.almacen + "/" + start + "/" + end)
      .then(response => response.json())
      .then(function (data) {
        var horAlmValSolicitado = [], horAlmLblSolicitado = []
        for (var i in data) {
          horAlmValSolicitado.push(data[i].value);
          horAlmLblSolicitado.push(data[i].label);
        }
        self.setState({ horAlmValSolicitado, horAlmLblSolicitado });
      });

    fetch(this.state.server + api_name + "/horasPuestoPrestado/" + this.recursoSession.id_recurso + "/" + this.state.almacen + "/" + start + "/" + end)
      .then(res => res.json())
      .then(function (data) {
        var horPueLbl = [], horPueVal = []
        for (var i in data) {
          horPueLbl.push(data[i].value);
          horPueVal.push(data[i].label);
        }
        self.setState({ horPueLbl, horPueVal: horPueVal });
      });

    fetch(this.state.server + api_name + "/horasPuestoSolicitado/" + this.recursoSession.id_recurso + "/" + this.state.almacen + "/" + start + "/" + end)
      .then(res => res.json())
      .then(function (data) {
        var horPueLblSolicitado = [], horPueValSolicitado = []
        for (var i in data) {
          horPueLblSolicitado.push(data[i].value);
          horPueValSolicitado.push(data[i].label);
        }
        self.setState({ horPueLblSolicitado, horPueValSolicitado });
      });

    fetch(this.state.server + api_name + "/horasDesempPerso/" + this.recursoSession.id_recurso + "/" + this.state.almacen + "/" + start + "/" + end)
      .then(res => res.json())
      .then(function (data) {
        var data1 = [], data2 = [], data3 = [], data4 = []
        for (var i in data) {
          data1.push(data[i].label);
          data2.push(data[i].value1);
          data3.push(data[i].value2);
          data4.push(data[i].value3);
        }
        self.setState({ data1, data2, data3, data4 });
      })
  }

  changeAlmacen = (e) => {
    let val = 0;
    if (e !== null) {
      val = e.value;
    }
    this.setState({ almacen: val });
  }

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

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

  handleReactDatetimeChange = (who, date) => {
    this.setState({
      [who]: date
    });
  };

  render() {

    var colors = {
      gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529"
      },
      theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340",

        green: "#009B3A",
        orange: "#F29104"
      },
      black: "#12263F",
      white: "#FFFFFF",
      transparent: "transparent"
    };


    const chartExample6 = {
      data: {
        labels: this.state.horPueVal,
        datasets: [
          {
            data: this.state.horPueLbl,
            backgroundColor: [
              colors.theme["danger"],
              colors.theme["warning"],
              colors.theme["success"],
              colors.theme["primary"],
              colors.theme["info"]
            ],
            label: "Datos"
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    const chartExample66 = {
      data: {
        labels: this.state.horPueValSolicitado,
        datasets: [
          {
            data: this.state.horPueLblSolicitado,
            backgroundColor: [
              colors.theme["danger"],
              colors.theme["warning"],
              colors.theme["success"],
              colors.theme["primary"],
              colors.theme["info"]
            ],
            label: "Datos"
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    let chartExample2 = {
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                color: colors.gray[200],
                zeroLineColor: colors.gray[200]
              },
              ticks: {
                callback: function (value) {
                  if (!(value % 10)) {
                    return value;
                  }
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function (item, data) {
              var label = data.datasets[item.datasetIndex].label || "";
              var yLabel = item.yLabel;
              var content = "";
              if (data.datasets.length > 1) {
                content += label;
              }
              content += yLabel;
              return content;
            }
          }
        }
      },
      data: {
        labels: this.state.horAlmLbl,
        datasets: [
          {
            label: "Horas recibidas",
            data: this.state.horAlmVal
          }
        ]
      }
    };

    let chartExample22 = {
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                color: colors.gray[200],
                zeroLineColor: colors.gray[200]
              },
              ticks: {
                callback: function (value) {
                  if (!(value % 10)) {
                    return value;
                  }
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function (item, data) {
              var label = data.datasets[item.datasetIndex].label || "";
              var yLabel = item.yLabel;
              var content = "";
              if (data.datasets.length > 1) {
                content += label;
              }
              content += yLabel;
              return content;
            }
          }
        }
      },
      data: {
        labels: this.state.horAlmLblSolicitado,
        datasets: [
          {
            label: "Horas entregadas",
            data: this.state.horAlmValSolicitado
          }
        ]
      }
    };

    let desPersonal = {
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                color: colors.gray[200],
                zeroLineColor: colors.gray[200]
              },
              ticks: {
                callback: function (value) {
                  if (!(value % 10)) {
                    return value;
                  }
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function (item, data) {
              var label = data.datasets[item.datasetIndex].label || "";
              var yLabel = item.yLabel;
              var content = "";
              if (data.datasets.length > 1) {
                content += label;
              }
              content += yLabel;
              return content;
            }
          }
        }
      },
      data: {
        labels: this.state.data1,
        datasets: [{
          label: 'Horas trabajadas',
          data: this.state.data2,
          backgroundColor: "primary"
        }, {
          label: 'Calificacion ',
          data: this.state.data3,
          backgroundColor: "green"
        }, {
          label: 'Calificacion ponderada ',
          data: this.state.data4,
          borderColor: "orange",
          type: 'line'
        }],
      }
    };

    return (
      <>
        <CardsHeader name="Informes" parentName="Informes" />
        <Container className="mt--6" fluid>
          {/* <Row>
            <Col> */}
          {/* <BlockUi tag="div" blocking={this.state.blocking} message="Tiene solicitudes pendientes de cierre"> */}
          <Card>
            <CardHeader>Filtros</CardHeader>
            <CardBody>
              <Row><Col>
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
                    onChange={this.changeAlmacen} />
                </FormGroup>
              </Col></Row>
              <Row className="input-daterange datepicker align-items-center">
                <Col xs={12} sm={6}>
                  <label className=" form-control-label">
                    Fecha de inicio
                          </label>
                  <FormGroup>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Fecha de inicio"
                      }}
                      value={this.state.startDate}
                      timeFormat={false}
                      dateFormat="YYYY-MM-DD"
                      onChange={e =>
                        this.handleReactDatetimeChange("startDate", e)
                      }
                      renderDay={(props, currentDate, selectedDate) => {
                        let classes = props.className;
                        classes += this.getClassNameReactDatetimeDays(
                          currentDate
                        );
                        return (
                          <td {...props} className={classes}>
                            {currentDate.date()}
                          </td>
                        );
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6}>
                  <FormGroup>
                    <label className=" form-control-label">
                      Fecha de fin
                            </label>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Fecha de fin"
                      }}
                      value={this.state.endDate}
                      timeFormat={false}
                      dateFormat="YYYY-MM-DD"
                      onChange={e =>
                        this.handleReactDatetimeChange("endDate", e)
                      }
                      renderDay={(props, currentDate, selectedDate) => {
                        let classes = props.className;
                        classes += this.getClassNameReactDatetimeDays(
                          currentDate
                        );
                        return (
                          <td {...props} className={classes}>
                            {currentDate.date()}
                          </td>
                        );
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6}>
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
            </CardBody>
          </Card>
          {/* </Col>
          </Row> */}
          <Row>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Horas recibidas</h6>
                  <h5 className="h3 mb-0">Detalle por almacén</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Horas entregadas</h6>
                  <h5 className="h3 mb-0">Detalle por almacén</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample22.data}
                      options={chartExample22.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Horas recibidas</h6>
                  <h5 className="h3 mb-0">Detalle por puesto</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Pie
                      data={chartExample6.data}
                      options={chartExample6.options}
                      className="chart-canvas"
                      id="chart-pie"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Horas entregadas</h6>
                  <h5 className="h3 mb-0">Detalle por puesto</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Pie
                      data={chartExample66.data}
                      options={chartExample66.options}
                      className="chart-canvas"
                      id="chart-pie"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Personal</h6>
                  <h5 className="h3 mb-0">Rendimiento</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={desPersonal.data}
                      options={desPersonal.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Personal</h6>
                  <h5 className="h3 mb-0">Recursos disponibles</h5>
                </CardHeader>
                <CardBody>
                  <ExcelFile element={<button>Detalle del Personal</button>}>
                    <ExcelSheet data={this.state.misrecursos} name="Mi personal">
                      <ExcelColumn label="Código" value="id_recurso" />
                      <ExcelColumn label="Nombres" value="nombres" />
                      <ExcelColumn label="Apellido paterno" value="ape_paterno" />
                      <ExcelColumn label="Apellido materno" value="ape_materno" />
                      <ExcelColumn label="Correo" value="correo" />
                      <ExcelColumn label="Perfil" value="perfil" />
                      <ExcelColumn label="Actividad" value="actividad" />
                      <ExcelColumn label="Centro de costo" value="centro_costo" />
                      <ExcelColumn label="Centro de beneficio" value="centro_beneficio" />
                      {/* <ExcelColumn label="Estado" value="estado" /> */}
                      <ExcelColumn label="Horas acumuladas" value="hora_acumulada" />
                      <ExcelColumn label="Calificacion acumulada" value="calificacion_acumulada" />
                      <ExcelColumn label="Cantidad de calificaciones" value="cant_calificacion" />

                      {/* <ExcelColumn label="Código de sup. cuenta" value="supcu" />
                        <ExcelColumn label="Nombre de sup. cuenta" value="supcu_nombre" />
                        <ExcelColumn label="Apellido paterno sup. cuenta" value="supcu_paterno" />
                        <ExcelColumn label="Apellido materno sup. cuenta" value="supcu_materno" />

                        <ExcelColumn label="Código de sup. operaciones" value="supop" />
                        <ExcelColumn label="Nombre de sup. operaciones" value="supop_nombre" />
                        <ExcelColumn label="Apellido paterno sup. operaciones" value="supop_paterno" />
                        <ExcelColumn label="Apellido materno sup. operaciones" value="supop_materno" /> */}

                      <ExcelColumn label="Código de jefe" value="jefe" />
                      <ExcelColumn label="Nombre de jefe" value="jefe_nombre" />
                      <ExcelColumn label="Apellido paterno jefe" value="jefe_paterno" />
                      <ExcelColumn label="Apellido materno jefe" value="jefe_materno" />

                      {/* <ExcelColumn label="Código de sub gerente" value="subge" />
                        <ExcelColumn label="Nombre de sub gerente" value="subge_nombre" />
                        <ExcelColumn label="Apellido paterno sub gerente" value="subge_paterno" />
                        <ExcelColumn label="Apellido materno sub gerente" value="subge_materno" /> */}

                      <ExcelColumn label="Almacen" value="almacen" />
                      <ExcelColumn label="Cuenta" value="cuenta" />
                    </ExcelSheet>
                  </ExcelFile>
                  <br></br><br></br>
                  <ExcelFile element={<button>Detalle de Solicitudes</button>}>
                    <ExcelSheet data={this.state.solOfre} name="Mis solicitudes">
                      <ExcelColumn label="N° Solicitud" value="id" />
                      <ExcelColumn label="Código" value="id_recurso" />
                      <ExcelColumn label="Nombres" value="nombres" />
                      <ExcelColumn label="Apellido paterno" value="ape_paterno" />
                      <ExcelColumn label="Apellido materno" value="ape_materno" />
                      <ExcelColumn label="Correo" value="correo" />
                      <ExcelColumn label="Perfil" value="perfil" />
                      <ExcelColumn label="Actividad" value="o_actividad" />
                      <ExcelColumn label="Centro de costo" value="centro_costo" />
                      <ExcelColumn label="Centro de beneficio" value="centro_beneficio" />
                      {/* <ExcelColumn label="Estado" value="estado" /> */}
                      <ExcelColumn label="Horas acumuladas" value="hora_acumulada" />
                      <ExcelColumn label="Calificacion acumulada" value="calificacion_acumulada" />
                      <ExcelColumn label="Cantidad de calificaciones" value="cant_calificacion" />

                      {/* <ExcelColumn label="Código de sup. cuenta" value="supcu" />
                        <ExcelColumn label="Nombre de sup. cuenta" value="supcu_nombre" />
                        <ExcelColumn label="Apellido paterno sup. cuenta" value="supcu_paterno" />
                        <ExcelColumn label="Apellido materno sup. cuenta" value="supcu_materno" />

                        <ExcelColumn label="Código de sup. operaciones" value="supop" />
                        <ExcelColumn label="Nombre de sup. operaciones" value="supop_nombre" />
                        <ExcelColumn label="Apellido paterno sup. operaciones" value="supop_paterno" />
                        <ExcelColumn label="Apellido materno sup. operaciones" value="supop_materno" /> */}

                      <ExcelColumn label="Código de jefe" value="jefe" />
                      <ExcelColumn label="Nombre de jefe" value="jefe_nombre" />
                      <ExcelColumn label="Apellido paterno jefe" value="jefe_paterno" />
                      <ExcelColumn label="Apellido materno jefe" value="jefe_materno" />

                      {/* <ExcelColumn label="Código de sub gerente" value="subge" />
                        <ExcelColumn label="Nombre de sub gerente" value="subge_nombre" />
                        <ExcelColumn label="Apellido paterno sub gerente" value="subge_paterno" />
                        <ExcelColumn label="Apellido materno sub gerente" value="subge_materno" /> */}

                      <ExcelColumn label="Almacen origen" value="almacen" />
                      <ExcelColumn label="Cuenta origen" value="cuenta" />
                      <ExcelColumn label="Fecha solicitud" value="fecha" />
                      <ExcelColumn label="Hora inicio disponible" value="hora_inicio" />
                      <ExcelColumn label="Hora fin disponible" value="hora_fin" />
                      {/* <ExcelColumn label="Ubicacion actual" value="id_ubicacion_actual" /> */}
                      <ExcelColumn label="Ubicacion destino" value="d_ubicacion_destino" />

                      <ExcelColumn label="Código ofertante" value="id_ofertante" />
                      <ExcelColumn label="Nombre ofertante" value="desc_ofertante" />

                      <ExcelColumn label="Código solicitante" value="id_solicitante" />
                      <ExcelColumn label="Nombre solicitante" value="desc_solicitante" />

                      <ExcelColumn label="Estado disponibilidad" value="id_disponibilidad" />
                      <ExcelColumn label="Cuenta destino" value="d_cuenta_destino" />
                      <ExcelColumn label="Calificacion" value="calificacion" />
                      <ExcelColumn label="Comentario" value="d_comentario" />
                      <ExcelColumn label="Hora real inicio" value="hora_real_inicio" />
                      <ExcelColumn label="Hora real fin" value="hora_real_fin" />
                      <ExcelColumn label="Actividad destino" value="d_actividad" />
                      <ExcelColumn label="Hora total plan" value="hora_total_plan" />
                      <ExcelColumn label="Hora total real" value="hora_total_real" />
                      <ExcelColumn label="CeCo destino" value="d_ceco" />
                      <ExcelColumn label="CeBe destino" value="d_cebe" />
                    </ExcelSheet>
                  </ExcelFile>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h6 className="surtitle">Equipos</h6>
                  <h5 className="h3 mb-0">Equipos disponibles</h5>
                </CardHeader>
                <CardBody>
                  <ExcelFile element={<button>Detalle de equipos</button>}>
                    <ExcelSheet data={this.state.misequipos} name="Mis equipos">
                      <ExcelColumn label="Tipo de recurso" value="tipo_recurso" />
                      <ExcelColumn label="Código equipo" value="codigo_equipo" />
                      <ExcelColumn label="Descripción equipo" value="descripcion_equipo" />
                      <ExcelColumn label="Tipo equipo" value="tipo_equipo" />
                      <ExcelColumn label="Código" value="id_personal" />
                      <ExcelColumn label="Nombre" value="nombre_personal" />
                      <ExcelColumn label="Cuenta" value="cuenta" />
                      <ExcelColumn label="Almacen" value="almacen" />
                      <ExcelColumn label="Centro de costo" value="ceco" />
                    </ExcelSheet>
                  </ExcelFile>
                  <br></br><br></br>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* </BlockUi> */}
        </Container>
      </>
    );
  }
}
export default Informes;
