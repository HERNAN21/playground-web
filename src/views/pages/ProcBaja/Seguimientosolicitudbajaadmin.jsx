import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

class Seguimientosolicitudbajaadmin extends React.Component {
    render() {
        return (
            <>
             <SimpleHeader name="Seguimiento de Solicitud de Baja" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-150px", marginTop:"-5px"}}>Nro. Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text"/>
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}}/>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Creador de Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text"/>
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}}/>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                        </CardHeader>
                        <br/>
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Table className="align-items-center table-flush" responsive size="sm">
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{textAlign:"center"}}>Nro. Solicitud</th>
                                                <th style={{textAlign:"center"}}>Código Tabajador</th>
                                                <th style={{textAlign:"center"}}>Estado</th>
                                                <th style={{textAlign:"center"}}>Fecha Creación</th>
                                                <th style={{textAlign:"center"}}>Descripción de Puesto</th>
                                                <th style={{textAlign:"center"}}>Jefe Directo</th>
                                                <th style={{textAlign:"center"}}>Fecha de Cese</th>
                                                <th style={{textAlign:"center"}}>Ubicación</th>
                                                <th style={{textAlign:"center"}}>Tiempo faltante <br/> para cierre</th>
                                                <th style={{textAlign:"center"}}>¿Actualizar Estado? </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-user">
                                                    <a className="font-weight-bold" href="#pablo" onClick={this.ModalRemoneracion}>100{this.props.buttonLabel}</a>
                                                </td>
                                                <td className="table-user">
                                                    <b> 000001</b>
                                                </td>
                                                <td className="table-user">
                                                    <Input type="select" className="form-control-sm">
                                                        <option >Option 1</option>
                                                    </Input>
                                                </td>
                                                <td className="table-user">
                                                    <b>Test Test</b>
                                                </td>
                                                <td>
                                                    Descripcion
                                                </td>
                                                <td className="table-user">
                                                    <b>02/09/2019</b>
                                                </td>
                                                <td>
                                                    Sede San jose
                                                </td>
                                                <td style={{textAlign:"right"}}>
                                                    Lugar
                                                </td>
                                                <td>
                                                    02:00
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <Button className="btn btn-sm" color="success">Actualizar</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{marginTop:"40px", marginLeft:"50px" }}>
                                    <span> <b> Resumen de Respuesta</b></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{marginTop:"15px", marginLeft:"50px" }}>
                                    <span> <b> Solicitud 100</b></span>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md="4">
                                    <Table className="align-items-center table-flush" responsive size="sm">
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{width:"10%"}}>Área Encargada</th>
                                                <th style={{width:"90%"}}>Respuesta</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><b>Concesionario</b></td>
                                                <td style={{textAlign:"left"}}>asd</td>
                                            </tr>
                                            <tr>
                                                <td><b>Otro</b></td>
                                                <td>asd</td>
                                            </tr>
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td>100000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    {/* <CardFooter>
                    </CardFooter> */}
                </Card>
            </Container>
        </>
    );
  }
}

export default Seguimientosolicitudbajaadmin;