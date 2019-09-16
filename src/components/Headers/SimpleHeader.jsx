import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col,
  // Alert
} from "reactstrap";

class TimelineHeader extends React.Component {
  constructor(props) {
    super(props);
    this.recursoSession = JSON.parse(sessionStorage.recursoSession);
    this.state = {
      color:''
    }
    // if(this.recursoSession.mensaje!=null&&this.recursoSession.mensaje!==''){
    //   this.state = {
    //     color:'danger'
    //   }
    // }
  }

  // <Alert color={this.state.color}><strong>{this.recursoSession.mensaje}</strong></Alert>
  render() {
    return (
      <>
        <div className="header pb-6">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <h6 className="h2 d-inline-block mb-0">{this.props.name}</h6>{" "}
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-md-4"
                    listClassName="breadcrumb-links"
                  >
                  </Breadcrumb>
                </Col>
                {/* <Col className="text-right" lg="6" xs="5">
                  <Button
                    className="btn-neutral"
                    color=""
                    href="#ransa"
                    onClick={e => this.props.toggleNavs(e, "tabs", 1)}
                    size="sm"
                  >
                    Personal
                  </Button>
                  <Button
                    className="btn-neutral"
                    color=""
                    href="#ransa"
                    onClick={e => this.props.toggleNavs(e, "tabs", 2)}
                    size="sm"
                  >
                    Equipos
                  </Button>
                </Col> */}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

TimelineHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string
};

export default TimelineHeader;
