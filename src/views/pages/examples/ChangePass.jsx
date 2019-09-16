import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";
import { server, api_name } from "variables/general.jsx";
import ReactBSAlert from "react-bootstrap-sweetalert";

class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misrecursos: [],
      server: server
    };
    sessionStorage.clear()
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
          Contraseña incorrecta. Vuelve a intentarlo o haz click en "Olvidé mi contraseña"
        </ReactBSAlert>
      )
    });
  }

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  acceder = _ => {
    let self = this
    var datalogin = {
      correo: this.state.email,
      clave: this.state.password
    };

    fetch(this.state.server + api_name + "/login",
      {
        method: 'POST',
        body: JSON.stringify(datalogin),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(function (data) {
        data  = JSON.parse(data);
        if (data.valido === true) {
          fetch(self.state.server + api_name + "/obtenerDatosPersonal/" + self.state.email.toUpperCase())
            .then(response => response.json())
            .then(function (rsp) {
              if (rsp !== null && rsp.length > 0) {
                sessionStorage.setItem('recursoSession', JSON.stringify(rsp[0]));
                self.props.history.push('/admin/misrecursos')
              } else {
                self.errorAlert();
              }
            });
        } else {
          self.errorAlert();
        }
      })
  }

  render() {
    return (
      <>
        {this.state.alert}
        <AuthHeader
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          onChange={this.handleFormChange}
                          name="email"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Contraseña actual"
                          type="password"
                          onFocus={() => this.setState({ focusedPassword: true })}
                          onBlur={() => this.setState({ focusedPassword: false })}
                          onChange={this.handleFormChange}
                          name="password"
                        />
                      </InputGroup>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Nueva contraseña"
                          type="password"
                          onFocus={() => this.setState({ focusedPassword: true })}
                          onBlur={() => this.setState({ focusedPassword: false })}
                          onChange={this.handleFormChange}
                          name="password2"
                        />
                      </InputGroup>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Repita la contraseña"
                          type="password"
                          onFocus={() => this.setState({ focusedPassword: true })}
                          onBlur={() => this.setState({ focusedPassword: false })}
                          onChange={this.handleFormChange}
                          name="password3"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="warning" type="button" onClick={this.acceder}>
                        Cambiar contraseña
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>              
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ChangePass;
