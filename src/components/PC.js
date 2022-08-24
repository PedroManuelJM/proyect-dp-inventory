import React, { useState } from "react";
import pcimage from '../assets/images/pc.png';
import cancel from '../assets/images/cancel.png';
import cases from '../assets/images/case.png';
import monitor from '../assets/images/monitor.png';
import keyboard from '../assets/images/keyboard.png';
import mouse from '../assets/images/mouse.png';
import calendar from '../assets/images/calendario.png';
import sede from '../assets/images/sede.png';
function PC({ pc }) {
    /* MODAL REGISTRAR*/
    const [popup, setPop] = useState(false)

    const handleClickOpen = () => { //ABRIR MODAL
        setPop(!popup)
    }

    const closePopup = () => { // CERRAR MODAL
        setPop(false)
    }

    const abrir = (pc) => {
        handleClickOpen();

    }

    return (
        <div>

            <div className="container contenedor-card" onClick={() => abrir(pc.idequipo)}>
                <br></br>
                <h1 className="titulopc">{pc.nombre_dependencia} </h1>
                <p  style={{textAlign: "left"}} > <img className="" style={{ width: "32px" }} src={calendar} alt='calendar' />Fecha. inventariado: <b>{pc.fecha_actualizada}</b> </p> 
                
                <div className="console_head">
                    <div className="row">
                        <div className="col-md-6">
                        <h2>{pc.nombre_equipo}  </h2>   
                        </div>
                        <div className="col-md-6">
                        <p  style={{textAlign: "right"}} > <img className="" style={{ width: "32px" }} src={sede} alt='sede' /> <b>{pc.sede}</b> </p> 
                        </div>
                    
                    </div>
                  
                   
                  
                    <div className={` 
                                ${pc.estado === "OPERATIVO" ? 'circulo green' : ''}
                                ${pc.estado === "INOPERATIVO" ? 'circulo red' : ''}
                                ${pc.estado === "SIN USO" ? 'circulo yellow' : ''}
                                ${pc.estado === "Seguridad Informática" ? 'badge badge-pill badge-dark' : ''}
                              
                        `}> 
                    </div>
                    <span className=""> &nbsp; {pc.estado}</span>
                
                </div>
                

              

                <img src={pcimage} className="mx-auto d-block" alt="pc" style={{ width: "164px", textAlign: "center", cursor: "pointer" }}  />

            </div>


            {
                popup ?
                    <div className="main">
                        <div className="popup-pc">
                            <div className="popup-header container">
                                <img className="cancel float-right" onClick={closePopup} src={cancel} alt='cancel' />
                                <h1 className="text-center"> {pc.nombre_equipo} </h1>

                            </div>
                               
                                <div className="container">
                                    <div class="row">
                                        <h5>
                                            <img className="" style={{ width: "64px" }} src={cases} alt='keyboard' /> {pc.codigopatrimonialcpu} / {pc.seriecpu}
                                        </h5>
                                        <h5>
                                            <img className="" style={{ width: "64px" }} src={monitor} alt='keyboard' /> {pc.codigopatrimonialmonitor} / {pc.seriemonitor}
                                        </h5>

                                        <h5>
                                            <img className="" style={{ width: "64px" }} src={keyboard} alt='keyboard' /> {pc.codigopatrimonialteclado} / {pc.serieteclado}
                                        </h5>

                                        <h5>
                                            <img className="" style={{ width: "64px" }} src={mouse} alt='keyboard' /> {pc.marcamouse} / {pc.seriemouse}
                                        </h5>
                                    </div>
                                    <br></br>
                                    <button className='btn btn-danger' onClick={closePopup} > Cerrar</button>
                                </div>
                          
                        </div>
                    </div> : ""
            }
        </div>







    );

}

export default PC;