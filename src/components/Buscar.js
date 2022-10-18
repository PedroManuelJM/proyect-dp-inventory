import React, { useState, useEffect } from "react";
import {useNavigate,Link } from "react-router-dom";
import search from '../assets/images/borrar.png';
import cancel from '../assets/images/cancel.png';
import add from '../assets/images/add.png';
import edit from '../assets/images/edit.png';
import delet from '../assets/images/delete.png';
import pdf from '../assets/images/pdf.png';
import mantenimiento from '../assets/images/mantenimiento.png';
//import robot from '../assets/images/robot.gif';
import Swal from 'sweetalert2';
//import ReactHTMLTableToExcel from 'react-html-table-to-excel'; // excel
import { ExportToExcel } from "./ExportToExcel";
import { usuarioLocal,ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import FormatoPDF from "./FormatoPDF";
import RegistrarEquipo from "./RegistrarEquipo";
import VistaEquipo from "./VistaEquipo";
registerLocale("es", es);

function searchingTerm(busqueda){
  return function(elemento){
    return elemento.nombre_equipo.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.nombre_dependencia.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.nombre_usuario.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.sede.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.codigopatrimonialcpu.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.seriecpu.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.codigopatrimonialmonitor.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.seriemonitor.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.codigopatrimonialteclado.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.serieteclado.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.marcamouse.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.seriemouse.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.estado.toString().toLowerCase().includes(busqueda.toLowerCase())
        ||elemento.observacion.toString().toLowerCase().includes(busqueda.toLowerCase())
        || !busqueda;
  }

}
const Buscar = () => {

  //const navigate = useNavigate();


  let [equipos, setEquipos] = useState([]);  // trae todo los datos y muestra
  // busqueda
  const [TablaEquipos, setTablaEquipos] = useState([]);
  const [busqueda, setBusqueda]= useState("");



    /* importante para no permitir mostrar la página */
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);  
  const usuarioL = usuarioLocal();


  useEffect(() => {
 

    const timeoutId= setTimeout(()=>  getEquipos()  , 200);

  
  
    return ()=>clearTimeout(timeoutId);
    },[]);

  // API - EQUIPOS
  const getEquipos = async () => {
   
      const rutaServicio = ApiWebUrl+ "equipo";
      fetch(rutaServicio)
      .then( res => res.json() )
         .then(
                (result) => {
                      //console.log(result);
                      setEquipos(result);
                      setTablaEquipos(result); /* para la busqueda */
                    //  SetLoading(false);
                 }
              );
   
 
  };


   
  const handleChange=e=>{
    //setBusqueda(e.target.value);
    //filtrar(e.target.value);
  }
  
  const filtrar=(terminoBusqueda)=>{
    let resultadosBusqueda=TablaEquipos.filter((elemento) =>{
      if( elemento.nombre_equipo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        /*||elemento.nombre_dependencia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.nombre_usuario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.sede.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.marca_equipo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.codigopatrimonialcpu.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.seriecpu.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.codigopatrimonialmonitor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.seriemonitor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.codigopatrimonialteclado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.serieteclado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.marcamouse.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.seriemouse.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.estado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.observacion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.fecha_actualizada.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())*/
        ){ // busqueda por nombre dependencia
        return elemento;
      }
    });
    setEquipos(resultadosBusqueda);// ACTUALIZAR LA TABLA
  }

  


 // limpiar buscador
  const Limpiarbuscador=()=>{ 
     //setBusqueda("");
     //getEquipos();
  }



  return (
    <>
 
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Buscar 2"
            name="busqueda"
            onChange={e=> setBusqueda(e.target.value)}
          />
          <img className="search" src={search} alt='search' onClick={() => filtrar(busqueda)}  />

       
    </>

  );
};
export default Buscar;







