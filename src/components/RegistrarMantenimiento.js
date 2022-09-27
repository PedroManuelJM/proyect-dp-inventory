import React, { useState, useEffect } from "react";
import {useNavigate,useParams} from "react-router-dom";
import Swal from 'sweetalert2';
import { usuarioLocal,ApiWebUrl } from "../utils";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import es from 'date-fns/locale/es';
import Navbar from "./Navbar";
registerLocale("es", es);

function RegistrarMantenimiento() {
    /* MODAL REGISTRAR*/
  
    const [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
   
    const {id}=useParams() //parametro que es enviado por router
    const navigate = useNavigate();
    /* DATOS ADICIONALES */
    const [nombreequipo,setNombreEquipo]=useState("");
    const [usuarioequipo,setUsuarioEquipo]=useState("");
    const [nombredependencia,setNombreDependencia]=useState("");
    const [sede,setSede]=useState("");
    const [oficina,setOficina]=useState("");

    /* DATOS PARA REGISTRAR MANTO*/
    const [tecnico_mantenimiento,setTecnicoMantenimiento]=useState("");
    const [fechaMantenimiento,setFechaMantenimiento]=useState("");
    const [anio,setAnio]=useState("");
    const [observacion_mantenimiento,setObservacionMantenimiento]=useState("");

    const [usuario, setUsuario] = useState(null);  
    const usuarioL = usuarioLocal();
    const [showNav,setShowNav] =useState(false); // para el navbar

     const anioactual =()=>{
        let date = new Date();
        let output = date.getFullYear();
        setAnio(output)
    }
    const registrarmantenimiento  =  (e) => {
        e.preventDefault();
        const rutaServicio =  ApiWebUrl + "registrarmantenimiento" ;
        //const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
        const fechaformateada = fechaMantenimiento.toLocaleDateString('es-ES');
        
        const data = { idequipo: id,
                       fecha_mantenimiento:fechaformateada,
                       anio:anio,
                       observacion_mantenimiento:observacion_mantenimiento,
                       tecnico_mantenimiento:tecnico_mantenimiento
                       
        };
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
        fetch(rutaServicio, {
           method: 'POST',
           body:  JSON.stringify(data) ,
           headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Registrado mantenimiento del equipo '+ nombreequipo,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  LimpiarFormularioManto();
                  navigate('/equipo');
                }
            )
    }

    const obtenerEquipoSolo= async (id) =>{

        const rutaServicio =  ApiWebUrl + `consultarequipo/${id}`;
        fetch(rutaServicio,{
           // method: 'GET',
          //  body: formData,
          headers: {"Content-type": "application/json; charset=UTF-8"}
         
        })
        .then(
            res => res.json()
        )
        .then((result) => {
            let valor = result;
            console.log(result)
            valor.map(function(val) {
             // let id= author.iddependencia;
          //   setId(val.iddependencia);
             setNombreEquipo(val.nombre_equipo);
             setUsuarioEquipo(val.nombre_usuario);
             setNombreDependencia(val.nombre_dependencia);
             setSede(val.sede)
             setOficina(val.oficina);

       
            });    
          })
    }

    const getDependencias = async () => {
        const rutaServicio =  ApiWebUrl+ "dependencia";
        fetch(rutaServicio)
        .then( res => res.json() )
           .then(
                  (result) => {
                        setDependencia(result);
                       
                   }
                )
    };
    

    const equipo = () => {
        navigate('/equipo')
    }
    
    const LimpiarFormularioManto=()=>{ 
        setFechaMantenimiento('')
        setObservacionMantenimiento('')
        setTecnicoMantenimiento('')
        //getEquipos()
      
    }
    useEffect(() => {
 
  
        obtenerEquipoSolo(id);
        getDependencias();
        //fechaactual();
        anioactual();

        if (usuarioL !== null) {
            setUsuario(usuarioL)
          }else{
            Swal.fire({
                 title: `Página no Permitida`,
                 text: ' ¡ Debes iniciar sesión. !',
                 timer: 1000,
                 icon: "info",
                 timerProgressBar: true,
           })
            // direcciona a la página principal
            navigate('/login')
          
          }
      
    },[id]);
    return (
    <>
        <div className=''>
            <header> <FontAwesomeIcon icon={faBars} style={{color:"#fff"}} onClick={()=> setShowNav(!showNav)} /> </header>
            <Navbar show={showNav}/>
        </div>
      
            <div className="container">
            <br></br>
            <h5><b>Registrar Mantenimiento del Equipo " {nombreequipo} "</b></h5>
            <form onSubmit={registrarmantenimiento}>
               <hr></hr>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail14" className="form-label"> <b>NOMBRE DEL EQUIPO</b> </label>
                    <input
                      value={nombreequipo}
                      onChange={(e) => setNombreEquipo(e.target.value)}
                      type="text"
                      className='form-control'
                      id="inputEmail14"
                    disabled/>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail15" className="form-label"> <b>DEPENDENCIA</b> </label>
                    <input
                      value={nombredependencia}
                      onChange={(e) => setOficina(e.target.value)}
                      type="text"
                      className='form-control'
                      id="inputEmail15"
                     disabled/>
                  </div>
                </div>


                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail16" className="form-label"> <b>USUARIO</b> </label>
                    <input
                      value={usuarioequipo}
                      onChange={(e) => setUsuarioEquipo(e.target.value)}
                      type="text"
                      className='form-control'
                      id="inputEmail16"
                    disabled/>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail16" className="form-label"> <b>SEDE</b> </label>
                    <input
                      value={sede}
                      onChange={(e) => setUsuarioEquipo(e.target.value)}
                      type="text"
                      className='form-control'
                      id="inputEmail16"
                    disabled/>
                  </div>

              </div>
                <div className="row">
                
                  <div className="form-group col-md-6">
                  <label htmlFor="inputEmail17" className="form-label"> <b>FECHA DEL MANTENIMIENTO</b> </label>
             
                  <DatePicker 
                    selected={fechaMantenimiento} 
                    onChange={(date) => setFechaMantenimiento(date)}
                    locale="es" className="form-control pickers" 
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={18}
                    scrollableYearDropdown
                    placeholderText="Seleccione la fecha"
                  />                  
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputDependencia" className="form-label"> <b>TÉCNICO DE SOPORTE </b></label>
                    <br></br>
                    <select className="form-control" id="exampleFormControlSelect10" name="sede" onChange={(e) => setTecnicoMantenimiento(e.target.value)} value={tecnico_mantenimiento} required >
                      <option selected>Seleccione el técnico </option>
                      <option value="CRISTIAN SANCHEZ">CRISTIAN SANCHEZ</option>
                      <option value="MANUEL JURADO">MANUEL JURADO</option>
                      <option value="MIGUEL LOPEZ">MIGUEL LOPEZ</option>
                    </select>
                  </div>

       
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea2"><b>OBSERVACIÓN</b></label>
                  <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" value={observacion_mantenimiento} onChange={(e) => setObservacionMantenimiento(e.target.value)}></textarea>
                </div>


                <br></br>
                <button type='submit' className='btn btn-success btn-sm' style={{float:"left", marginTop:"8px"}}>Guardar</button>
                <button type='button' className='btn btn-warning btn-sm' style={{float:"left",marginLeft:"25px", marginTop:"8px"}}  onClick={equipo}>Cancelar</button>
              </form>
        
            </div>
        </>
    );

}

export default RegistrarMantenimiento;
