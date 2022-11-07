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
import { useNavigate,Link } from "react-router-dom";
import { ApiWebUrl } from "../utils";
import Swal from 'sweetalert2';
function VistaEquipo({ pc }) {
    /* MODAL REGISTRAR*/
    const navigate = useNavigate();
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
                  //getEquipos(); // importante
                //  navigate('/')   
                window.location.reload(); 
              }
            )
  
          Swal.fire(
            'Eliminado satisfactoriamente'
          )
        }
      })
  
    };

    return (
                <>
              
                <tr className="table-dark" key={pc.idequipo}>

                  <td className="" style={{ display: "none" }}> {pc.idequipo}</td>
                  <td className="">
                    <span>
                    <Link to={`/equipo/${pc.idequipo}`} ><img className="edit" src={edit} alt='edit'/></Link> 
                    </span>
                    <span>
                    <img className="delete" src={delet} alt='delete' onClick={() => eliminar(pc)} />
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
           
                </tr>
                
                <tr>
                  <th colSpan={6}><p style={{fontSize:"14px"}}><u>ESPECIFICACIONES DEL EQUIPO</u></p></th>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>ESTADO</p></th>
                  <td colSpan={1}> <span  className= {` 
                                ${pc.estado === "OPERATIVO" ? 'badge badge-pill green' : ''}
                                ${pc.estado === "INOPERATIVO" ? 'badge badge-pill badge-danger' : ''}
                                ${pc.estado === "BAJA" ? 'badge badge-pill red' : ''}
                                ${pc.estado === "SIN USO" ? 'badge badge-pill yellow' : ''}
                        `} >{pc.estado}</span> </td>
                </tr>
                <tr>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>MARCA</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.marca_equipo}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>TIPO DE ORDENADOR</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.tipo_ordenador}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>📅 FECHA ADQUISICIÓN</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.fecha_adquisicion}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>📅 FECHA DE INVENTARIO</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.fecha_actualizada}</td>
                </tr>
                <tr>
                  <th colSpan={2}><p style={{fontSize:"13px"}}>PROCESADOR</p></th>
                  <td colSpan={3} style={{fontSize:"14px"}}> {pc.procesador}</td>
                  <td colSpan={3} style={{fontSize:"14px"}}> {pc.tipo_procesador}</td>
                </tr>
                <tr>
                  <th colSpan={2}><p style={{fontSize:"13px"}}>MEMORIA RAM</p></th>
                  <td colSpan={2} style={{fontSize:"14px"}}> {pc.memoriaram}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>DISCO DURO</p></th>
                  <td colSpan={3} style={{fontSize:"14px"}}> {pc.capacidad_discoduro}</td>
                </tr>
                <tr>
                  <th colSpan={2}><p style={{fontSize:"13px"}}>SISTEMA OPERATIVO</p></th>
                  <td colSpan={6} style={{fontSize:"14px"}}> {pc.sistema_operativo}</td>
                </tr>




                <tr>
                  <th colSpan={8}> <p style={{fontSize:"14px"}}><u>COMPONENTES DEL EQUIPO</u></p></th>
                </tr>
                <tr>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>CÓD. PAT. CPU</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.codigopatrimonialcpu}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>SERIE CPU</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.seriecpu}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>CÓD. PAT. MONITOR</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.codigopatrimonialmonitor}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>SERIE MONITOR</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.seriemonitor}</td>
                </tr>

                <tr>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>CÓD. PAT. TECLADO</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.codigopatrimonialteclado}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>SERIE TECLADO</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.serieteclado}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>MARCA MOUSE</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.marcamouse}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>SERIE MOUSE</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.seriemouse}</td>
                </tr>

                <tr>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>CÓD. PAT. ESTABILIZADOR</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.codigopatrimonialestabilizador}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>SERIE ESTABILIZADOR</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.serieestabilizador}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>TIPO DE CONEXIÓN</p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.tipo_conexion}</td>
                  <th colSpan={1}><p style={{fontSize:"13px"}}>&#128100; INVENTARIADO </p></th>
                  <td colSpan={1} style={{fontSize:"14px"}}> {pc.tecnico_inventario}</td>
                </tr>

                <tr>
                  <th><span style={{fontSize:"13px"}}> 🗒 OBSERVACIÓN</span></th>
                  <td colSpan={8} style={{fontSize:"14px"}}> {pc.observacion}</td>
             
                </tr>
                </>

          
    );

}

export default VistaEquipo;

/*
      <tr className="table-dark" key={pc.idequipo}>

                  <td className="" style={{ display: "none" }}> {pc.idequipo}</td>
                  <td className="">
                    <span>
                    <Link to={`/equipo/${pc.idequipo}`} ><img className="edit" src={edit} alt='edit'/></Link> 
                    </span>
                    <span>
                    <img className="delete" src={delet} alt='delete' onClick={() => eliminar(pc)} />
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









*/