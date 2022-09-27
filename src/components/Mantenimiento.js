import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
//import { Link , useNavigate } from "react-router-dom";
import search from '../assets/images/borrar.png';
import cancel from '../assets/images/cancel.png';
import add from '../assets/images/monitoreo.png';
import edit from '../assets/images/edit.png';
import delet from '../assets/images/delete.png';
import Swal from 'sweetalert2';
import { usuarioLocal, ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import GraficoMantenimientoFecha from "./GraficoMantenimientoFecha";

const Mantenimiento = () => {

  const [lista, setLista] = useState([]);  // trae todo los datos y muestra
  const [TablaDependencias, setTablaDependencias] = useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [estado,setEstado]= useState("");
  //const [total,setTotal]= useState("");
  // variableS para registrar el formulario
  const [nombredependencia, setNombreDependencia ] = useState('')  // variable para registrar

  // variableS para editar el formulario
  //const [nombredependenciaActualizar, setNombreDependenciaActualizar ] = useState('')  // variable para actualizar
  const [iddependenciaActualizar, setIdDependenciaActualizar ] = useState('')  // variable para actualizar
 
  /* importante para no permitir mostrar la página */
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);  
  const usuarioL = usuarioLocal();

  const [showNav,setShowNav] =useState(false); // para el navbar


  const getDependencias = async () => {

    const rutaServicio =ApiWebUrl + "pc_sin_mantenimiento";
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    console.log(result);
                    setLista(result);
                    setTablaDependencias(result); /* para la busqueda */
               }
            )
  };

  const Mantenimiento= (estado) => {
    if(estado === "CON MANTENIMIENTO"){
        
        const rutaServicio =ApiWebUrl + "pc_con_mantenimiento";
        fetch(rutaServicio)
        .then( res => res.json() )
        .then(
                (result) => {
                        console.log(result);
                        setLista(result);
                }
                )
    } else if(estado === "SIN MANTENIMIENTO"){
        const rutaServicio =ApiWebUrl + "pc_sin_mantenimiento";
        fetch(rutaServicio)
        .then( res => res.json() )
           .then(
                  (result) => {
                        console.log(result);
                        setLista(result);
                   }
                )
    }
   
}

