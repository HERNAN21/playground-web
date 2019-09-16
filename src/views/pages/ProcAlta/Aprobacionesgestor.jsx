import React from "react";

// reactstrap components
import {Badge,Button,Card,CardHeader,CardBody,CardFooter,Table,Container,Row,Col,FormGroup,Label,InputGroup,Input,InputGroupAddon,InputGroupText,
    Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { server, api_name, estado_proceso_de_altas } from "variables/general.jsx";
import { runInThisContext } from "vm";
import { setTimeout } from "timers";
import { Link } from "react-router-dom";

var format = require('date-format');

class Aprobacionesgestor extends React.Component {


    
    constructor(props) {
        super(props);

        this.state = {
            server:server,
            listado_solicitud:[],
            buscar_listado:{
                num_solicitud:'',
                estado:''
            },
            data_update:{
                id_solicitud:'',
                estado:'',
                estado_vicepresidencia:''
            },

            remuneracion_data_save:{
                solicitud_id:'',
                tipo_moneda:'',
                remuneracion_basico:'',
                vales:'',
                asig_movilidad:'',
                asignacion_otros:'',
                usuario_registro:'HROJAS',
                estado:'0'
            },

            modal: false,

        };

        this.cargarData=this.cargarData.bind(this);
        // this.cargarData=this.cargarData(this);
        this.ModalRemuneracion = this.ModalRemuneracion.bind(this);
        
        
    }
    
    buscarNumero=(e)=>{
        this.state.buscar_listado.num_solicitud=e.target.value;
        this.forceUpdate();
        this.cargarData();
    }

    buscarEstado=(e)=>{
        this.state.buscar_listado.estado=e.target.value;
        this.forceUpdate();
        this.cargarData();
    }

    btnBuscar=(e)=>{
        this.cargarData();
    }
    
    
    // this.props.router.push({
    //     pathname: '/other-page',

    //     state: {
    //         id: 7,
    //         color: 'green'
    //     }
    // })



    cargarData=(e)=>{
        fetch(this.state.server + api_name+ '/aprobacionespendientes',{
            method: 'POST',
            body: JSON.stringify(this.state.buscar_listado),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                var data_p=[];
                for (let i = 0; i < data.result.length; i++) {
                    // if (data.result[i].estado==2) {
                    if (data.result[i].estado>=2) {    
                        // condicion vicepresidencia
                        if (data.result[i].estado_vicepresidencia==4) {
                            data.result[i].estado_vicepresidencia=true;
                        }else{
                            data.result[i].estado_vicepresidencia=false;
                        }

                        // condicion estado
                        
                        if (data.result[i].estado==2) {
                            data.result[i].estado_des=estado_proceso_de_altas[1].value;
                            data.result[i].estado=false;
                            data.result[i].estado_des1=false;
                        }else if (data.result[i].estado==3) {
                            data.result[i].estado_des=estado_proceso_de_altas[2].value;
                            data.result[i].estado=true;
                            data.result[i].estado_des1=true;
                        }else if(data.result[i].estado==4){
                            data.result[i].estado_des=estado_proceso_de_altas[3].value;
                            data.result[i].estado=false;
                            data.result[i].estado_des1=false;
                        }else if (data.result[i].estado==5) {
                            data.result[i].estado_des=estado_proceso_de_altas[4].value;
                            data.result[i].estado=true;
                            data.result[i].estado_des1=true;
                        }else if (data.result[i].estado==6) {
                            data.result[i].estado_des=estado_proceso_de_altas[5].value;
                            data.result[i].estado=true;
                            data.result[i].estado_des1=false;
                        }else if (data.result[i].estado==7) {
                            data.result[i].estado_des=estado_proceso_de_altas[6].value;
                            data.result[i].estado=true;
                            data.result[i].estado_des1=true;
                        }



                        // data.result[i].estado=false;
                        data_p.push(data.result[i]);
                    }
                }
                this.setState({listado_solicitud:data_p});
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))
        
    }

    // Abrir Modal y pasar data
    ModalRemuneracion(data) {
        this.state.remuneracion_data_save.solicitud_id=data.id;
        this.forceUpdate();

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    


    // data remonetarion

    dataMoneda =(e)=>{
        this.state.remuneracion_data_save.tipo_moneda=e.target.value;
        this.forceUpdate();
    }

    dataRemuneracion =(e)=>{
        this.state.remuneracion_data_save.remuneracion_basico=e.target.value;
        this.forceUpdate();
    }

    dataVales=(e)=>{
        this.state.remuneracion_data_save.vales=e.target.value;
        this.forceUpdate();
    }
    
    dataAsigMovilidad=(e)=>{
        this.state.remuneracion_data_save.asig_movilidad=e.target.value;
        this.forceUpdate();
    }

    dataAsigOtros=(e)=>{
        this.state.remuneracion_data_save.asignacion_otros=e.target.value;
        this.forceUpdate();
    }
    

    dataRemuneracionSave=(e) =>{
        
        var data_save = this.state.remuneracion_data_save;
        fetch(this.state.server + api_name+ '/remuneracion',{
            method: 'POST',
            body: JSON.stringify(data_save),
            headers: {'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(function(data) {
            if (data.respuesta=='success') {
                alert(data.respuesta);
            } else {
                console.log(data.respuesta);
            }
        }.bind(this))
        
    }
    // update estado vicepresidencia

    AprobacionVicepresidencia=(e)=>{
        // aprobacionvic
        var estado=4;
        if (e.target.checked==false) {
            estado=5;
        }
        const data_update={
            id_solicitud: e.target.value,
            estado_vicepresidencia: estado
        }
        fetch(this.state.server + api_name+'/updatestatusvicepresidencia',{
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
        }, 100);

        // this.setState({aprobacionvicecheck: e.target.checked});

    }

    // Update estado
    updateEstado=(e, id)=>{
        var estado=4;

        if (e.target.name=='aprobar') {
            if (e.target.checked==true) {
                estado=6;
            }
        }
        if (e.target.name=='rechazar') {
            if (e.target.checked==true) {
                estado=7;
            }
        }

        console.log(id);

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
        }, 100);
    }
    



    



    render() {
        const data_list=this.state.listado_solicitud;
        return (
            <>
             <SimpleHeader name="Aprobaciones Pendientes" parentName="Tables" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0" style={{marginBottom:"-50px"}}>
                                <Row>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-150px", marginTop:"-5px"}}>Nro. Solicitud</Label>
                                    <Col md="2">
                                        <InputGroup>
                                            <Input className="form-control-sm" placeholder="" type="text" onChange={this.buscarNumero} />
                                            <InputGroupAddon addonType="append">
                                            <InputGroupText className="form-control-sm" style={{margin:0, padding:0}}>
                                                <Button className="fas fa-search btn btn-sm " style={{width:"100%"}} onClick={this.btnBuscar} />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Label className="form-control-label" htmlFor="example-text-input" md="2" style={{marginRight:"-150px", marginTop:"-5px"}}>Estado</Label>
                                    <Col md="2">
                                        <FormGroup>
                                        <Input type="select" name="select" id="exampleSelect" className="form-control-sm" onChange={this.buscarEstado} >
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
                            <Table className="align-items-center table-flush" responsive size="sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th style={{textAlign:"center"}} >Nro. <br/> Solicitud</th>
                                        <th style={{textAlign:"center"}} >Estado</th>
                                        <th style={{textAlign:"center"}} >Fecha <br/> De Creacion</th>
                                        <th style={{textAlign:"center"}} >Creador de Solicitud</th>
                                        <th style={{textAlign:"center"}} >Cantidad <br/> de <br/> Recursos</th>
                                        <th style={{textAlign:"center"}} >Descripcion de Puesto</th>
                                        <th style={{textAlign:"center"}} >Aprobación <br/> de Vicepresidencia</th>
                                        <th style={{textAlign:"center"}} >Remuneracion</th>
                                        <th style={{textAlign:"center"}} >¿Aprobar?</th>
                                        <th style={{textAlign:"center"}} >Rechazar</th>
                                    <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data_list.map((listado, key)=>{
                                            return(
                                                <>
                                                    <tr>
                                                        <td className="table-user" style={{textAlign:"center"}}>
                                                            {/* <a className="font-weight-bold" href='/admin/Requerimiento' >{listado.id}</a> */}
                                                            <Link  className="font-weight-bold" to={{pathname:'/admin/Requerimiento',state:{data:listado}}} >{listado.id}</Link>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.estado_des}</b>
                                                        </td>
                                                        <td className="table-user" style={{textAlign:"center"}} >
                                                            <b>{format.asString('dd/MM/yyyy', new Date(listado.fecha_registro))}</b>
                                                        </td>
                                                        <td className="table-user">
                                                            <b>{listado.codigo_user +' - '+ listado.nombres +', '+listado.apellido_paterno+' '+ listado.apellido_materno}</b>
                                                        </td>
                                                        <td className="table-user" style={{textAlign:"center"}} >
                                                            <b>{listado.cantidad}</b>
                                                        </td>
                                                        <td>
                                                            <span className="text-muted">{listado.descripcion}</span>
                                                        </td>
                                                        <td>
                                                            <label className="custom-toggle">
                                                                <input type="checkbox" name="" value={listado.id}  onChange={this.AprobacionVicepresidencia} checked={listado.estado_vicepresidencia}/>
                                                                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes"/>
                                                            </label>
                                                            <Button className="btn btn-sm" color="info" style={{float:"right", marginTop:"-25px"}}>Enviar</Button>    
                                                        </td>
                                                        <td>
                                                            {/* <Button className="btn btn-sm" color="warning" style={{float:"right"}} onClick={this.ModalRemuneracion}>Ingresar</Button> */}
                                                            <Button className="btn btn-sm" color="warning" style={{float:"right"}} onClick={()=>this.ModalRemuneracion(listado)}>Ingresar</Button>
                                                        </td>
                                                        <td>
                                                            <label className="custom-toggle">
                                                                <input type="checkbox" name='aprobar' onChange={e=>this.updateEstado(e,listado.id)} checked={listado.estado}/>
                                                                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <label className="custom-toggle">
                                                                <input type="checkbox" value={listado.id} name="rechazar" onChange={e=>this.updateEstado(e,listado.id)} checked={listado.estado_des1}/>
                                                                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes" />
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
            {/* Modal Remuneracion */}
             {/* Modal Centro de Costos */}
            <Modal isOpen={this.state.modal} ModalRemuneracion={this.ModalRemuneracion} className={this.props.className} style={{marginTop:"150px"}}>
                {/* <ModalHeader ModalCentroCosto={this.ModalCentroCosto}>Centro de Costos</ModalHeader> */}
                <ModalBody>
                    <Card>
                        <CardHeader style={{textAlign:"center"}}><b>Registrar</b></CardHeader>
                        <CardBody>
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="4" style={{marginRight:"0px", marginTop:"-5px"}}>Moneda</Label>
                                <Col md="8">
                                    <FormGroup>
                                        <Input  type="select" className="form-control-sm" onChange={this.dataMoneda}>
                                            <option value="">[Seleccione]</option>
                                            <option value="1">Soles</option>
                                            <option value="2">Dolares</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="4" style={{marginRight:"0px", marginTop:"-5px"}}>Remuneración Básica</Label>
                                <Col md="8">
                                    <FormGroup>
                                        <Input  type="text" className="form-control-sm" onKeyUp={this.dataRemuneracion}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="4" style={{marginRight:"0px", marginTop:"-5px"}}>Vales</Label>
                                <Col md="8">
                                    <FormGroup>
                                        <Input  type="text" className="form-control-sm" onKeyUp={this.dataVales} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="4" style={{marginRight:"0px", marginTop:"-5px"}}>Asignacion por Movilidad</Label>
                                <Col md="8">
                                    <FormGroup>
                                        <Input  type="text" className="form-control-sm" onKeyUp={this.dataAsigMovilidad} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Label className="form-control-label" htmlFor="example-text-input" md="4" style={{marginRight:"0px", marginTop:"-5px"}}>Asignación Otros</Label>
                                <Col md="8">
                                    <FormGroup>
                                        <Input  type="text" className="form-control-sm" onKeyUp={this.dataAsigOtros}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <div style={{float:"right"}}>
                                        <Button color="success" className="btn btn-sm" onClick={this.dataRemuneracionSave}>Guardar</Button>
                                        <Button color="danger" className="btn btn-sm" onClick={this.ModalRemuneracion}>Cerrar</Button>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="success" className="btn btn-sm" onClick={this.ModalRemuneracion}>Guardar</Button>
                    <Button color="danger" className="btn btn-sm" onClick={this.ModalRemuneracion}>Cerrar</Button>
                </ModalFooter> */}
            </Modal>

        </>
    );
  }
}

export default Aprobacionesgestor;