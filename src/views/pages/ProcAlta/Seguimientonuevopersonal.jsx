import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

class Seguimientonuevopersonal extends React.Component {
   
    render() {
        return (
            <>
             <SimpleHeader name="Seguimiento de Nuevo Personal" parentName="Tables" />
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
                            <Table className="align-items-center table-flush" responsive size="sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Nro. Solicitud</th>
                                        <th>Estado</th>
                                        <th>Fecha De Creacion</th>
                                        <th>Descripcion de Puesto</th>
                                        <th>Cantidad de Recursos</th>
                                        <th>Fecha Ingreso</th>
                                        <th>Ubicación</th>
                                        <th>Equipos y Accesos</th>
                                        <th>Archivo de Personal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="table-user">
                                            <a className="font-weight-bold" href="#pablo" onClick={this.ModalRemoneracion}>100{this.props.buttonLabel}</a>
                                        </td>
                                        <td className="table-user">
                                            <Input type="select" className="form-control-sm">
                                                <option>Opciotn 1</option>
                                            </Input>
                                        </td>
                                        <td className="table-user">
                                            <b>28/08/2019</b>
                                        </td>
                                        <td className="table-user">
                                            <b>Colaborador</b>
                                        </td>
                                        <td>
                                            1
                                        </td>
                                        <td className="table-user">
                                            <b>Analista</b>
                                        </td>
                                        <td>
                                            Sede San jose
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <Button className="btn btn-sm" color="primary">
                                                <span> Ver Detalle </span> 
                                                <i class="fa fa-info" aria-hidden="true"></i>
                                            </Button>
                                        </td>
                                        <th>
                                            <Button className="btn btn-sm" color="info">
                                                <span> Documentos </span> 
                                                <i class="fa fa-file" aria-hidden="true"></i>
                                            </Button>
                                        </th>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="11">
                            </Col>
                            <Col md="1">
                                <InputGroup>
                                    <Button className="btn btn-sm" color="success">
                                        Actualizar Estado
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Container>
            
        </>
    );
  }
}

export default Seguimientonuevopersonal;