//  6- USAMOS USEEFFECT
  useEffect(() => {
 // getDependencias(); // importante
  Mantenimiento(estado)
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

  },[estado]);

  /* PARA LA BUSQUEDA */
  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  
  const filtrar=(terminoBusqueda)=>{
    let resultadosBusqueda=TablaDependencias.filter((elemento)=>{
      if(elemento.nombre_dependencia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
         || elemento.iddependencia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
         ){ // busqueda por nombre dependencia
        return elemento;
      }
    });
    setLista(resultadosBusqueda);
  }

  /* MODAL REGISTRAR*/
  const [popup,setPop]=useState(false)
  
  const handleClickOpen=()=>{ //ABRIR MODAL
        setPop(!popup)
  }

  const closePopup=()=>{ // CERRAR MODAL
        setPop(false)
        LimpiarFormulario()
  }

  /* MODAL EDITAR */
  const [popupactualizar,setPopActualizar]=useState(false)

  const handleClickOpenActualizar=()=>{ //ABRIR MODAL
        setPopActualizar(!popupactualizar)
  }

  const closePopupActualizar=()=>{ // CERRAR MODAL
        setPopActualizar(false)
  }

  const LimpiarFormulario=()=>{
    setNombreDependencia(""); //limpiando
  }

  const registrar  =  (e) => {
    e.preventDefault();

    const rutaServicio = ApiWebUrl+"registrar"; 
    const data = { nombre_dependencia: nombredependencia };

    fetch(rutaServicio, {
        method: 'POST',
        body:  JSON.stringify(data) ,//formData
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(
           res => res.json(),
        )
        .then(
            (result) => {
              Swal.fire({
                // position: 'top-end',
                 icon: 'success',
                 title: 'Registrado la dependencia '+ nombredependencia,
                 showConfirmButton: false,
                 timer: 1500
               })
              closePopup();
              getDependencias(); // importante
        
            }
        )
  }


  const eliminar = (Idmanto , Idequipo) =>
  {
    Swal.fire({
      title:  `ESTA SEGURO DE ELIMINAR`, //  title:  `Esta seguro de eliminar `+nombre + `? `,
    //  text:  "LA DEPENDENCIA "+ nombre + ` ? `,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
          
        const rutaServicio = ApiWebUrl + `eliminarmantenimiento/${Idmanto}/${Idequipo}`;
     
        fetch(rutaServicio, {
          method: 'DELETE', 
  
        })
          .then(
            () => {
             Mantenimiento(estado); // importante
            }
          )

        Swal.fire(
          'Eliminado satisfactoriamente'
        )
      }
    })

  }


  const Limpiarbuscador=()=>{ // CERRAR MODAL
    setBusqueda('');
    getDependencias()
  }
  // CALCULAR LA CANTIDAD DE PC 
  const total =  lista.length;//lista.map((data) => Number(data.contador)).reduce((a, b) => a + b, 0); 
  return (
  <>

           
    
            <div className=''>
                    <header> <FontAwesomeIcon icon={faBars} style={{color:"#fff"}} onClick={()=> setShowNav(!showNav)} /> </header>
                    <Navbar show={showNav}/>
                </div>
                <div className="container">
                    <Link to="/registrar" className="btn btn-warning mt-2 mb-2" style={{display:"none"}}>
                        Registrar Dependencia <i class="fa-solid fa-computer"></i>
                    </Link>
                    <br></br>
                    <span>
                    <img className="" src={add} alt='add' onClick={handleClickOpen} style={{cursor:"pointer"}} /> <b> Reporte de avance de mantenimiento de PC'S</b>
                    </span>
                    

                    <button onClick={handleClickOpen} className="btn btn-success" style={{display:"none"}}>REGISTRAR</button> 


                    <div className="form-group col-md-4">
                          <label for="inputDependencia" className="form-label"> <b>ESTADO DE LAS COMPUTADORAS EN MANTENIMIENTO </b></label>
                          <br></br>
                          <select className="form-control" id="exampleFormControlSelect1" name="estado"  onChange={(e) => setEstado(e.target.value)} value={estado}  required >
                            <option selected>Seleccione el estado </option>
                            <option value="CON MANTENIMIENTO">CON MANTENIMIENTO</option>
                            <option value="SIN MANTENIMIENTO">SIN MANTENIMIENTO</option>
                          </select>
                    </div>

                    <div className="containerInput" style={{display:"none"}}>
                        <input
                            className="form-control inputBuscar"
                            value={busqueda}
                            placeholder="Búsqueda por dependencia"
                            onChange={handleChange}
                        />
                        <img className="search" src={search} alt='search' onClick={Limpiarbuscador} />
                    
                    </div>
                    <br></br>
                    <b> TOTAL DE COMPUTADORAS :</b> <span className="badge bg-success rounded-pill"> {total} </span> 
                    <hr></hr>

                <div className="" id="div1">
                    <table className="table table-striped table-responsive" width="100%" id="table">
                    <thead>
                        <tr>
                        <th style={{display:"none"}}>ID</th>
                        <th>NOMBRE EQUIPO</th>
                        <th>DEPENDENCIA</th>
                        <th>FECHA MANTO.</th>
                        <th>AÑO</th>
                        <th>REALIZADO POR</th>
                        <th>OBSERVACIÓN</th>
                        </tr>

                    </thead>

                    <tbody>
                        {lista.length === 0 && <h5> No se encontró en la base de datos. </h5>}
                        { lista && lista.map((elemento) => (
                        
                            <tr className="table-dark" key={elemento.idmantenimiento}>
                            <td className="" style={{display:"none"}}> {elemento.idmantenimiento}</td>
                            <td className=""> {elemento.nombre_equipo}</td>
                            <td className=""> {elemento.oficina}</td>
                            <td className=""> {elemento.fecha_mantenimiento}</td>
                            <td className=""> {elemento.anio}</td>
                            <td className=""> {elemento.tecnico_mantenimiento}</td>
                            <td className=""> {elemento.observacion_mantenimiento}</td>
                       

                            {estado === "CON MANTENIMIENTO"  ?
                              <td>
                              <span>
                                  <img className="edit" src={edit} alt='edit'/> 
                              </span>
  
                              <span>
                                  <img className="delete" src={delet} alt='delete' onClick={() => eliminar(elemento.idmantenimiento,elemento.idequipo)}/> 
                              </span>
  
                              </td>
                              
                                   
                          
                            : <></>
                            
                            }
                            
                            </tr>
                        
                        ))}

                        
                    </tbody>
                    </table>
                    <br></br>
                    

                </div>
            
                <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup-barra">
                            <div className="popup-header container">
                                <img className="cancel float-right" onClick={closePopup} src={cancel} alt='cancel'/>
                                <h1 className="text-center">  </h1>    
                            
                            </div>

                            <div className="container">

                              <GraficoMantenimientoFecha/>
                       
                            </div>
                        </div>
                    </div>:""
                }
              </div>





            
        </div>


  
  
  
  </>
  );
};
export default Mantenimiento;

