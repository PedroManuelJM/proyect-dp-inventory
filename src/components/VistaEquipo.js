import React, { useState } from "react";
/*
import pcimage from './../assets/images/pcimage.png';
import cancel from '../assets/images/cancel.png';
import cases from '../assets/images/case.png';
import monitor from '../assets/images/monitor.png';
import keyboard from '../assets/images/keyboard.png';
import mouse from '../assets/images/mouse.png';
import calendar from '../assets/images/calendario.png';
import sede from '../assets/images/sede.png';*/
import search from '../assets/images/borrar.png';
import cancel from '../assets/images/cancel.png';
import add from '../assets/images/add.png';
import edit from '../assets/images/edit.png';
import delet from './../assets/images/delete.png';
import pdf from './../assets/images/pdf.png';
import mantenimiento from './../assets/images/mantenimiento.png';
import { Link } from "react-router-dom";
function VistaEquipo({ pc }) {
    /* MODAL REGISTRAR*/



    return (
    
                <tr className="table-dark" key={pc.idequipo}>

                  <td className="" style={{ display: "none" }}> {pc.idequipo}</td>
                  <td className="">
                    <span>
                    <Link to={`/equipo/${pc.idequipo}`} ><img className="edit" src={edit} alt='edit'/></Link> 
                    </span>
                    <span>
                      <img className="delete" src={delet} alt='delete'  />
                    </span>
                  </td>
                  <td> <Link to={`/pdf/${pc.idequipo}`} className="" target="_blank"> <img className="edit" src={pdf} alt='pdf'/> </Link></td>     
                  <td className=""><Link to={`/registrarmantenimiento/${pc.idequipo}`}> <img className="edit" src={mantenimiento} alt='mantenimiento'/> </Link></td>     
                  <td className=""> {pc.nombre_equipo}</td>
                  <td className="" style={{ display: "none" }}> {pc.iddependencia}</td>
                  <td className=""> {pc.nombre_dependencia}</td>
                  <td className=""> {pc.oficina}</td>
                  <td className=""> {pc.nombre_usuario}</td>
                  <td className=""> {pc.sede}</td>
                  <td className=""> {pc.tipo_ordenador}</td>
                  <td className=""> {pc.marca_equipo}</td>
                  <td className=""> {pc.procesador}</td>
                  <td className=""> {pc.tipo_procesador}</td>
                  <td className=""> {pc.sistema_operativo}</td>
                  <td className=""> {pc.memoriaram}</td>
                  <td className=""> {pc.capacidad_discoduro}</td>
                  <td className=""> {pc.codigopatrimonialcpu}</td>
                  <td className=""> {pc.seriecpu}</td>
                  <td className=""> {pc.codigopatrimonialmonitor}</td>
                  <td className=""> {pc.seriemonitor}</td>
                  <td className=""> {pc.codigopatrimonialteclado}</td>
                  <td className=""> {pc.serieteclado}</td>
                  <td className=""> {pc.marcamouse}</td>
                  <td className=""> {pc.seriemouse}</td>
                  <td className=""> {pc.codigopatrimonialestabilizador}</td>
                  <td className=""> {pc.serieestabilizador}</td>
                  <td className=""> {pc.tipo_conexion}</td>
                  <td className=""> {pc.estado}</td>
                  <td className=""> {pc.fecha_adquisicion}</td>
                  <td className=""> {pc.observacion}</td>
                  <td className=""> {pc.tecnico_inventario}</td>
                  <td className=""> {pc.fecha_actualizada}</td>
           
                </tr>

          
    );

}

export default VistaEquipo;