import React from "react";
import { Card, CardHeader,CardBody,Label, FormGroup, Form, Input, Container, Row, Col, InputGroup, InputGroupAddon,InputGroupText,Button,CardTitle,CardText } from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
class Solicitud extends React.Component {
  render() {
    return (
      <>
        <SimpleHeader name="Creación de Solicitud de alta" parentName="Forms" />
        <Container className="mt--6" fluid>
        <Card className="mb-4">
            <CardHeader>
              <h3 className="mb-0">Creación de Solicitud de Alta</h3>
            </CardHeader>
            <CardBody>
                <FormGroup>
                {/* className="row" */}
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Codigo Aprobador</Label>
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
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Código Jefe Directo</Label>
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
                        <Col md="4">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span><b>Datos del Requerimiento</b></span>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Descripción de Puesto</Label>
                        <Col md="2">
                        <Input type="select" name="select" id="exampleSelect" className="form-control-sm">
                            <option>Text 1</option>
                            <option>Text 2</option>
                        </Input>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-100px", marginTop:"-5px"}}>Cantidad de Recurso</Label>
                        <Col md="3">
                        <Input type="select" name="select" id="exampleSelect" className="form-control-sm" style={{width: "90%"}}>
                            <option>Text 1</option>
                            <option>Text 2</option>
                        </Input>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Modalidad</Label>
                        <Col md="2">
                        <Input type="select" name="select" id="exampleSelect" className="form-control-sm">
                            <option>Text 1</option>
                            <option>Text 2</option>
                        </Input>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Input type="text" name="" id="" className="form-control-sm" placeholder="Descripción de la modalidad" disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Fecha Estimada de Incio</Label>
                        <Col md="2">
                        <Input type="date" name="select" id="exampleSelect" className="form-control-sm"/>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{marginRight:"29px", marginTop:"-5px"}}>Plazo</Label>
                        <Col md="3">
                            <Input type="select" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" style={{width: "90%"}}>
                                <option>Text 1</option>
                                <option>Text 2</option>
                            </Input>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Equipo</Label>
                        <Col md="2">
                            <Card body style={{padding:"5px", margin:"5px"}}>
                                <FormGroup check style={{width:"90%"}}>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                    Check me out
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                    Check me out
                                </Label>
                                </FormGroup>
                            </Card>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{marginRight:"10px", marginTop:"-5px"}}>Acceso</Label>
                        <Col md="3">
                            <Card body style={{padding:"5px", margin:"5px"}}>
                                <FormGroup check style={{width:"90%"}}>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                    Check me out
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                    Check me out
                                </Label>
                                </FormGroup>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="7">
                            <span><b>Motivos que sustentan la Contratación</b></span>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="8">
                            <div style={{borderStyle: "dashed", padding:"10px", width:"93.5%"}}>
                            <Row>
                                <Col md="12">
                                    <Row>
                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"15px", marginTop:"-5px"}}>Nombre Cliente</Label>
                                        <Col md="3">
                                            <InputGroup>
                                                <Input className="form-control-sm" placeholder="" type="text"/>
                                            </InputGroup>
                                        </Col>
                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"0px", marginTop:"-5px"}}>Tiempo Estimado</Label>
                                        <Col md="4">
                                            <FormGroup>
                                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text"/>
                                            </FormGroup>
                                        </Col> 
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Row>
                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"15px", marginTop:"-5px"}}>Ventas Actuales (Volumen)</Label>
                                        <Col md="3">
                                            <InputGroup>
                                                <Input className="form-control-sm" placeholder="" type="text"/>
                                            </InputGroup>
                                        </Col>
                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"0px", marginTop:"-5px"}}>Motivo</Label>
                                        <Col md="4">
                                            <FormGroup>
                                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text"/>
                                            </FormGroup>
                                        </Col> 
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Row>
                                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"15px", marginTop:"-5px"}}>Venta Estimada (Volumen)</Label>
                                        <Col md="3">
                                            <InputGroup>
                                                <Input className="form-control-sm" placeholder="" type="text"/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="7">
                            <div style={{width:"100%"}}>
                                <div style={{float:"right", marginRight: "-55px"}}>
                                    <Button color="warning" className="btn btn-sm">Limpiar</Button>
                                    <Button color="success" className="btn btn-sm">Guardar</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                </FormGroup>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}
export default Solicitud;
