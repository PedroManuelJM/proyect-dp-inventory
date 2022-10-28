import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import { usuarioLocal,ApiWebUrl } from "../utils";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import es from 'date-fns/locale/es';
import Navbar from "./Navbar";
registerLocale("es", es);

function RegistrarEquipo() {
    /* MODAL REGISTRAR*/
  
    const [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
    //const [equipos, setEquipos] = useState([]);  // trae todo los datos y muestra
  /* DATOS PARA REGISTRAR */
    const navigate = useNavigate();
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

     
    const [usuario, setUsuario] = useState(null);  
    const usuarioL = usuarioLocal();
    const [showNav,setShowNav] =useState(false); // para el navbar

    const getDependencias = async () => {
 
        const rutaServicio =  ApiWebUrl+ "dependencia";
        fetch(rutaServicio)
        .then( res => res.json() )
           .then(
                  (result) => {
                       // console.log(result);
                        setDependencia(result);
                        //SetLoading(false);
                   }
                )
    };
    
    const registrar  =  (e) => {
        e.preventDefault();
        const rutaServicio =  ApiWebUrl + "registrarequipo" ;
        //const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};
       // const fechaformateada = fechaadquisicion.toLocaleDateString('es-ES');
        
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
                      //fecha_adquisicion:fechaformateada,
                      fecha_adquisicion:fechaadquisicion,
                       observacion:observacion,
                       tecnico_inventario:usuario.nombres,
                       fecha_actualizada:fechaActualizada  
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
                  LimpiarFormulario();
                  navigate('/equipo')
                
                }
            )
     }
     const fechaactual =()=>{
        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        //console.log(output);
        setFechaActualizada(output)
    
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
    const equipo = () => {
        navigate('/equipo')
    }
    
     useEffect(() => {
 
        //getEquipos(); // importante
        getDependencias();
        //getEquipos();
        fechaactual();
        //anioactual();

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
    return (
    <>
        <div className=''>
            <header> <FontAwesomeIcon icon={faBars} style={{color:"#fff"}} onClick={()=> setShowNav(!showNav)} /> </header>
            <Navbar show={showNav}/>
        </div>
      
            <div className="container">
        
                <form onSubmit={registrar}>
                    <hr></hr>
                        <h5><b>Registrar Equipo</b></h5>
    
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
                                <label htmlFor="inputEmail4" className="form-label"> <b>FECHA DE ADQUISICIÓN</b> </label>
                        
                                <DatePicker
                                selected={fechaadquisicion} 
                               
                                onChange={(date) => {
                                   // const d = new Date(date).toLocaleDateString();
                                    date.toLocaleDateString('es-ES');
                                    console.log(date);
                                    setFechaAdquisicion(date);
                                }}
                                locale="es" className="form-control pickers" 
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                dateFormatCalendar="MMMM"
                                yearDropdownItemNumber={18}
                                scrollableYearDropdown
                                placeholderText="Seleccionar fecha"
                                />

                                                        
                                </div>

                                <div className="form-group col-md-4">
                                <label htmlFor="inputDependencia" className="form-label"> <b>ESTADO DEL EQUIPO </b></label>
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
                                <select className="form-control" 
                                    id="exampleFormControlSelect1" 
                                    name="dependencia" 
                                    onChange={(e) => setIdDependencia(e.target.value)} value={iddependencia} required >
                                    <option  selected>Seleccione la dependencia </option>
                                    {dependencias && dependencias.map((dep) => (
                                        
                                    <option value={dep.iddependencia} key={dep.iddependencia}> {dep.nombre_dependencia}</option>
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
                                <label htmlFor="inputEmail4" className="form-label"> <b>TIPO DE CONEXIÓN </b> </label>
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
                                <label htmlFor="exampleFormControlTextarea1"><b>OBSERVACIÓN</b></label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" value={observacion} onChange={(e) => setObservacion(e.target.value)}></textarea>
                        </div>

                        <button type='submit' className='btn btn-success btn-sm' style={{float:"left", marginTop:"8px"}}>Guardar</button>
                        <button type='button' className='btn btn-warning btn-sm' style={{float:"left",marginLeft:"25px", marginTop:"8px"}}  onClick={equipo}>Cancelar</button>
                </form>
        
            </div>
        </>
    );

}

export default RegistrarEquipo;