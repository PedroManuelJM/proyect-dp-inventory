import React, { useState, useEffect } from "react";
import {useNavigate,Link } from "react-router-dom";
import search from '../assets/images/borrar.png';

import add from '../assets/images/add.png';
import Swal from 'sweetalert2';
import { ExportToExcel } from "./ExportToExcel";
import { usuarioLocal,ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
const Equipo = () => {

  // PAGINACION
  
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10); // colocamos cuanto queremos mostrar por p??gina


  //const navigate = useNavigate();

  const [loading,SetLoading]=useState(false);
  let [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
  let [equipos, setEquipos] = useState([]);  // trae todo los datos y muestra
  // busqueda
  const [TablaEquipos, setTablaEquipos] = useState([]);
  const [busqueda, setBusqueda]= useState('');

  const fileName = "REPORTE_EQUIPOS"; // here enter filename for your excel file

    /* importante para no permitir mostrar la p??gina */
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);  
  const usuarioL = usuarioLocal();
  
  const [showNav,setShowNav] =useState(false); // para el navbar

  /* IMPORTANTE PARA LA PAGINACI??N */
  const lastPost = number * postPerPage; // ULTIMA P??GINA
  const firstPost = lastPost - postPerPage; // PRIMERA P??GINA
  const currentPost = equipos.slice(firstPost, lastPost); // TOTAL DE PAGINACI??N
  const pageNumber = [];



  for (let i = 1; i <= Math.ceil(equipos.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };

  useEffect(() => {
 
    //SetLoading(true);
    //setPop(false);
    //setPopActualizar(false);
    //setPopAbrirMantenimiento(false);
     getEquipos(); // importante
   // getDependencias();
    //const timeoutId= setTimeout(()=>  getEquipos()  , 200);
    //fechaactual();
    //anioactual();
  
    if (usuarioL !== null) {
      setUsuario(usuarioL)
    }else{
      Swal.fire({
           title: `P??gina no Permitida`,
           text: ' ?? Debes iniciar sesi??n. !',
           timer: 1000,
           icon: "info",
           timerProgressBar: true,
     })
      // direcciona a la p??gina principal
      navigate('/login')
    
    }
   //getEquipos();
  //  return ()=>clearTimeout(timeoutId);
    },[]);
//  const [nombredependencia, setNombreDependencia ] = useState('')  // variable para registrar

  /* DATOS PARA REGISTRAR */
/*
  const [nombreequipo, setNombreEquipo]= useState("");
  const [iddependencia, setIdDependencia]= useState("");
  const [oficina, setOficina]= useState("");
  const [usuarioequipo, setUsuarioEquipo]= useState("");
  const [sede,setSede]= useState("");
  const [tipoordenador,setTipoordenador]= useState("");
  const [marcaequipo, setMarcaEquipo]= useState("");
  const [procesador, setProcesador]= useState("");
  const [tipoprocesador, setTipoProcesador]= useState("");
  const [sistemaoperativo, setSistemaOperativo]= useState("");
  const [memoriaram, setMemoriaram]= useState("");
  const [capacidaddiscoduro, setCapacidadDiscoDuro]= useState("");
  const [codcpu,setCodCpu]= useState("");
  const [seriecpu,setSerieCpu]= useState("");
  const [codmonitor,setCodMonitor]= useState("");
  const [seriemonitor,setSerieMonitor]= useState("");
  const [codteclado,setCodTeclado]= useState("");
  const [serieteclado,setSerieTeclado]= useState("");
  const [marcamouse,setMarcaMouse]= useState("");
  const [seriemouse,setSerieMouse]= useState("");
  const [codestabilizador,setCodEstabilizador]= useState("");
  const [serieestabilizador,setSerieEstabilizador]= useState("");
  const [tipoconexion,setTipoConexion]= useState("");
  const [estado,setEstado]= useState("");
  const [fechaadquisicion,setFechaAdquisicion]= useState("");
  const [observacion,setObservacion]= useState("");
  const [tecnicoinventario,setTecnicoInventario]= useState("");
  const [fechaActualizada,setFechaActualizada]= useState("");
  //
  const [idequipo,setIdEquipo]=useState("");
  //
  const [tecnico_mantenimiento,setTecnicoMantenimiento]=useState("");
  const [fechaMantenimiento,setFechaMantenimiento]=useState("");
  const [anio,setAnio]=useState("");
  const [observacion_mantenimiento,setObservacionMantenimiento]=useState("");*/
  
  /* MODAL REGISTRO 
  const [popup,setPop]=useState(false);
  /* MODAL EDITAR 
  const [popupactualizar,setPopActualizar]=useState(false);
  /* MODAL MANTENIMIENTO 
   const [popupAbrirMantenimiento,setPopAbrirMantenimiento]=useState(false)
   */

  // API - EQUIPOS
  const getEquipos = async () => {
   
      const rutaServicio = ApiWebUrl+ "equipo";
      fetch(rutaServicio)
      .then( res => res.json() )
         .then(
                (result) => {
                        //console.log(result);
                        setEquipos(result)
                        setTablaEquipos(result); /* para la busqueda */
                    //  SetLoading(false);
                 }
              )
   
 
  };

// API - DEPENDENCIA
  const getDependencias = async () => {
 
     const rutaServicio =  ApiWebUrl+ "dependencia";
     fetch(rutaServicio)
     .then( res => res.json() )
        .then(
               (result) => {
                    // console.log(result);
                     setDependencia(result);
                     SetLoading(false);
                }
             )
   };
 
 
  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  
  const filteravanzado=(event)=> {
    setNumber(1);
    var text = event.target.value
    console.log(text)
    const data = TablaEquipos
    //this.state.listaBackup2
                

    const newData = data.filter(function (item) {

      const itemDataNomEquipo = item.nombre_equipo.toUpperCase()
      const itemDataNombDepen= item.nombre_dependencia.toUpperCase()
      const itemDataNombUsuar= item.nombre_usuario.toUpperCase()
     // const itemDataSede= item.sede.toUpperCase()
     // const itemMarcaEquipo= item.marca_equipo.toUpperCase()
      const itemDatacodigopatrimonialcpu= item.codigopatrimonialcpu.toUpperCase()
      const itemDataseriecpu= item.seriecpu.toUpperCase()
      const itemDatacodigopatrimonialmonitor= item.codigopatrimonialmonitor.toUpperCase()
      const itemDataseriemonitor= item.seriemonitor.toUpperCase()
      const itemDatacpteclado= item.codigopatrimonialteclado.toUpperCase()
      const itemDatasrteclado= item.serieteclado.toUpperCase()
      const itemDatamarcamouse =item.marcamouse.toUpperCase()
      const itemDataseriemouse= item.seriemouse.toUpperCase()
      const itemDataObservacion= item.observacion.toUpperCase()

      const campo = itemDataNomEquipo+" "+itemDataNombDepen+" "+itemDataNombUsuar+" "+itemDatacodigopatrimonialcpu+" "+itemDataseriecpu+" "+itemDatacodigopatrimonialmonitor +" "+itemDataseriemonitor+" "+itemDatacpteclado+" "+itemDatasrteclado+" "+itemDatamarcamouse+" "+itemDataseriemouse+" "+itemDataObservacion
      const textData = text.toUpperCase()
      return campo.indexOf(textData) > -1
    })
    setEquipos(newData)
    setBusqueda(text)
    /*
    this.setState({
      listaAviso2: newData,
      textBuscar2: text,
    })*/

  }

  const filtrar=(terminoBusqueda)=>{
    setNumber(1);
    let resultadosBusqueda=equipos.filter((elemento) =>{
      if( elemento.nombre_equipo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ||elemento.nombre_dependencia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
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
        ||elemento.fecha_actualizada.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){ // busqueda por nombre dependencia
        return elemento;
      }
    });
    setEquipos(resultadosBusqueda);// ACTUALIZAR LA TABLA
  }
/*
  const mostrarFecha = fecha=>{
    const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
    alert(fecha.toLocaleDateString('es-ES'), options);
  }*/

  //  6- USAMOS USEEFFECT
 

 /* MODAL REGISTRAR*/
  /*
  const handleClickOpen=()=>{ //ABRIR MODAL
        setPop(!popup)
        LimpiarFormulario()
  }

  const closePopup=()=>{ // CERRAR MODAL
        setPop(false)
        LimpiarFormulario()
  }*/

 /* MODAL ACTUALIZAR
  const handleClickOpenActualizar=(e)=>{ //ABRIR MODAL
      setPopActualizar(!popupactualizar)
  }

  const closePopupActualizar=()=>{ // CERRAR MODAL
      setPopActualizar(false)
  }
  /* MODAL MANTENIMIENTO
  const handleClickOpenMantenimiento=()=>{ //ABRIR MODAL
    // LimpiarFormularioManto()
       setPopAbrirMantenimiento(!popupAbrirMantenimiento)
  }

  const closePopupMantenimiento=()=>{ // CERRAR MODAL
     setPopAbrirMantenimiento(false)
   
  }*/

  /*
  const LimpiarFormulario=()=>{
    setNombreEquipo('')
    setIdDependencia('')
    setOficina('')
    setUsuarioEquipo('')
    setSede('')
    setTipoordenador('')
    setMarcaEquipo('')
    setProcesador('')
    setTipoProcesador('')
    setSistemaOperativo('')
    setMemoriaram('')
    setCapacidadDiscoDuro('')
    setCodCpu('')
    setSerieCpu('')
    setCodMonitor('')
    setSerieMonitor('')
    setCodTeclado('')
    setSerieTeclado('')
    setMarcaMouse('')
    setSerieMouse('')
    setCodEstabilizador('')
    setSerieEstabilizador('')
    setTipoConexion('')
    setEstado('')
    setFechaAdquisicion('')
    setObservacion('')
  }
  */

  /*
  const registrar  =  (e) => {
    e.preventDefault();
    const rutaServicio =  ApiWebUrl + "registrarequipo" ;
    //const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaformateada = fechaadquisicion.toLocaleDateString('es-ES');
    
    const data = { nombre_equipo: nombreequipo,
                   iddependencia:iddependencia,
                   oficina:oficina,
                   nombre_usuario:usuarioequipo,
                   sede:sede,
                   tipo_ordenador:tipoordenador,
                   marca_equipo:marcaequipo,
                   procesador:procesador,
                   tipo_procesador:tipoprocesador,
                   sistema_operativo:sistemaoperativo,
                   memoriaram:memoriaram,
                   capacidad_discoduro:capacidaddiscoduro,
                   codigopatrimonialcpu:codcpu,
                   seriecpu:seriecpu,
                   codigopatrimonialmonitor:codmonitor,
                   seriemonitor:seriemonitor,
                   codigopatrimonialteclado:codteclado,
                   serieteclado:serieteclado,
                   marcamouse:marcamouse,
                   seriemouse:seriemouse,
                   codigopatrimonialestabilizador:codestabilizador,
                   serieestabilizador:serieestabilizador,
                   tipo_conexion:tipoconexion,
                   estado:estado,
                   fecha_adquisicion:fechaformateada,
                   observacion:observacion,
                   tecnico_inventario:usuario.nombres,
                   fecha_actualizada:fechaActualizada  
    };
    //Asi se agregan todos los par??metros que el servicio requiera (nombre del par??metro , valor que se env??a)  
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
                title: 'Registrado el equipo '+ nombreequipo,
                showConfirmButton: false,
                timer: 1500
              })
              closePopup();
              getEquipos();
             // getDependencias(); // importante
             //  setNombreDependencia(""); //limpiando
            }
        )
  }*/


  /*
  const registrarmantenimiento  =  (e) => {
    e.preventDefault();
    const rutaServicio =  ApiWebUrl + "registrarmantenimiento" ;
    //const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaformateada = fechaMantenimiento.toLocaleDateString('es-ES');
    
    const data = { idequipo: idequipo,
                   iddependencia:iddependencia,
                   fecha_mantenimiento:fechaformateada,
                   anio:anio,
                   observacion_mantenimiento:observacion_mantenimiento,
                   tecnico_mantenimiento:tecnico_mantenimiento
                   
    };
    //Asi se agregan todos los par??metros que el servicio requiera (nombre del par??metro , valor que se env??a)  
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
              closePopupMantenimiento();
              LimpiarFormularioManto();
              getEquipos();
             // getDependencias(); // importante
             //  setNombreDependencia(""); //limpiando
            }
        )
  }
 */


  const fechaactual =()=>{
    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    //console.log(output);

    //setFechaActualizada(output)

  }

  const anioactual =()=>{
    let date = new Date();
    let output = date.getFullYear();
    //console.log(output);

    //  setAnio(output)

  }
  const eliminar = (eq) => 
  {
  
    Swal.fire({
      title:  `Esta seguro de eliminar `+eq.nombre_equipo+`? `,
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        const rutaServicio =  ApiWebUrl + `eliminarequipo/${eq.idequipo}`;
 
        fetch(rutaServicio, {
          method: 'DELETE',
        })
          .then(
            () => {
                getEquipos(); // importante
            }
          )

        Swal.fire(
          'Eliminado satisfactoriamente'
        )
      }
    })

  };

 // limpiar buscador
  const Limpiarbuscador=()=>{ 
     setBusqueda("");
     getEquipos();
  }

/*
  const abrireditar = (dep) =>{

    handleClickOpenActualizar();
    // PASANDO LOS DATOS PARA ACTUALIZAR
    setIdEquipo(dep.idequipo)
    setNombreEquipo(dep.nombre_equipo)
    setIdDependencia(dep.iddependencia)
    setOficina(dep.oficina)
    setUsuarioEquipo(dep.nombre_usuario)
    setSede(dep.sede)
    setTipoordenador(dep.tipo_ordenador)
    setMarcaEquipo(dep.marca_equipo)
    setProcesador(dep.procesador)
    setTipoProcesador(dep.tipo_procesador)
    setSistemaOperativo(dep.sistema_operativo)
    setMemoriaram(dep.memoriaram)
    setCapacidadDiscoDuro(dep.capacidad_discoduro)
    setCodCpu(dep.codigopatrimonialcpu)
    setSerieCpu(dep.seriecpu)
    setCodMonitor(dep.codigopatrimonialmonitor)
    setSerieMonitor(dep.seriemonitor)
    setCodTeclado(dep.codigopatrimonialteclado)
    setSerieTeclado(dep.serieteclado)
    setMarcaMouse(dep.marcamouse)
    setSerieMouse(dep.seriemouse)
    setCodEstabilizador(dep.codigopatrimonialestabilizador)
    setSerieEstabilizador(dep.serieestabilizador)
    setTipoConexion(dep.tipo_conexion)
    setEstado(dep.estado)
    setFechaAdquisicion(dep.fecha_adquisicion)
    setObservacion(dep.observacion)
    setTecnicoInventario(dep.tecnico_inventario)
   // setFechaActualizada(dep.fecha_actualizada)
  }*/
/*
 const actualizar = (e)=>{
 e.preventDefault();
 const rutaServicio = ApiWebUrl + `actualizarequipo/${idequipo}`;

 const data = {    nombre_equipo: nombreequipo,
                   iddependencia:iddependencia,
                   oficina:oficina,
                   nombre_usuario:usuarioequipo,
                   sede:sede,
                   tipo_ordenador:tipoordenador,
                   marca_equipo:marcaequipo,
                   procesador:procesador,
                   tipo_procesador:tipoprocesador,
                   sistema_operativo:sistemaoperativo,
                   memoriaram:memoriaram,
                   capacidad_discoduro:capacidaddiscoduro,
                   codigopatrimonialcpu:codcpu,
                   seriecpu:seriecpu,
                   codigopatrimonialmonitor:codmonitor,
                   seriemonitor:seriemonitor,
                   codigopatrimonialteclado:codteclado,
                   serieteclado:serieteclado,
                   marcamouse:marcamouse,
                   seriemouse:seriemouse,
                   codigopatrimonialestabilizador:codestabilizador,
                   serieestabilizador:serieestabilizador,
                   tipo_conexion:tipoconexion,
                   estado:estado,
                   fecha_adquisicion:fechaadquisicion,
                   observacion:observacion,
                   tecnico_inventario:usuario.nombres,
                   fecha_actualizada:fechaActualizada,
                   idequipo:idequipo
};

  //Asi se agregan todos los par??metros que el servicio requiera (nombre del par??metro , valor que se env??a)  
  fetch(rutaServicio, {
    method: 'PUT',
    body:  JSON.stringify(data) ,//formData
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
      .then(
          res => res.json()
      )
      .then(
          (result) => {
            Swal.fire({
              icon: 'success',
              title: 'Actualizado el equipo '+ nombreequipo,
              showConfirmButton: false,
              timer: 1500
            })
            closePopupActualizar();
            getEquipos(); // importante para refrescar los equipos actualizados
             
          }
      )

 }
*/

/*
const abrirmantenimiento=(dep) =>{
      handleClickOpenMantenimiento()
      setIdEquipo(dep.idequipo)
      setNombreEquipo(dep.nombre_equipo)
      setIdDependencia(dep.iddependencia)
      setOficina(dep.oficina)
      setUsuarioEquipo(dep.nombre_usuario)

}

const LimpiarFormularioManto=()=>{ 
  setFechaMantenimiento('')
  setObservacionMantenimiento('')
  setTecnicoMantenimiento('')
  //getEquipos()

}*/
  const total =  equipos.length;
  return (
    <>
    {loading ? "Cargando.....":""}
      <div className=''>
          <header> <FontAwesomeIcon icon={faBars} style={{color:"#fff"}} onClick={()=> setShowNav(!showNav)} /> </header>
          <Navbar show={showNav}/>
      </div>
      <br></br>
      <div className="container contenedor-tabla">
          <div className="row">
              <div className="col-md-4">
                
                <Link to="/registrarequipo" style={{textDecoration:"none"}}> <img className="add" src={add} alt='add'  /> <span style={{color:"black"}}>Registrar Equipo</span></Link>
              
                <ExportToExcel apiData={equipos} fileName={fileName} />
            
              </div>
          <div className="col-md-5">
              <div className="containerInput">
                  <input className="form-control" placeholder="&#128270; Buscar ...  " value={busqueda}  onChange={(busqueda) => filteravanzado(busqueda)} />
                  <img className="search" src={search} alt='search' onClick={() => Limpiarbuscador()} />
              </div>
              </div>
          </div>
      
          <div className="my-1 text-center">
              <button
                className="rounded-circle" style={{background:"black"}} 
                onClick={() => setNumber(number - 1)}
              >
              <FontAwesomeIcon icon={faArrowLeft} style={{color:"red"}} /> 
              </button>

              {pageNumber.map((Elem) => {
                return (
                  <>
                    <button
                      className="m-1 text-center btn-sm btn-outline-dark rounded-circle"
                      onClick={() => ChangePage(Elem)}
                    >
                      {Elem}
                    </button>
                  </>
                );
              })}
              <button
                className="rounded-circle" style={{background:"black"}} 
                onClick={() => setNumber(number + 1)}
              >
                <FontAwesomeIcon icon={faArrowRight} style={{color:"red"}} /> 
              </button>
          </div>

          <h6> # TOTAL DE COMPUTADORAS: {total} </h6>
          <div className="" id="div1">
            <table className="table table-striped table-responsive" width="100%" id="table">
              <thead>
                <tr>
                  <th style={{ display: "none" }}>ID</th>
                  <th>ACCIONES</th>
                  <th>PDF MANT.</th>
                  <th>REGISTRAR MANTO</th>
                  <th>NOMBRE EQUIPO</th>
                  <th>DEPENDENCIA</th>
                  <th>OFICINA</th>
                  <th>USUARIO</th>
                  <th>SEDE</th>
                </tr>

              </thead>

              <tbody>
              {currentPost.map((pc)=>{
                return <VistaEquipo key={pc.idequipo} pc={pc} />

              })}
              </tbody>
            </table>
       
            
          </div>

    
      


      </div>
      <br></br>
            
    </>

  );
};
export default Equipo;
/*
     <th>ACCIONES</th>
                  <th>PDF MANT.</th>
                  <th>REGISTRAR MANTO</th>
                  <th>NOMBRE EQUIPO</th>
                  <th>DEPENDENCIA</th>
                  <th>OFICINA</th>
                  <th>USUARIO</th>
                  <th>SEDE</th>
                  <th>TIPO ORDENADOR</th>
                  <th>MARCA EQUIPO</th>
                  <th>PROCESADOR</th>
                  <th>TIPO PROCESADOR</th>
                  <th>SISTEMA OPERATIVO</th>
                  <th>MEMORIA RAM</th>
                  <th>CAPACIDAD DEL DISCO DURO</th>
                  <th>C??DIGO P. CPU</th>
                  <th>SERIE. CPU</th>
                  <th>C??DIGO P. MONITOR</th>
                  <th>SERIE. MONITOR</th>
                  <th>C??DIGO P. TECLADO</th>
                  <th>SERIE. TECLADO</th>
                  <th>C??DIGO P. MOUSE</th>
                  <th>SERIE. MOUSE</th>
                  <th>C??DIGO P. ESTABILIZADOR</th>
                  <th>SERIE. ESTABILIZADOR</th>
                  <th>TIPO CONEXI??N</th>
                  <th>ESTADO</th>
                  <th>FECHA ADQUISICI??N</th>
                  <th>OBSERVACI??N</th>
                  <th>ACTUALIZADO POR</th>
                  <th>FECHA ACTUALIZADA</th>




busqueda
     <input                              value={busqueda}
                                              onChange={(ev) => setBusqueda(ev.target.value)}
                                              type="text"
                                              required
                                              className='form-control'
                                              placeholder="Buscar"
                                              id="inputBuscar"></input>
      
  
          <img className="search" src={search} alt='search' onClick={() => filtrar(busqueda)}  />

          

{equipos.slice(0,4).map((pc)=>{
              return <VistaEquipo key={pc.idequipo} pc={pc} />

            })}
 
*/

