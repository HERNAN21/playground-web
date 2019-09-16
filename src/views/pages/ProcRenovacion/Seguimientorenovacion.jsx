import React from "react";
// Reactstrap
import {Button, Container,Card,CardHeader, CardBody, CardFooter,Row, Label, Col, Input, InputGroup,InputGroupText, InputGroupAddon, Table} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
class Seguimientorenovacion extends React.Component{
    render(){
        return (
            <>
                <SimpleHeader name="Seguimiento de Renovaciones" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}> 
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-120px", marginTop:"-5px"}}>Código Trabajador</Label>
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
                                <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Nombres y Apellidos</Label>
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
                                <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Fecha Fin de Contrata</Label>
                                <Col md="2">
                                    <InputGroup>
                                        <Input className="form-control-sm" placeholder="" type="date"/>
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
                                                <th style={{textAlign:"center", width:"3%"}}>Código <br/> Tabajador</th>
                                                <th style={{textAlign:"center", width:"5%"}}>Tipo <br/> Documento</th>
                                                <th style={{textAlign:"center", width:"5%"}}>Núm. <br/> Documento</th>
                                                <th style={{textAlign:"center", width:"5%"}}>Nombres y Apellidos</th>
                                                <th style={{textAlign:"center", width:"3%"}}>Área</th>
                                                <th style={{textAlign:"center", width:"5%"}}>Descripción <br/> de Puesto</th>
                                                <th style={{textAlign:"center", width:"3%"}}>Tiempo de <br/> Servicio</th>
                                                <th style={{textAlign:"center", width:"3%"}}>Fecha Fin <br/> de Contrato</th>
                                                <th style={{textAlign:"center", width:"3%"}}>Periodo</th>
                                                <th style={{textAlign:"center", width:"2%"}}>¿Renovar Contrata? </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>10000</td>
                                                <td>DNI</td>
                                                <td>70543925</td>
                                                <td>Test Test</td>
                                                <td>TI</td>
                                                <td>Analista</td>
                                                <td>5 Años</td>
                                                <td>01/01/2019</td>
                                                <td>30 Dias</td>
                                                <td>
                                                    <Label className="custom-toggle">
                                                        <Input defaultChecked type="checkbox" name="aprobacionvic" onClick={this.AprobacionVicepresidencia}/>
                                                        <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes"/>
                                                    </Label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md="12">
                                    <div style={{width:"100%"}}>
                                        <div style={{float:"right"}}>
                                            <Button color="warning" className="btn btn-sm">Limpiar</Button>
                                            <Button color="success" className="btn btn-sm">Confirmar</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Container>
            </>
        );
    }

}

export default Seguimientorenovacion;
