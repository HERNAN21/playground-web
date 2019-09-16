import Login from "views/pages/examples/Login.jsx";
import ChangePass from "views/pages/examples/ChangePass.jsx";
// Alta
import Solicitud from "views/pages/ProcAlta/Solicitud.jsx";
import Aprobaciones from "views/pages/ProcAlta/Aprobaciones.jsx"
import Aprobacionesgestor from "views/pages/ProcAlta/Aprobacionesgestor.jsx";
import Requerimiento from "views/pages/ProcAlta/Requerimiento.jsx";
import Registrocandidatos from "views/pages/ProcAlta/Registrocandidatos.jsx";
import Siguimientosolicitud from "views/pages/ProcAlta/Siguimientosolicitud.jsx";
import Registronuevopersonal from "views/pages/ProcAlta/Registronuevopersonal.jsx";
import Validarenvioalta from "views/pages/ProcAlta/Validarenvioalta.jsx";
import Registrodatosalta from "views/pages/ProcAlta/Registrodatosalta.jsx";
import Seguimientonuevopersonal from "views/pages/ProcAlta/Seguimientonuevopersonal.jsx";
// Baja
import Creacionsolicitudbaja from "views/pages/ProcBaja/Creacionsolicitudbaja.jsx";
import Seguimientosolicitudbaja from "views/pages/ProcBaja/Seguimientosolicitudbaja.jsx";
import Seguimientosolicitudbajaadmin from "views/pages/ProcBaja/Seguimientosolicitudbajaadmin.jsx";

// Renovaciones
import Seguimientorenovacion from "views/pages/ProcRenovacion/Seguimientorenovacion.jsx";

const routes = [

  {
    collapse: true,
    name: "Playground",
    icon: "ni ni-ui-04 text-info",
    state: "componentsCollapse",
    views: [
      {
        path: "/Solicitud",
        name: "Creación De Solicitud de Alta",
        icon: "ni ni-archive-2 text-green",
        component: Solicitud,
        layout: "/admin"
      },
      {
        path: "/Aprobaciones",
        name: "Aprobaciones Pendientes",
        icon: "fa fa-check text-green",
        component: Aprobaciones,
        layout: "/admin"
      },
      {
        path:"/Aprobacionesgestor",
        name: "Aprobaciones Pendientes Gestor",
        icon: "fa fa-list text-green",
        component: Aprobacionesgestor,
        layout:"/admin"
      },
      {
        path:"/Requerimiento",
        // name: "Requerimiento",
        // icon: "ni ni-archive-2 text-green",
        component: Requerimiento,
        layout:"/admin"
      },
      {
        path: "/Registrocandidatos",
        name: "Registro de Candidatos",
        icon: "ni ni-archive-2 text-green",
        component: Registrocandidatos,
        layout: "/admin"
      },

      {
        path: "/Siguimientosolicitud",
        name: "Seguimiento de Solicitud de Alta",
        icon: "ni ni-archive-2 text-green",
        component: Siguimientosolicitud,
        layout: "/admin"
      },
      {
        path: "/Registronuevopersonal",
        name: "Registro de Nuevo Personal",
        icon: "ni ni-archive-2 text-green",
        component: Registronuevopersonal,
        layout: "/admin"
      },
      {
        path: "/Validarenvioalta",
        name: "Validación y Envio de Alta",
        icon: "ni ni-archive-2 text-green",
        component: Validarenvioalta,
        layout: "/admin"
      },
      // Lunes
      {
        path: "/Registrodatosalta",
        name: "Registro de datos de Alta",
        icon: "ni ni-archive-2 text-green",
        component: Registrodatosalta,
        layout: "/admin"
      },
      {
        path: "/Seguimientonuevopersonal",
        name: "Seguimiento de Nuevo Personal",
        icon: "ni ni-archive-2 text-green",
        component: Seguimientonuevopersonal,
        layout: "/admin"
      },
      {
        path: "/Creacionsolicitudbaja",
        name: "Creacion de Solicitud de Baja",
        icon: "ni ni-archive-2 text-green",
        component: Creacionsolicitudbaja,
        layout: "/admin"
      },
      {
        path: "/Seguimientosolicitudbaja",
        name: "Seguimeinto de Solicitud de Baja",
        icon: "ni ni-archive-2 text-green",
        component: Seguimientosolicitudbaja,
        layout: "/admin"
      },
      {
        path: "/Seguimientosolicitudbajaadmin",
        name: "Seguimeinto de Solicitud de Baja Admin",
        icon: "ni ni-archive-2 text-green",
        component: Seguimientosolicitudbajaadmin,
        layout: "/admin"
      },
      {
        path: "/Seguimientorenovacion",
        name: "Seguimiento de Renovaciones",
        icon: "ni ni-archive-2 text-green",
        component: Seguimientorenovacion,
        layout: "/admin"
      },
    ]
  },
  {
    path: "/changePass",
    name: "Cambiar contraseña",
    icon: "ni ni-user-run text-green",
    component: ChangePass,
    layout: "/auth"
  },
  {
    path: "/login",
    name: "Cerrar sesión",
    icon: "ni ni-user-run text-green",
    component: Login,
    layout: "/auth"
  }
];

export default routes;