/*
        <div className="" id="div1">
          <table className="table table-striped table-responsive" width="100%" id="table">
            <thead>
              <tr>
                <th style={{ display: "none" }}>ID</th>
                <th>ACCIONES</th>
                <th>PDF MANT.</th>
                <th>REGISTRAR MANTO</th>
                <th>NOMBRE EQUIPO</th>
                <th>DEPENDENCIA</th>
                <th>OFICINA</th>
                <th>USUARIO</th>
                <th>SEDE</th>
                <th>TIPO ORDENADOR</th>
                <th>MARCA EQUIPO</th>
                <th>PROCESADOR</th>
                <th>TIPO PROCESADOR</th>
                <th>SISTEMA OPERATIVO</th>
                <th>MEMORIA RAM</th>
                <th>CAPACIDAD DEL DISCO DURO</th>
                <th>C??DIGO P. CPU</th>
                <th>SERIE. CPU</th>
                <th>C??DIGO P. MONITOR</th>
                <th>SERIE. MONITOR</th>
                <th>C??DIGO P. TECLADO</th>
                <th>SERIE. TECLADO</th>
                <th>C??DIGO P. MOUSE</th>
                <th>SERIE. MOUSE</th>
                <th>C??DIGO P. ESTABILIZADOR</th>
                <th>SERIE. ESTABILIZADOR</th>
                <th>TIPO CONEXI??N</th>
                <th>ESTADO</th>
                <th>FECHA ADQUISICI??N</th>
                <th>OBSERVACI??N</th>
                <th>ACTUALIZADO POR</th>
                <th>FECHA ACTUALIZADA</th>
              </tr>

            </thead>

            <tbody>
              
              {equipos.length === 0 && <div> <h5> No se encontr?? en la base de datos. </h5> </div>}

              
              {equipos && equipos.filter(searchingTerm(busqueda)).map((eq) => (
                
                <tr className="table-dark" key={eq.idequipo}>

                  <td className="" style={{ display: "none" }}> {eq.idequipo}</td>
                  <td className="">
                    <span>
                    <Link to={`/equipo/${eq.idequipo}`} > <img className="edit" src={edit} alt='edit'/> </Link> 
                    </span>
                    <span>
                      <img className="delete" src={delet} alt='delete' onClick={() => eliminar(eq)} />
                    </span>
                  </td>
                  <td> <Link to={`/pdf/${eq.idequipo}`} className="" target="_blank"> <img className="edit" src={pdf} alt='pdf'/> </Link></td>     
                  <td className=""><Link to={`/registrarmantenimiento/${eq.idequipo}`}> <img className="edit" src={mantenimiento} alt='mantenimiento'/> </Link></td>     
                  <td className=""> {eq.nombre_equipo}</td>
                  <td className="" style={{ display: "none" }}> {eq.iddependencia}</td>
                  <td className=""> {eq.nombre_dependencia}</td>
                  <td className=""> {eq.oficina}</td>
                  <td className=""> {eq.nombre_usuario}</td>
                  <td className=""> {eq.sede}</td>
                  <td className=""> {eq.tipo_ordenador}</td>
                  <td className=""> {eq.marca_equipo}</td>
                  <td className=""> {eq.procesador}</td>
                  <td className=""> {eq.tipo_procesador}</td>
                  <td className=""> {eq.sistema_operativo}</td>
                  <td className=""> {eq.memoriaram}</td>
                  <td className=""> {eq.capacidad_discoduro}</td>
                  <td className=""> {eq.codigopatrimonialcpu}</td>
                  <td className=""> {eq.seriecpu}</td>
                  <td className=""> {eq.codigopatrimonialmonitor}</td>
                  <td className=""> {eq.seriemonitor}</td>
                  <td className=""> {eq.codigopatrimonialteclado}</td>
                  <td className=""> {eq.serieteclado}</td>
                  <td className=""> {eq.marcamouse}</td>
                  <td className=""> {eq.seriemouse}</td>
                  <td className=""> {eq.codigopatrimonialestabilizador}</td>
                  <td className=""> {eq.serieestabilizador}</td>
                  <td className=""> {eq.tipo_conexion}</td>
                  <td className=""> {eq.estado}</td>
                  <td className=""> {eq.fecha_adquisicion}</td>
                  <td className=""> {eq.observacion}</td>
                  <td className=""> {eq.tecnico_inventario}</td>
                  <td className=""> {eq.fecha_actualizada}</td>
           
                </tr>

              ))}

            </tbody>
          </table>
          <br></br>
        </div>
      

*/





