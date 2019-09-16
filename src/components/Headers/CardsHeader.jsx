import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

class CardsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    this.state = {
      color:''
    }
    if(this.recursoSession.mensaje!=null&&this.recursoSession.mensaje!==''){
      this.state = {
        color:'danger'
      }
    }
  }
  render() {
    return (
      <>
        <div className="header ransa-bg-info pb-6">
          <Container fluid>
          {/* <Alert color={this.state.color}><strong>{this.recursoSession.mensaje}</strong></Alert> */}
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <h6 className="h2 text-white d-inline-block mb-0">
                    {this.props.name}
                  </h6>{" "}
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-md-4"
                    listClassName="breadcrumb-links breadcrumb-dark"
                  >
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {this.props.parentName}
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active">
                      {this.props.name}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
              {/* <Row>
                <Col md="6" xl="3">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Cantidad de personas
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            169
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-active-40" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-error mr-2">
                          <i className="fa fa-arrow-down" /> 1%
                        </span>{" "}
                        <span className="text-nowrap">Desde el mes anterior</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Cantidad de equipos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            20
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                            <i className="ni ni-chart-pie-35" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3%
                        </span>{" "}
                        <span className="text-nowrap">Desde el mes anterior</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Recursos prestados
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">21</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-money-coins" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Desde el mes anterior</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Calificación
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            4.52
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                            <i className="ni ni-chart-bar-32" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 10%
                        </span>{" "}
                        <span className="text-nowrap">Desde el mes pasado</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string
};

export default CardsHeader;
