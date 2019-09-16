import React from "react";
import logo from 'assets/img/brand/LOGO_RANSA_2.png';
import { Card, CardBody, Container, Row, Col } from "reactstrap";

class IndexHeader extends React.Component {

  redirect(){
    let self = this
    self.props.history.push('/admin/misdatos')
  }

  render() {
    return (
      <>
        <div className="header ransa-bg-info pt-5 pb-7">
          <Container>
            <div className="header-body">
              <Row className="align-items-center">
                <Col lg="6">
                  <div className="pr-5">
                    <img
                      className="navbar-brand-img"
                      src={logo}
                      alt=""
                      width="75%"
                      height="75%"
                    />
                    <h1 className="display-2 text-white font-weight-bold mb-0">
                      Portal de aplicaciones
                    </h1>
                    <p className="text-white mt-4">
                      Aqui podrás encontrar todas los sistemas necesarios para administrar tus operaciones diarias.
                    </p>
                  </div>
                </Col>
                <Col lg="6">
                  <Row className="pt-5">
                    <Col md="6">
                      <Card>
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Pool de recursos</h5>
                          <p>
                            Comparte personas y equipos entre almacenes.
                          </p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                          <div className="icon icon-shape ransa-bg-gradient-info text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Control de acceso</h5>
                          <p>
                            Crea citas para ingresar a las distintas sedes.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="pt-lg-5 pt-4" md="6">
                      <Card className="mb-4">
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Portal de extractivos</h5>
                          <p>
                            Revisa el estado de los clientes mineros, gas y petroleo.
                          </p>
                        </CardBody>
                      </Card>
                      <Card className="mb-4">
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-warning text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Portal de industriales</h5>
                          <p>
                            Revisa el estado de los clientes industriales
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
      </>
    );
  }
}

export default IndexHeader;