/*
    <div>
    {
      popupAbrirMantenimiento ?
        <div className="main3">
          <div className="popup-mantenimiento">
            <div className="popup-header container">
              <img className="cancel float-right" onClick={closePopupMantenimiento} src={cancel} alt='cancel' />
              <h4 className="text-center"> <b> REGISTRAR MANTENIMIENTO </b> </h4>
        
            </div>

            <div className="container">
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
                      value={oficina}
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
                    <label htmlFor="inputDependencia" className="form-label"> <b>T??CNICO DE SOPORTE </b></label>
                    <br></br>
                    <select className="form-control" id="exampleFormControlSelect10" name="sede" onChange={(e) => setTecnicoMantenimiento(e.target.value)} value={tecnico_mantenimiento} required >
                      <option selected>Seleccione el t??cnico </option>
                      <option value="CRISTIAN SANCHEZ">CRISTIAN SANCHEZ</option>
                      <option value="MANUEL JURADO">MANUEL JURADO</option>
                      <option value="MIGUEL LOPEZ">MIGUEL LOPEZ</option>
                    </select>
                  </div>

       
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea2"><b>OBSERVACI??N</b></label>
                  <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" value={observacion_mantenimiento} onChange={(e) => setObservacionMantenimiento(e.target.value)}></textarea>
                </div>


                <br></br>
                <button type='submit' className='btn btn-success'>Guardar</button>
              </form>
            </div>
          </div>
        </div> : ""
    }
        </div>

*/


