// import React from "react";
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     FormGroup,
//     Form,
//     Input,
//     Container,
//     Row,
//     Col,
//     UncontrolledTooltip,
//     Button,
//     NavItem,
//     NavLink,
//     Nav,
//     TabContent,
//     TabPane,
// } from "reactstrap";
// import ReactBSAlert from "react-bootstrap-sweetalert";
// import SimpleHeader from "components/Headers/SimpleHeader.jsx";
// import Select from 'react-select'
// import { server, sociedades, tipoDoc, sedes, areas, unidOrgs, cargos } from "variables/conf.jsx";
// import classnames from "classnames";
// // import { Formik, Form, Field, ErrorMessage } from 'formik';

// class Personal extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             sociedades: sociedades,
//             tipoDoc: tipoDoc,
//             sedes: sedes,
//             areas: areas,
//             unidOrgs: unidOrgs,
//             cargos: cargos,
//             tabs: 1,
//             puestos: [],
//             paises: [],
//             // sedes: [],
//             almacenes: [],
//             cuentas: [],
//             cecos: [],
//             cebes: [],
//             actividades: [],
//             server: server,
//             personal: {
//                 COD_TRABAJADOR: '',
//                 NOMBRES: '', APE_PATERNO: '', APE_MATERNO: '', correo: '', id_perfil: '',
//                 id_actividad: '', centroCosto: '', centroBeneficio: '', comentario_adicional: '', id_recurso_superior: '',
//                 id_pais: '', id_sede: '', id_almacen: '', cuenta: '', id_almacen2: '', id_actividad2: '', id_almacen3: '', id_actividad3: ''
//             }
//         }

//         this.recursoSession = JSON.parse(sessionStorage.recursoSession);
//         let self = this

//         var datalogin = {
//             cod_trabajador: 500100,
//             nro_documento: 11111111111111111550
//         };

//         fetch(this.state.server + "/pdr_api/getGeneral/" + this.recursoSession.id_recurso + "/PUESTO")
//             .then(response => response.json())
//             .then(puestos => this.setState({ puestos }));
//         fetch(this.state.server + "/pdr_api/getGeneral/" + this.recursoSession.id_recurso + "/PAIS")
//             .then(response => response.json())
//             .then(paises => this.setState({ paises }));
//         // fetch(this.state.server + "/pdr_api/getUbicaciones/" + this.recursoSession.id_recurso + "/SED")
//         //     .then(response => response.json())
//         //     .then(sedes => this.setState({ sedes }));
//         fetch(this.state.server + "/pdr_api/getUbicaciones/" + this.recursoSession.id_recurso + "/ALM")
//             .then(response => response.json())
//             .then(almacenes => this.setState({ almacenes }));
//         fetch(this.state.server + "/pdr_api/getCuentas/" + this.recursoSession.id_recurso + "/O")
//             .then(response => response.json())
//             .then(cuentas => this.setState({ cuentas }));
//         fetch(this.state.server + "/pdr_api/getCentros/" + this.recursoSession.id_recurso + "/CECO/O")
//             .then(response => response.json())
//             .then(cecos => this.setState({ cecos }));
//         fetch(this.state.server + "/pdr_api/getCentros/" + this.recursoSession.id_recurso + "/CEBE/O")
//             .then(response => response.json())
//             .then(cebes => this.setState({ cebes }));
//         fetch(this.state.server + "/hr_api/misdatos",
//             {
//                 method: 'POST',
//                 body: JSON.stringify(datalogin),
//                 headers: { 'Content-Type': 'application/json' }
//             })
//             .then(response => response.json())
//             .then(personal => this.handleInitialForm(personal));
//     }

//     handleInitialForm(personal) {
//         this.setState({ personal });
//     }

//     toggleNavs = (e, state, index) => {
//         e.preventDefault();
//         this.setState({
//             [state]: index
//         });
//     };

//     savePersonal = _ => {
//         const { personal } = this.state
//         this.setState({ personal: { ...personal, id_usuario: this.recursoSession.id_recurso } })
//         var obj2 = Object.values(this.state.personal);
//         var str = '{"data":"';
//         for (var i in obj2) {
//             str += i > 0 ? ",'" + obj2[i] + "'" : "'" + obj2[i] + "'";
//         }
//         str += "\"}"

//         fetch(this.state.server + "/pdr_api/registrarPersonal/" + this.recursoSession.id_recurso,
//             {
//                 method: 'POST',
//                 body: str,
//                 headers:
//                 {
//                     'Content-Type': 'application/json'
//                 }
//             });
//     }

