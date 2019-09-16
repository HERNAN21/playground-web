import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

import { server, api_name, estado_proceso_de_altas } from "variables/general.jsx";

var  format = require("date-format");

class Aprobaciones extends React.Component {
    constructor (props){
        super(props)

        this.state={
            server:server,
            solicitud_aprobaciones:[],
            data_buscar:{
                num_solicitud:'',
                estado:''
            },
            estado: false,
        }
        this.cargarData=this.cargarData.bind(this);
        // this.cargarData=this.cargarData(this);

    }

    cargarData=(e)=>{
        fetch(this.state.server + api_name+ '/aprobacionespendientes',{
            method: 'POST',
            body: JSON.stringify(this.state.data_buscar),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                for (let i = 0; i < data.result.length; i++) {
                    console.log(estado_proceso_de_altas);
                    data.result[i].estado_des1=false;
                    if (data.result[i].estado==1) {
                        data.result[i].estado_des=estado_proceso_de_altas[0].value;
                        data.result[i].estado=false;    
                    }else if(data.result[i].estado==2){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[1].value;
                    }else if(data.result[i].estado==3){
                        data.result[i].estado=false;
                        data.result[i].estado_des=estado_proceso_de_altas[2].value;
                        data.result[i].estado_des1=true;
                    }else if(data.result[i].estado==4){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[3].value;
                    }else if(data.result[i].estado==5){
                        data.result[i].estado=false;
                        data.result[i].estado_des=estado_proceso_de_altas[4].value;
                    }else if(data.result[i].estado==6){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[5].value;
                    }else if(data.result[i].estado==7){
                        data.result[i].estado=false;
                        data.result[i].estado_des=estado_proceso_de_altas[6].value;
                        data.result[i].estado_des1=true;
                    } else if(data.result[i].estado==11){
                        data.result[i].estado=true;
                        data.result[i].estado_des=estado_proceso_de_altas[10].value;
                    }
                }
                this.setState({solicitud_aprobaciones:data.result})
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))
    }

    buscarNumeroSolicitud=(e)=>{
        var values=e.target.value;
        this.state.data_buscar.num_solicitud=values;
        this.cargarData();
        this.forceUpdate();
    }

    bucarEstado=(e)=>{
        var values=e.target.value;
        this.state.data_buscar.estado=values;
        this.cargarData();
        this.forceUpdate();
    }

    updateEstado=(e, id)=>{

        var rechazado=e.target.name;
        var estado_name=e.target.name;
        var estado=2;
        
        if (estado_name=='estado') {
            if (e.target.checked==false) {
                estado=1;
            }
        }

        if (rechazado=='rechazado') {
            estado=1;    
            if (e.target.checked==true) {
                estado=3;
            }
            console.log(estado);
        }

        
        const data_update={
            id_solicitud: id,
            estado: estado
        }
        
        fetch(this.state.server + api_name+'/updatestatus',{
            method: 'PUT',
            body: JSON.stringify(data_update),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function (data) {
            if (data.respuesta=='success') {
                console.log(data.respuesta);
            } else {
                console.log(data.respuesta);
            }
        })
        setTimeout(() => {
            this.cargarData();
        }, 500);
        
    }

    cargarEstado(value){
        // if (value==1) {
        //     return false;
        // }else{
        //     return true;
        // }
    }




    render() {

        const data_listar=this.state.solicitud_aprobaciones;
        console.log(data_listar);
        return (
            <>
             <SimpleHeader name="Aprobaciones Pendientes" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Nro. Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onKeyUp={this.buscarNumeroSolicitud}/>
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " onClick={this.buscarNumeroSolicitud}/>
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2">Estado</Label>
                                    <Col md="2">
                                        <FormGroup>
                                        <Input type="select" name="select" id="exampleSelect" className="form-control-sm" onChange={this.bucarEstado} >
                                            <option value="">[Todos]</option>
                                            {
                                                estado_proceso_de_altas.map((select,key)=>{
                                                    return (
                                                        <>
                                                            <option value={select.id}>{select.value}</option>
                                                            
                                                        </>
                                                    );

                                                })
                                            }
                                        </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                        </CardHeader>
                        <CardBody>
                            <Table className="align-items-center table-flush" responsive size="sm" hover>
                                <thead className="thead-light">
                                    <tr>
                                        <th style={{width:'1%', textAlign:"center"}} >Nro. <br/> Solicitud</th>
                                        <th style={{width:'1%', textAlign:"center"}} >Estado</th>
                                        <th style={{width:'5%', textAlign:"center"}} >Fecha <br/> De Creacion</th>
                                        <th style={{width:'5%', textAlign:"center"}} >Creador de Solicitud</th>
                                        <th style={{width:'2%', textAlign:"center"}} >Cantidad <br/> de Recursos</th>
                                        <th style={{width:'10%', textAlign:"center"}} >Descripcion de Puesto</th>
                                        <th style={{width:'5%', textAlign:"center"}} >Remuneración</th>
                                        <th style={{width:'2%', textAlign:"center"}} >¿Aprobar?</th>
                                        <th style={{width:'2%', textAlign:"center"}} >Rechazar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data_listar.map((listado,key)=>{
                                            var checked = listado.estado;
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="table-user" style={{textAlign:"center"}}>
                                                            <a className="font-weight-bold" href="#pablo" onClick={e => e.preventDefault()}>{listado.id}</a>
                                                        </td>
                                                        <td className="table-user" style={{textAlign:"center"}}>
                                                            <b>{listado.estado_des}</b>
                                                        </td>
                                                        <td className="table-user" style={{textAlign:"center"}}>
                                                            <b>{format.asString('dd/MM/yyyy', new Date(listado.fecha_registro))}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.nombres}</b>
                                                        </td>
                                                        <td className="table-user" style={{textAlign:"center"}}>
                                                            <b>{listado.cantidad}</b>
                                                        </td>
                                                        <td>
                                                            <span className="text-muted">{listado.descripcion}</span>
                                                        </td>
                                                        <td style={{textAlign:"center"}}>
                                                            <span>{listado.remoneracion}</span>
                                                        </td>
                                                        <td>
                                                            <label className="custom-toggle">
                                                                <input type="checkbox" name="estado" onChange={ e =>this.updateEstado(e, listado.id)} 
                                                                checked={checked}  />
                                                                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes"/>
                                                            </label>
                                                        </td>

                                                        <td>
                                                            <label className="custom-toggle">
                                                                <input type="checkbox" name="rechazado" onChange={ e =>this.updateEstado(e, listado.id)} 
                                                                checked={listado.estado_des1}/>
                                                                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes"/>
                                                            </label>
                                                        </td>

                                                    </tr>
                                                </>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    {/* <CardFooter>
                        <Row>
                            <Col md="12">
                                <Button color="success" className="btn btn-sm" style={{float:"right"}}>Confirmar</Button>
                            </Col>
                        </Row>
                    </CardFooter> */}
                </Card>
            </Container>
        </>
    );
  }
}

export default Aprobaciones;