/*
      <div>
          {
            popupactualizar ?
              <div className="main">
                <div className="popup-equipo">
                  <div className="popup-header container">
                    <img className="cancel float-right" onClick={closePopupActualizar} src={cancel} alt='cancel' />
                    <h4 className="text-center"> EDITAR EQUIPO  <b>{nombreequipo}</b> </h4>

                  </div>

                  <div className="container">
                    <form onSubmit={actualizar}>

                     <hr></hr>
                      <div className="row">
                        <div className="container" >
                          <input value={fechaActualizada} style={{ float: "right" ,display:"none"}} disabled />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>NOMBRE EQUIPO</b> </label>
                          <input
                            value={nombreequipo}
                            onChange={(e) => setNombreEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>TIPO DE ORDENADOR</b> </label>
                          <input
                            value={tipoordenador}
                            onChange={(e) => setTipoordenador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>MARCA EQUIPO</b> </label>
                          <input
                            value={marcaequipo}
                            onChange={(e) => setMarcaEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>


                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>USUARIO</b> </label>
                          <input
                            value={usuarioequipo}
                            onChange={(e) => setUsuarioEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4" className="form-label"> <b>FECHA DE ADQUISICI??N</b> </label>
                
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          className="form-control pickers" 
                          locale="es" 
                          value={fechaadquisicion}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={15}
                          scrollableYearDropdown
                          placeholderText="Seleccionar fecha"
                          onChange={(date) => {
                            const d = new Date(date).toLocaleDateString();
                            console.log(d);
                            setFechaAdquisicion(d);
                          }}
                        />
                      
                        </div>


                        <div className="form-group col-md-4">
                          <label htmlFor="inputDependencia" className="form-label"> <b>ESTADO</b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="distrito" onChange={(e) => setEstado(e.target.value)} value={estado} required >
                            <option selected>Seleccione el estado </option>
                            <option value="OPERATIVO">OPERATIVO</option>
                            <option value="INOPERATIVO">INOPERATIVO</option>
                            <option value="BAJA">BAJA</option>
                            <option value="SIN USO">SIN USO</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="inputDependencia" className="form-label"> <b>DEPENDENCIA</b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="distrito" onChange={(e) => setIdDependencia(e.target.value)} value={iddependencia} required >
                            <option selected>Seleccione la dependencia </option>
                            {dependencias && dependencias.map((dep) => (
                              <option value={dep.iddependencia}> {dep.nombre_dependencia}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>OFICINA</b> </label>
                          <input
                            value={oficina}
                            onChange={(e) => setOficina(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputDependencia" className="form-label"> <b>SEDE</b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="distrito" onChange={(e) => setSede(e.target.value)} value={sede} required >
                            <option selected>Seleccione su sede </option>
                            <option value="PALACIO">PALACIO</option>
                            <option value="EDIFICIO">EDIFICIO</option>
                            <option value="LORETO">LORETO</option>
                          </select>
                        </div>

                      </div>

                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>PROCESADOR</b> </label>
                          <input
                            value={procesador}
                            onChange={(e) => setProcesador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>TIPO DE PROCESADOR</b> </label>
                          <input
                            value={tipoprocesador}
                            onChange={(e) => setTipoProcesador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>


                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>SISTEMA OPERATIVO</b> </label>
                          <input
                            value={sistemaoperativo}
                            onChange={(e) => setSistemaOperativo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>MEMORIA RAM </b> </label>
                          <input
                            value={memoriaram}
                            onChange={(e) => setMemoriaram(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>CAPACIDAD DEL DISCO DURO</b> </label>
                          <input
                            value={capacidaddiscoduro}
                            onChange={(e) => setCapacidadDiscoDuro(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>COD.PAT / CPU</b> </label>
                          <input
                            value={codcpu}
                            onChange={(e) => setCodCpu(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>SERIE / CPU</b> </label>
                          <input
                            value={seriecpu}
                            onChange={(e) => setSerieCpu(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>COD.PAT / MONITOR</b> </label>
                          <input
                            value={codmonitor}
                            onChange={(e) => setCodMonitor(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>SERIE / MONITOR</b> </label>
                          <input
                            value={seriemonitor}
                            onChange={(e) => setSerieMonitor(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>COD.PAT / TECLADO</b> </label>
                          <input
                            value={codteclado}
                            onChange={(e) => setCodTeclado(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>SERIE / TECLADO</b> </label>
                          <input
                            value={serieteclado}
                            onChange={(e) => setSerieTeclado(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>


                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>MARCA / MOUSE</b> </label>
                          <input
                            value={marcamouse}
                            onChange={(e) => setMarcaMouse(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="inputEmail4" className="form-label"> <b>SERIE / MOUSE</b> </label>
                          <input
                            value={seriemouse}
                            onChange={(e) => setSerieMouse(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>COD.PAT / ESTABILIZADOR</b> </label>
                          <input
                            value={codestabilizador}
                            onChange={(e) => setCodEstabilizador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>SERIE / ESTABILIZADOR</b> </label>
                          <input
                            value={serieestabilizador}
                            onChange={(e) => setSerieEstabilizador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="inputEmail4" className="form-label"> <b>TIPO DE CONEXI??N </b> </label>
                          <input
                            value={tipoconexion}
                            onChange={(e) => setTipoConexion(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1"><b>OBSERVACI??N</b></label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={observacion} onChange={(e) => setObservacion(e.target.value)}></textarea>
                      </div>
                      <br></br>
                      <button type='submit' className='btn btn-success'>Guardar</button>
                    </form>
                  </div>
                </div>
              </div> : ""
          }
        </div>

*/