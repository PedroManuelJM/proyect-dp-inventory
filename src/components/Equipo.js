import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import search from '../assets/images/borrar.png';
import cancel from '../assets/images/cancel.png';
import add from '../assets/images/add.png';
import edit from '../assets/images/edit.png';
import delet from '../assets/images/delete.png';
//import robot from '../assets/images/robot.gif';
import Swal from 'sweetalert2';
//import ReactHTMLTableToExcel from 'react-html-table-to-excel'; // excel
import { ExportToExcel } from "./ExportToExcel";
import { usuarioLocal,ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Equipo = () => {

  //const navigate = useNavigate();

  const [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
  const [equipos, setEquipos] = useState([]);  // trae todo los datos y muestra
  // busqueda
  const [TablaEquipos, setTablaEquipos] = useState([]);
  const [busqueda, setBusqueda]= useState("");

  const fileName = "inventario_equipos"; // here enter filename for your excel file

    /* importante para no permitir mostrar la página */
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);  
  const usuarioL = usuarioLocal();
  
  const [showNav,setShowNav] =useState(false); // para el navbar

//  const [nombredependencia, setNombreDependencia ] = useState('')  // variable para registrar

  /* DATOS PARA REGISTRAR */

  const [nombreequipo, setNombreEquipo]= useState('') 
  const [iddependencia, setIdDependencia]= useState('') 
  const [oficina, setOficina]= useState('') 
  const [usuarioequipo, setUsuarioEquipo]= useState('') 
  const [sede,setSede]= useState('')
  const [tipoordenador,setTipoordenador]= useState('')
  const [marcaequipo, setMarcaEquipo]= useState('') 
  const [procesador, setProcesador]= useState('') 
  const [tipoprocesador, setTipoProcesador]= useState('') 
  const [sistemaoperativo, setSistemaOperativo]= useState('') 
  const [memoriaram, setMemoriaram]= useState('') 
  const [capacidaddiscoduro, setCapacidadDiscoDuro]= useState('') 
  const [codcpu,setCodCpu]= useState('')
  const [seriecpu,setSerieCpu]= useState('')
  const [codmonitor,setCodMonitor]= useState('')
  const [seriemonitor,setSerieMonitor]= useState('')
  const [codteclado,setCodTeclado]= useState('')
  const [serieteclado,setSerieTeclado]= useState('')
  const [marcamouse,setMarcaMouse]= useState('')
  const [seriemouse,setSerieMouse]= useState('')
  const [codestabilizador,setCodEstabilizador]= useState('')
  const [serieestabilizador,setSerieEstabilizador]= useState('')
  const [tipoconexion,setTipoConexion]= useState('')
  const [estado,setEstado]= useState('')
  const [fechaadquisicion,setFechaAdquisicion]= useState('')
  const [observacion,setObservacion]= useState('')
  const [tecnicoinventario,setTecnicoInventario]= useState('')
  const [fecha,setFecha]= useState('')
 
  //
  const [idequipo,setIdEquipo]=useState('')
 // API - EQUIPOS
  const getEquipos = async () => {
    const rutaServicio = ApiWebUrl+ "equipo";
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    console.log(result);
                    setEquipos(result);
                    setTablaEquipos(result); /* para la busqueda */
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
                }
             )
   };
 
  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  
  const filtrar=(terminoBusqueda)=>{
    let resultadosBusqueda=TablaEquipos.filter((elemento) =>{
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



  //  6- USAMOS USEEFFECT
  useEffect(() => {
   
  getEquipos(); // importante
  getDependencias();

  fechaactual();

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

  },[]);


 /* MODAL REGISTRAR*/
  const [popup,setPop]=useState(false)
  const handleClickOpen=()=>{ //ABRIR MODAL
        setPop(!popup)
  }

  const closePopup=()=>{ // CERRAR MODAL
        setPop(false)
        LimpiarFormulario()
  }

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
  const registrar  =  (e) => {
    e.preventDefault();
    const rutaServicio =  ApiWebUrl + "registrarequipo" ;
   
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
                   fecha_adquisicion:fechaadquisicion,
                   observacion:observacion,
                   tecnico_inventario:usuario.nombres,
                   fecha_actualizada:fecha  
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
  }

  const fechaactual =()=>{
    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    //console.log(output);
    setFecha(output)
   
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
     setBusqueda('');
     getEquipos();
  }

  /* MODAL EDITAR */
  const [popupactualizar,setPopActualizar]=useState(false)

  const handleClickOpenActualizar=()=>{ //ABRIR MODAL
        setPopActualizar(!popupactualizar)
  }

  const closePopupActualizar=()=>{ // CERRAR MODAL
        setPopActualizar(false)
  }

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
    setFecha(dep.fecha_actualizada)
  }

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
                   fecha_actualizada:fecha,
                   idequipo:idequipo
};

  //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
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

  return (
    <>
    <div className=''>
        <header> <FontAwesomeIcon icon={faBars} style={{color:"#fff"}} onClick={()=> setShowNav(!showNav)} /> </header>
        <Navbar show={showNav}/>
    </div>
      <div className="container-fluid">
        <br></br>
        <span>
          <img className="add" src={add} alt='add' onClick={handleClickOpen} /> Registrar Equipo
        </span>

        <div className="containerInput">

          <ExportToExcel apiData={equipos} fileName={fileName} />
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Buscar"
            onChange={handleChange}
          />
          <img className="search" src={search} alt='search' onClick={Limpiarbuscador} />

        </div>
        <div className="" id="div1">
          <table className="table table-striped table-responsive" width="100%" id="table">
            <thead>
              <tr>
                <th style={{ display: "none" }}>ID</th>
                <th>ACCIONES</th>
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
                <th>CÓDIGO P. CPU</th>
                <th>SERIE. CPU</th>
                <th>CÓDIGO P. MONITOR</th>
                <th>SERIE. MONITOR</th>
                <th>CÓDIGO P. TECLADO</th>
                <th>SERIE. TECLADO</th>
                <th>CÓDIGO P. MOUSE</th>
                <th>SERIE. MOUSE</th>
                <th>CÓDIGO P. ESTABILIZADOR</th>
                <th>SERIE. ESTABILIZADOR</th>
                <th>TIPO CONEXIÓN</th>
                <th>ESTADO</th>
                <th>FECHA ADQUISICIÓN</th>
                <th>OBSERVACIÓN</th>
                <th>ACTUALIZADO POR</th>
                <th>FECHA ACTUALIZADA</th>
              </tr>

            </thead>

            <tbody>
              {equipos.length === 0 && <div> <h5> No se encontró en la base de datos. </h5> </div>}
              {equipos && equipos.map((eq) => (

                <tr className="table-dark" key={eq.idequipo}>

                  <td className="" style={{ display: "none" }}> {eq.idequipo}</td>
                  <td className="">
                    <span>
                      <img className="edit" src={edit} alt='edit' onClick={() => abrireditar(eq)} />
                    </span>
                    <span>
                      <img className="delete" src={delet} alt='delete' onClick={() => eliminar(eq)} />
                    </span>
                  </td>

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
        <div>
          {
            popup ?
              <div className="main">
                <div className="popup-equipo">
                  <div className="container">
                    <img className="cancel float-right" onClick={closePopup} src={cancel} alt='cancel' />
                    <h4 className="text-center"> REGISTRAR EQUIPO </h4>

                  </div>

                  <div className="container">
                    <form onSubmit={registrar}>
                     <hr></hr>
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>NOMBRE EQUIPO</b> </label>
                          <input
                            value={nombreequipo}
                            onChange={(e) => setNombreEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>TIPO DE ORDENADOR</b> </label>
                          <input
                            value={tipoordenador}
                            onChange={(e) => setTipoordenador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>


                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>MARCA EQUIPO</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>USUARIO</b> </label>
                          <input
                            value={usuarioequipo}
                            onChange={(e) => setUsuarioEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>FECHA DE ADQUISICIÓN</b> </label>
                          <input
                            value={fechaadquisicion}
                            onChange={(e) => setFechaAdquisicion(e.target.value)}
                            type="date"
                            dateFormat="dd/mm/yyyy" 
                            className='form-control fecha-adquisicion'
                            id="fecha-adquisicion"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputDependencia" className="form-label"> <b>ESTADO DEL EQUIPO </b></label>
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
                          <label for="inputDependencia" className="form-label"> <b>DEPENDENCIA</b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="dependencia" onChange={(e) => setIdDependencia(e.target.value)} value={iddependencia} required >
                            <option selected>Seleccione la dependencia </option>
                            {dependencias && dependencias.map((dep) => (
                              <option value={dep.iddependencia}> {dep.nombre_dependencia}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>OFICINA</b> </label>
                          <input
                            value={oficina}
                            onChange={(e) => setOficina(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputDependencia" className="form-label"> <b>SEDE</b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="sede" onChange={(e) => setSede(e.target.value)} value={sede} required >
                            <option selected>Seleccione su sede </option>
                            <option value="PALACIO">PALACIO</option>
                            <option value="EDIFICIO">EDIFICIO</option>
                            <option value="LORETO">LORETO</option>
                          </select>
                        </div>

                      </div>

                      <div className="row">
                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>PROCESADOR</b> </label>
                          <input
                            value={procesador}
                            onChange={(e) => setProcesador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>TIPO DE PROCESADOR</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>SISTEMA OPERATIVO</b> </label>
                          <input
                            value={sistemaoperativo}
                            onChange={(e) => setSistemaOperativo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>MEMORIA RAM </b> </label>
                          <input
                            value={memoriaram}
                            onChange={(e) => setMemoriaram(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>CAPACIDAD DEL DISCO DURO</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / CPU</b> </label>
                          <input
                            value={codcpu}
                            onChange={(e) => setCodCpu(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / CPU</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / MONITOR</b> </label>
                          <input
                            value={codmonitor}
                            onChange={(e) => setCodMonitor(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / MONITOR</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / TECLADO</b> </label>
                          <input
                            value={codteclado}
                            onChange={(e) => setCodTeclado(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / TECLADO</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>MARCA / MOUSE</b> </label>
                          <input
                            value={marcamouse}
                            onChange={(e) => setMarcaMouse(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / MOUSE</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / ESTABILIZADOR</b> </label>
                          <input
                            value={codestabilizador}
                            onChange={(e) => setCodEstabilizador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / ESTABILIZADOR</b> </label>
                          <input
                            value={serieestabilizador}
                            onChange={(e) => setSerieEstabilizador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>TIPO DE CONEXIÓN </b> </label>
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
                        <label for="exampleFormControlTextarea1"><b>OBSERVACIÓN</b></label>
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
                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>NOMBRE EQUIPO</b> </label>
                          <input
                            value={nombreequipo}
                            onChange={(e) => setNombreEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>TIPO DE ORDENADOR</b> </label>
                          <input
                            value={tipoordenador}
                            onChange={(e) => setTipoordenador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>MARCA EQUIPO</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>USUARIO</b> </label>
                          <input
                            value={usuarioequipo}
                            onChange={(e) => setUsuarioEquipo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>FECHA DE ADQUISICIÓN</b> </label>
                          <input
                            value={fechaadquisicion}
                            onChange={(e) => setFechaAdquisicion(e.target.value)}
                            type="date"
                            dateFormat="dd-mm-yyyy" 
                            className='form-control fecha-adquisicion'
                            id="fecha-adquisicion"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputDependencia" className="form-label"> <b>ESTADO</b></label>
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
                          <label for="inputDependencia" className="form-label"> <b>DEPENDENCIA</b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="distrito" onChange={(e) => setIdDependencia(e.target.value)} value={iddependencia} required >
                            <option selected>Seleccione la dependencia </option>
                            {dependencias && dependencias.map((dep) => (
                              <option value={dep.iddependencia}> {dep.nombre_dependencia}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>OFICINA</b> </label>
                          <input
                            value={oficina}
                            onChange={(e) => setOficina(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputDependencia" className="form-label"> <b>SEDE</b></label>
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
                          <label for="inputEmail4" className="form-label"> <b>PROCESADOR</b> </label>
                          <input
                            value={procesador}
                            onChange={(e) => setProcesador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>TIPO DE PROCESADOR</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>SISTEMA OPERATIVO</b> </label>
                          <input
                            value={sistemaoperativo}
                            onChange={(e) => setSistemaOperativo(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>MEMORIA RAM </b> </label>
                          <input
                            value={memoriaram}
                            onChange={(e) => setMemoriaram(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>CAPACIDAD DEL DISCO DURO</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / CPU</b> </label>
                          <input
                            value={codcpu}
                            onChange={(e) => setCodCpu(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / CPU</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / MONITOR</b> </label>
                          <input
                            value={codmonitor}
                            onChange={(e) => setCodMonitor(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / MONITOR</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / TECLADO</b> </label>
                          <input
                            value={codteclado}
                            onChange={(e) => setCodTeclado(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / TECLADO</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>MARCA / MOUSE</b> </label>
                          <input
                            value={marcamouse}
                            onChange={(e) => setMarcaMouse(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / MOUSE</b> </label>
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
                          <label for="inputEmail4" className="form-label"> <b>COD.PAT / ESTABILIZADOR</b> </label>
                          <input
                            value={codestabilizador}
                            onChange={(e) => setCodEstabilizador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>SERIE / ESTABILIZADOR</b> </label>
                          <input
                            value={serieestabilizador}
                            onChange={(e) => setSerieEstabilizador(e.target.value)}
                            type="text"
                            className='form-control'
                            id="inputEmail4"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label for="inputEmail4" className="form-label"> <b>TIPO DE CONEXIÓN </b> </label>
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
                        <label for="exampleFormControlTextarea1"><b>OBSERVACIÓN</b></label>
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






      </div>
    </>

  );
};
export default Equipo;

