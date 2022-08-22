import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioLocal ,ApiWebUrl } from "../utils";
import Filter from "./Filter";
import PC from "./PC";
import Swal from 'sweetalert2';
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
const Catalogo = () => {

    const [equipos, setEquipos] = useState([]);  // trae todo los datos y muestra
    const [filtered,setFiltrar]=useState([]);

    //const [activarDependencia,setActivarDependencia]=useState(0);    
    const [activarDependencia,setActivarDependencia]=useState('');    
    const [activarEstado,setActivarEstado]=useState('');


    /* importante para no permitir mostrar la página */
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);  
    const usuarioL = usuarioLocal();

    const [showNav,setShowNav] =useState(false); // para el navbar

    const getEquipos = async () => {

            const rutaServicio = ApiWebUrl+ "equipo";
            fetch(rutaServicio)
            .then( res => res.json() )
              .then(
                      (result) => {
                            console.log(result);
                            setEquipos(result);
                            setFiltrar(result);
                          //  setTablaEquipos(result); /* para la busqueda 
                      }
                    )
    };
        
    useEffect(() => {
   

    getEquipos();

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
      <br></br>
      <Filter 
      equipos={equipos} 
      setFiltrar={setFiltrar} 
      activarDependencia={activarDependencia} 
      setActivarDependencia={setActivarDependencia}
      activarEstado={activarEstado}
      setActivarEstado={setActivarEstado}
      />
      <div className="pc-card">
       {filtered.map((pc)=>{
        return <PC key={pc.idequipo} pc={pc} />

       })}
 
      </div>
      
      </>
    )
}

export default Catalogo;

