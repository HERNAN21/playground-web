import React from "react";
import { Card, CardHeader,CardBody,Label, FormGroup, Form, Input, Container, Row, Col, InputGroup, InputGroupAddon,InputGroupText,Button,CardTitle,CardText } from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
class Requerimiento extends React.Component {
  render() {
    return (
      <>
        <SimpleHeader name="Datos de Requerimiento" parentName="Forms" />
        <Container className="mt--6" fluid>
        <Card className="mb-4">
            <CardHeader>
              {/* <h3 className="mb-0">Creación de Solicitud de Alta</h3> */}
            </CardHeader>
            <CardBody>
                <FormGroup>
                {/* className="row" */}
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Codigo Aprobador</Label>
                        <Col md="2">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" disabled/>
                            </InputGroup>
                        </Col>
                        <Col md="5">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Código Jefe Directo</Label>
                        <Col md="2">
                            <InputGroup>
                                <Input className="form-control-sm" placeholder="" type="text" disabled/>
                            </InputGroup>
                        </Col>
                        <Col md="5">
                            <FormGroup>
                                <Input className="form-control-sm" id="example3cols1Input" placeholder="" type="text" disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Descripción de Puesto</Label>
                        <Col md="2">
                            <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled/>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-80px", marginTop:"-5px"}}>Cantidad de Recurso</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input type="text" name="select" id="exampleSelect" className="form-control-sm" style={{width: "90%"}} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Modalidad</Label>
                        <Col md="2">
                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled />
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginTop:"-10px"}}>Especificación de la Modalidad Contractual </Label>
                        <Col md="3">
                            <FormGroup>
                                <Input type="text" name="" id="" className="form-control-sm"  disabled/>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Fecha Estimada de Incio</Label>
                        <Col md="2">
                        <Input type="date" name="select" id="exampleSelect" className="form-control-sm" disabled/>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{marginRight:"49px", marginTop:"-5px"}}>Plazo</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input type="text" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" style={{width: "90%"}} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Equipo</Label>
                        <Col md="2">
                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled/>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="1" style={{marginRight:"49px", marginTop:"-5px"}}>Accesos</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input type="text" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" style={{width: "90%"}} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-70px", marginTop:"-5px"}}>Tipo de Contratacion</Label>
                        <Col md="2">
                        <Input type="text" name="select" id="exampleSelect" className="form-control-sm" disabled/>
                        </Col>
                        <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-84px", marginTop:"-5px"}}>Motivo / sustento</Label>
                        <Col md="4">
                            <FormGroup>
                                <Input type="text" name="select" id="exampleSelect" bsSize="sm" className="form-control-sm" style={{width: "90%"}} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md="9">
                            <div style={{borderStyle: "dashed", padding:"10px", width:"93.5%"}}>
                            <Row>
                                <Col md="12">
                                    <Row>
                                        {/* <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginTop:"-5px"}}>Nombre Cliente</Label> */}
                                        <Col md="4">
                                            <Label>Nombre Cliente</Label>
                                            <InputGroup>
                                                <Input className="form-control-sm" placeholder="" type="text" disabled/>
                                            </InputGroup>
                                        </Col>
                                        
                                        {/* <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"15px", marginTop:"-5px"}}>Ventas Actuales (Volumen)</Label> */}
                                        <Col md="4">
                                            <Label>Ventas Actuales (Volumen)</Label>
                                            <InputGroup>
                                                <Input className="form-control-sm" placeholder="" type="text" disabled/>
                                            </InputGroup>
                                        </Col>
                                        {/* <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"15px", marginTop:"-5px"}}>Venta Estimada (Volumen)</Label> */}
                                        <Col md="4">
                                            <Label>Venta Estimada (Volumen)</Label>
                                            <InputGroup>
                                                <Input className="form-control-sm" placeholder="" type="text" disabled/>
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
export default Requerimiento;
