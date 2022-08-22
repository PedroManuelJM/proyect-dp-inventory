import { useEffect, useState } from "react";
import barra from '../assets/images/barra.png';
import GraficoPC from "./GraficoPc";
import cancel from '../assets/images/cancel.png';
import { ApiWebUrl } from "../utils";
function Filter({ setActivarDependencia, activarDependencia,setFiltrar,equipos,activarEstado,setActivarEstado}){
    const [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
    useEffect(()=>{
      if(activarDependencia === " " || activarDependencia=== null){
        setFiltrar(equipos);
        return;
      }

      if(activarEstado === "OPERATIVO" || activarEstado === "INOPERATIVO" || activarEstado === "BAJA" || activarEstado === "SIN USO"){

        const filtrar= equipos.filter((equipo)=> 
        equipo.nombre_dependencia === activarDependencia && equipo.estado===activarEstado); 
        setFiltrar(filtrar);
        return;
      }
   
      console.log("de",activarDependencia)

      const filtrar= equipos.filter((equipo)=> 
      equipo.nombre_dependencia === activarDependencia ); 


     setFiltrar(filtrar);

      getDependencias();

    }, [activarDependencia, activarEstado] );  

    const Limpiarbuscador=()=>{ // limpiar buscador
       setActivarDependencia(" ");
       setActivarEstado('');
    }

     /* MODAL REGISTRAR*/
    const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{ //ABRIR MODAL
        setPop(!popup)
    }

     const closePopup=()=>{ // CERRAR MODAL
        setPop(false)
    }

    const getDependencias = async () => {
       const rutaServicio = ApiWebUrl + "dependencia";
       fetch(rutaServicio)
       .then( res => res.json() )
          .then(
                 (result) => {
                       console.log(result);
                       setDependencia(result);
                  
                  }
               )
     };
   
   
   return(
   <div className="container">
     <div className="row">

        <div className="form-group col-md-6">
                    <label for="inputDependencia" className="form-label"> <b>DEPENDENCIA</b></label>
                    <br></br>
                    <select className="form-control" id="exampleFormControlSelect1" name="distrito" onChange={(e) => setActivarDependencia(e.target.value)} value={activarDependencia} required >
                        <option selected value=" " >TODO </option>
                        {dependencias.map((dep) => (
                                              <option value={dep.nombre_dependencia}> {dep.nombre_dependencia}</option>
                        ))}
                      

                    </select>
        </div>

        <div className="form-group col-md-2">
                    <label for="inputDependencia" className="form-label"> <b>ESTADO</b></label>
                    <br></br>
                    <select className="form-control" id="exampleFormControlSelect1" name="distrito" onChange={(e) => setActivarEstado(e.target.value)} value={activarEstado} required >
                        <option selected value=" " >Seleccione el estado </option>
                        <option value="OPERATIVO">OPERATIVO</option>
                        <option value="INOPERATIVO">INOPERATIVO</option>
                        <option value="BAJA">BAJA</option>
                        <option value="SIN USO">SIN USO</option>
                    </select>
        </div>

        <div className="col-md-2">
           <button className="btn btn-warning" style={{marginTop:"28px",float: "right"}}onClick={Limpiarbuscador}> LIMPIAR </button>
        </div>

        <div className="col-md-2">
           <img className="edit" src={barra}  style={{width:"48px",marginTop:"20px",float: "right"}} alt='barra' onClick={handleClickOpen} /> 
        </div>

     </div>
      
     <hr></hr>
     {equipos.length === 0 && <h5> No se encontró en la base de datos. </h5>}
        
    
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

                              <GraficoPC/>
                       
                            </div>
                        </div>
                    </div>:""
                }
            </div>
           

            
                
     </div>
  
  );

}
export default Filter;
