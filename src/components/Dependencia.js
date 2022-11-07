import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
//import { Link , useNavigate } from "react-router-dom";
import search from '../assets/images/borrar.png';
import cancel from '../assets/images/cancel.png';
import add from '../assets/images/add.png';
import edit from '../assets/images/edit.png';
import delet from '../assets/images/delete.png';
import Swal from 'sweetalert2';
import { usuarioLocal, ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Dependencia = () => {

  const [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
  const [TablaDependencias, setTablaDependencias] = useState([]);
  const [busqueda, setBusqueda]= useState("");

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

    const rutaServicio =ApiWebUrl + "dependencia";
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    console.log(result);
                    setDependencia(result);
                    setTablaDependencias(result); /* para la busqueda */
               }
            )
  };



//  6- USAMOS USEEFFECT
  useEffect(() => {
  getDependencias(); // importante

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
    setDependencia(resultadosBusqueda);
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


  const eliminar = (Id , nombre) =>
  {
    Swal.fire({
      title:  `ESTA SEGURO DE ELIMINAR`, //  title:  `Esta seguro de eliminar `+nombre + `? `,
      text:  "LA DEPENDENCIA "+ nombre + ` ? `,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
          
        const rutaServicio = ApiWebUrl + `dependencia/${Id}`;
     
        fetch(rutaServicio, {
          method: 'DELETE', 
  
        })
          .then(
            () => {
              getDependencias(); // importante
            }
          )

        Swal.fire(
          'Eliminado satisfactoriamente'
        )
      }
    })

  }

  const abrireditar = (dep) =>{
      handleClickOpenActualizar();
      setIdDependenciaActualizar(dep.iddependencia)
      setNombreDependencia(dep.nombre_dependencia)
  }

  const actualizar = (e)=>{
    e.preventDefault();
    const rutaServicio = ApiWebUrl + `actualizar/${iddependenciaActualizar}`;
    const data = { nombre_dependencia: nombredependencia };
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
                // position: 'top-end',
                 icon: 'success',
                 title: 'Actualizado la dependencia ',
                 showConfirmButton: false,
                 timer: 1500
            })
            closePopupActualizar();
            getDependencias(); // importante
               
            }
        )

  }

  const Limpiarbuscador=()=>{ // CERRAR MODAL
    setBusqueda('');
    getDependencias()
  }
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
        
        <div className="contenedor-tabla">

        <span>
          <img className="add" src={add} alt='add' onClick={handleClickOpen} /> Registrar Dependencia
        </span>
        
        <button onClick={handleClickOpen} className="btn btn-success" style={{display:"none"}}>REGISTRAR</button> 

        <div className="containerInput">
             <input
                  className="form-control inputBuscar"
                  value={busqueda}
                  placeholder="Búsqueda por dependencia"
                  onChange={handleChange}
              />
             <img className="search" src={search} alt='search' onClick={Limpiarbuscador} />
          
        </div>

        <div className="" id="div1">
          <table className="table table-striped table-responsive" width="100%" id="table">
            <thead>
              <tr>
                <th style={{display:"none"}}>ID</th>
                <th>DEPENDENCIA</th>
                <th>ACCIONES</th>
              </tr>

            </thead>

            <tbody>
              {dependencias.length === 0 && <h5> No se encontró en la base de datos. </h5>}
              { dependencias && dependencias.map((dep) => (
              
                  <tr className="table-dark" key={dep.iddependencia}>

                    <td className="" style={{display:"none"}}> {dep.iddependencia}</td>
                    <td className=""> {dep.nombre_dependencia}</td>
                    <td className="">
                    
                    <Link to={`/editar/${dep.iddependencia}`} className="" style={{textDecoration:"none",display:"none"}} > Editar </Link>
                    <span>
                        <img className="edit" src={edit} alt='edit' onClick={() => abrireditar(dep)}/> 
                    </span>
                    <button onClick={() => eliminar(dep.iddependencia , dep.nombre_dependencia)} className="btn btn-success" style={{display:"none"}}>Eliminar</button>
                    
                    <span>
                        <img className="delete" src={delet} alt='delete' onClick={() => eliminar(dep.iddependencia , dep.nombre_dependencia)}/> 
                    </span>

                    </td>
                  
                  </tr>
                
              ))}

              
            </tbody>
          </table>
          <br></br>
          

        </div>

        </div>
   

            <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header container">
                                <img className="cancel float-right" onClick={closePopup} src={cancel} alt='cancel'/>
                                <h1 className="text-center"> REGISTRAR DEPENDENCIA </h1>    
                            
                            </div>

                            <div className="container">
                                <form onSubmit={registrar}>
                              
                                    <div class="row">
                                      <div class="form-group col-md-12">
                                          <label for="inputEmail4" className="form-label"> <b>NOMBRE DE LA DEPENDENCIA</b> </label>
                                          <input
                                              value={nombredependencia}
                                              onChange={(e) => setNombreDependencia(e.target.value)}
                                              type="text"
                                              className='form-control'
                                              id="inputEmail4"
                                          />
                                      </div>


                                    </div>
                                <br></br>
                                <button type='submit' className='btn btn-success'>Guardar</button>
                            </form>
                            </div>
                        </div>
                    </div>:""
                }
            </div>

            <div>
                {
                    popupactualizar?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header container">
                                <img className="cancel float-right" onClick={closePopupActualizar} src={cancel} alt='cancel'/>
                                <h1 className="text-center"> EDITAR DEPENDENCIA </h1>    
                            
                            </div>

                            <div className="container">
                                <form onSubmit={actualizar}>
                              
                                    <div class="row">
                                      <div class="form-group col-md-12">
                                          <label for="inputEmail4" className="form-label"> <b>NOMBRE DE LA DEPENDENCIA</b> </label>
                                          <input
                                       value={nombredependencia}
                                       onChange={(e) => setNombreDependencia(e.target.value)}
                                              type="text"
                                              className='form-control'
                                              id="inputEmail4"
                                          />
                                      </div>


                                    </div>
                                <br></br>
                                <button type='submit' className='btn btn-success'>Guardar</button>
                            </form>
                            </div>
                        </div>
                    </div>:""
                }
            </div>
           
    </div>
  </>
  );
};
export default Dependencia;