//     handleForm = (e) => {
//         const { personal } = this.state
//         this.setState({ personal: { ...personal, [e.target.name]: e.target.value } });
//     }
//     handleSelectForm = (e, label) => {
//         const { personal } = this.state
//         this.setState({ personal: { ...personal, [label]: e.value } });
//     }
//     successAlert() {
//         this.setState({
//             alert: (
//                 <ReactBSAlert
//                     success
//                     style={{ display: "block", marginTop: "-100px" }}
//                     title="Registro Exitoso"
//                     onConfirm={() => this.hideAlert()}
//                     onCancel={() => this.hideAlert()}
//                     confirmBtnBsStyle="info"
//                 >
//                 </ReactBSAlert>
//             )
//         });
//     }

//     hideAlert() {
//         this.setState({
//             alert: null
//         });
//         window.location.reload();
//     }
//     render() {
//         const { personal } = this.state
//         return (
//             <>
//                 <SimpleHeader name="Actualizar Mis Datos" parentName="Mi Ransa" />
//                 <Container className="mt--6" fluid>
//                     <Row>
//                         <Col>
//                             <div className="nav-wrapper">
//                                 {/* <Nav
//                                     className="nav-fill flex-column flex-md-row"
//                                     id="tabs-icons-text"
//                                     pills
//                                     role="tablist"
//                                 >
//                                     <NavItem>
//                                         <NavLink
//                                             aria-selected={this.state.tabs === 1}
//                                             className={classnames("mb-sm-3 mb-md-0", {
//                                                 active: this.state.tabs === 1
//                                             })}
//                                             onClick={e => this.toggleNavs(e, "tabs", 1)}
//                                             href="#"
//                                             role="tab"
//                                         >
//                                             <i className="ni ni-cloud-upload-96 mr-2" />
//                                             Mis datos
//                     </NavLink>
//                                     </NavItem>
//                                     <NavItem>
//                                         <NavLink
//                                             aria-selected={this.state.tabs === 2}
//                                             className={classnames("mb-sm-3 mb-md-0", {
//                                                 active: this.state.tabs === 2
//                                             })}
//                                             onClick={e => this.toggleNavs(e, "tabs", 2)}
//                                             href="#"
//                                             role="tab"
//                                         >
//                                             <i className="ni ni-bell-55 mr-2" />
//                                             Mi Equipo
//                     </NavLink>
//                                     </NavItem>
//                                 </Nav> */}
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <div className="col">
//                             <TabContent activeTab={"tabs" + this.state.tabs}>
//                                 <TabPane tabId="tabs1">
//                                     {/* <Formik
//                                         initialValues={
//                                         //    z
//                                     }
//                                         validate={values => {
//                                             let errors = {};
//                                             if (!values.EMAIL_CORP) {
//                                                 errors.EMAIL_CORP = 'Required';
//                                             } else if (
//                                                 !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.EMAIL_CORP)
//                                             ) {
//                                                 errors.EMAIL_CORP = 'Invalid email address';
//                                             }
//                                             return errors;
//                                         }}
//                                         onSubmit={(values, { setSubmitting }) => {
//                                             setTimeout(() => {
//                                                 alert(JSON.stringify(values, null, 2));
//                                                 setSubmitting(false);
//                                             }, 400);
//                                         }}
//                                     >{({ isSubmitting }) => (
//                                         <Form> */}
//                                             <Card>
//                                                 <CardHeader className="border-0">
//                                                     <Row>
//                                                         <Col xs="6">
//                                                             <h3 className="mb-0">Mis datos</h3>
//                                                         </Col>
//                                                         <Col className="text-right" xs="6">
//                                                             <Button
//                                                                 className="btn-neutral btn-round btn-icon"
//                                                                 color="default"
//                                                                 id="tooltip969372949"
//                                                                 onClick={this.savePersonal}
//                                                                 size="sm"
//                                                             >
//                                                                 <span className="btn-inner--icon mr-1">
//                                                                     <i className="fas fa-user-edit" />
//                                                                 </span>
//                                                                 <span className="btn-inner--text">Modificar datos</span>
//                                                             </Button>
//                                                             <UncontrolledTooltip delay={0} target="tooltip969372949">
//                                                                 Modificar datos
//                   </UncontrolledTooltip>
//                                                         </Col>
//                                                     </Row>
//                                                 </CardHeader>
//                                                 <CardBody>
//                                                     <Row>
//                                                         <Col md="4">                                                        
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols1Input"
//                                                                 >
//                                                                     Código de trabajador
//                                         </label>
//                                                                 <Input
//                                                                     id="example3cols1Input"
//                                                                     placeholder="Código de trabajador"
//                                                                     type="text"
//                                                                     value={personal.COD_TRABAJADOR}
//                                                                     readOnly
//                                                                 // onChange={this.handleForm}
//                                                                 // name="COD_TRABAJADOR"
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                     <Row>
//                                                         <Col md="4" sm="6">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example4cols1Input"
//                                                                 >
//                                                                     Nombres
//                                         </label>
//                                                                 <Input
//                                                                     id="example4cols1Input"
//                                                                     placeholder="Nombres"
//                                                                     type="text"
//                                                                     value={personal.NOMBRES}
//                                                                     // onChange={this.handleForm}
//                                                                     readOnly
//                                                                     name="NOMBRES"
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="4" sm="6">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example4cols2Input"
//                                                                 >
//                                                                     Apellido paterno
//                                         </label>
//                                                                 <Input
//                                                                     id="example4cols2Input"
//                                                                     placeholder="Apellido paterno"
//                                                                     type="text"
//                                                                     value={personal.APE_PATERNO}
//                                                                     // onChange={this.handleForm}
//                                                                     name="APE_PATERNO"
//                                                                     readOnly
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="4" sm="6">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example4cols3Input"
//                                                                 >
//                                                                     Apellido materno
//                                         </label>
//                                                                 <Input
//                                                                     id="example4cols3Input"
//                                                                     placeholder="Apellido materno"
//                                                                     type="text"
//                                                                     value={personal.APE_MATERNO}
//                                                                     // onChange={this.handleForm}
//                                                                     name="APE_MATERNO"
//                                                                     readOnly
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                     <Row>
//                                                         <Col md="4" sm="6">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example5cols3Input"
//                                                                 >
//                                                                     Tipo de documento
//                                     </label>
//                                                                 <Select options={this.state.tipoDoc}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     placeholder="Tipo de documento"
//                                                                     onChange={e => this.handleSelectForm(e, 'id_perfil')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="4" sm="6">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols1Input"
//                                                                 >
//                                                                     Número de documento
//                                         </label>
//                                                                 <Input
//                                                                     id="example3cols1Input"
//                                                                     placeholder="Número de documento"
//                                                                     type="text"
//                                                                     value={personal.DOC_IDENTIDAD}
//                                                                     // onChange={this.handleForm}
//                                                                     name="DOC_IDENTIDAD"
//                                                                     readOnly
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                 </CardBody>
//                                             </Card>
//                                             <Card className="mb-4">
//                                                 <CardHeader>
//                                                     <h3 className="mb-0">Datos laborales</h3>
//                                                 </CardHeader>
//                                                 <CardBody>
//                                                     <Row>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Sociedad
//                                         </label>
//                                                                 <Select options={this.state.sociedades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Sede
//                                         </label>
//                                                                 <Select options={this.state.sedes}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Area
//                                         </label>
//                                                                 <Select options={this.state.areas}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Unidad organizativa
//                                         </label>
//                                                                 <Select options={this.state.unidOrgs}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                     <Row>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Cargo
//                                         </label>
//                                                                 <Select options={this.state.cargos}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Jefe directo
//                                         </label>
//                                                                 <Select options={this.state.actividades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')}
//                                                                     isDisabled />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     CECO
//                                         </label>
//                                                                 <Select options={this.state.actividades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')}
//                                                                     isDisabled />
//                                                             </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                 </CardBody>
//                                             </Card>
//                                             <Row>
//                                                 <Col lg="6">
//                                                     <div className="card-wrapper">
//                                                         <Card>
//                                                             <CardHeader>
//                                                                 <h3 className="mb-0">Comunicación corporativa</h3>
//                                                             </CardHeader>
//                                                             <CardBody>
//                                                                     {/* <label
//                                                                         className="form-control-label"
//                                                                         htmlFor="emailCorp"
//                                                                     >Correo electrónico </label>
//                                                                     <Field type="email" name="EMAIL_CORP" id="emailCorp" className='form-control' />
//                                                                     <ErrorMessage name="EMAIL_CORP" component="div" /> */}
//                                                                 <FormGroup>
//                                                                     <label
//                                                                         className="form-control-label"
//                                                                         htmlFor="example3cols1Input"
//                                                                     >
//                                                                         Celular
//                                         </label>
//                                                                     <Input
//                                                                         id="example3cols1Input"
//                                                                         placeholder="Celular"
//                                                                         type="text"
//                                                                         value={personal.id_recurso}
//                                                                         onChange={this.handleForm}
//                                                                         name="id_recurso"
//                                                                     />
//                                                                 </FormGroup>
//                                                                 <FormGroup>
//                                                                     <label
//                                                                         className="form-control-label"
//                                                                         htmlFor="example3cols1Input"
//                                                                     >
//                                                                         Anexo
//                                         </label>
//                                                                     <Input
//                                                                         id="example3cols1Input"
//                                                                         placeholder="Anexo"
//                                                                         type="text"
//                                                                         value={personal.id_recurso}
//                                                                         onChange={this.handleForm}
//                                                                         name="id_recurso"
//                                                                     />
//                                                                 </FormGroup>
//                                                                 {/* </Form> */}
//                                                             </CardBody>
//                                                         </Card>
//                                                     </div>
//                                                 </Col>
//                                                 <Col lg="6">
//                                                     <div className="card-wrapper">
//                                                         <Card>
//                                                             <CardHeader>
//                                                                 <h3 className="mb-0">Comunicación personal</h3>
//                                                             </CardHeader>
//                                                             <CardBody>
//                                                                 <Form>
//                                                                     <FormGroup>
//                                                                         <label
//                                                                             className="form-control-label"
//                                                                             htmlFor="example3cols1Input"
//                                                                         >
//                                                                             Correo electrónico
//                                         </label>
//                                                                         <Input
//                                                                             id="example3cols1Input"
//                                                                             placeholder="Correo electrónico"
//                                                                             type="text"
//                                                                             value={personal.id_recurso}
//                                                                             onChange={this.handleForm}
//                                                                             name="id_recurso"
//                                                                         />
//                                                                     </FormGroup>
//                                                                     <FormGroup>
//                                                                         <label
//                                                                             className="form-control-label"
//                                                                             htmlFor="example3cols1Input"
//                                                                         >
//                                                                             Celular
//                                         </label>
//                                                                         <Input
//                                                                             id="example3cols1Input"
//                                                                             placeholder="Celular"
//                                                                             type="text"
//                                                                             value={personal.id_recurso}
//                                                                             onChange={this.handleForm}
//                                                                             name="id_recurso"
//                                                                         />
//                                                                     </FormGroup>
//                                                                 </Form>
//                                                             </CardBody>
//                                                         </Card>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                             <Card className="mb-4">
//                                                 <CardHeader>
//                                                     <h3 className="mb-0">Datos de dirección</h3>
//                                                 </CardHeader>
//                                                 <CardBody>
//                                                     <Row>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Pais
//                                         </label>
//                                                                 <Select options={this.state.paises}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Departamento/Estado
//                                         </label>
//                                                                 <Select options={this.state.actividades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Provincia
//                                         </label>
//                                                                 <Select options={this.state.actividades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')}
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Distrito
//                                         </label>
//                                                                 <Select options={this.state.actividades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                     <Row>
//                                                         <Col md="3">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols2Input"
//                                                                 >
//                                                                     Tipo de vía
//                                         </label>
//                                                                 <Select options={this.state.actividades}
//                                                                     isClearable
//                                                                     isSearchable
//                                                                     onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="9">
//                                                             <FormGroup>
//                                                                 <label
//                                                                     className="form-control-label"
//                                                                     htmlFor="example3cols1Input"
//                                                                 >
//                                                                     Dirección
//                                         </label>
//                                                                 <Input
//                                                                     id="example3cols1Input"
//                                                                     placeholder="Correo electrónico"
//                                                                     type="text"
//                                                                     value={personal.id_recurso}
//                                                                     onChange={this.handleForm}
//                                                                     name="id_recurso"
//                                                                 />
//                                                             </FormGroup>
//                                                         </Col>
//                                                         <Col md="3">
//                                                     <FormGroup>
//                                                         <label
//                                                             className="form-control-label"
//                                                             htmlFor="example3cols2Input"
//                                                         >
//                                                             CECO
//                                         </label>
//                                                         <Select options={this.state.actividades}
//                                                             isClearable
//                                                             isSearchable
//                                                             onChange={e => this.handleSelectForm(e, 'id_actividad')} />
//                                                     </FormGroup>
//                                                         </Col>
//                                                     </Row>
//                                                 </CardBody>
//                                             </Card>
//                                             {/* <button type="submit" disabled={isSubmitting}>
//                                                 Submit
//           </button>
//                                         </Form>
//                                     )}
//                                     </Formik> */}
//                                 </TabPane></TabContent></div></Row>
//                 </Container>
//             </>
//         );
//     }
// }
// export default Personal;
