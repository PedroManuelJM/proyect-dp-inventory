import React, { useState, useEffect, useRef } from "react";
//import { useReactToPrint } from "react-to-print";
import { useParams,useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_formato.jpg";

import { useReactToPrint } from 'react-to-print';
import { ApiWebUrl } from "../utils";


const FormatoPDF = (eq) => {
    /*
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint:()=>alert('Print success')
    })
     
*/  const {id}=useParams() //parametro que es enviado por router
    //const [nombreequipo, setNombreEquipo]= useState([]);

    const [usuario, setUsuario]= useState([]) ;
    const [lista, setLista]= useState([]) ;
    const [fecha, setFecha]= useState([]) ;
   
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
    });

    const obtenerEquipoSolo= async (id) =>{
        ///const rutaServicio = ApiWebUrl + "graficoestado.php"; //"http://localhost/api_inventario/graficoestado.php";
        const rutaServicio =  ApiWebUrl + `consultarequipo/${id}`;
        // var formData = new FormData();
        //formData.append("iddependencia",itemEq)  
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
    
        fetch(rutaServicio,{
           // method: 'GET',
          //  body: formData,
          headers: {"Content-type": "application/json; charset=UTF-8"}
         
        })
        .then(
            res => res.json()
        )
        .then(
            (result) => {
            
               console.log(result);
               let respuesta = result;
               setLista(result)
           
             //  let lista= JSON.stringify(result);
             //  setLista("listaaa",result);
              // 
               //const Nombreequipo= "", usuario="";
               /* respuesta.forEach = respuesta.map
              //   nombreequipo.push(result.nombre_equipo)
               lista.forEach(el => {
                  Nombreequipo.push(2)
                  usuario.push(el.nombre_usuario)
                });

               */

              
                
                /*
                respuesta.forEach(el => {
                    Nombreequipo.push(el.nombre_equipo)
            
                    usuario.push(el.nombre_usuario)
                  });
                  console.log("nON",Nombreequipo)*/
             //   lista.forEach(element => console.log("ele",element));
                    
              /*  lista.forEach(element => {
                    nombreequipo.push(element.nombre_equipo)
                });*/
              //  setNombreEquipo(Nombreequipo)
                 // setNombreEquipo(nombreequipo)
                //  setUsuario(usuario)
                 
           
             
           }
        )
    }
    
    useEffect(()=> {
         
         obtenerEquipoSolo(id);
         fechaactual();
       
       
     }, [id])

     const fechaactual =()=>{
        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        //console.log(output);
        setFecha(output)
    
      }
    return (
        <>
        
        { lista.map((dep) => (
                          
            <>     
            <br></br>   
             &nbsp; <button onClick={handlePrint} className="btn btn-success"> Generar PDF   </button>
            <div className="container" style={{paddingLeft:"30px" ,paddingBottom:"0"}}ref={componentRef}>

                <br></br>  <br></br>
                <img src={logo} className="" alt="logo" style={{ width: "250px", marginLeft: "50px",marginTop:"-40px" }} />
                <br></br>  <br></br>

              <div className="" >

              </div>
                <h1 className="text-center" style={{ fontSize: "20px" }} >FORMATO 1: Verificación de Equipo – Mantenimiento Preventivo 2022 </h1>

               <br></br>

                <table className="table">
                    
                    <tbody style={{border:"5"}}>
                        <tr > 
                           
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Nombre de CPU: <u> {dep.nombre_equipo} </u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{marginLeft:"0%",fontSize: "13px",fontWeight:"700"}} > Fecha: <u>   <input className=''  type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} /></u> </h1> </td>
                        </tr>
                        <tr >
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Dependencia: <u> {dep.nombre_dependencia}</u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{marginLeft:"0%",fontSize: "13px",fontWeight:"700"}} > Usuario: <u> {dep.nombre_usuario}</u> </h1> </td>
                        </tr> 
                        <tr>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Área: <u> {dep.oficina}</u> </h1> </td>

                        </tr>  
                        <tr>
                            <h1 style={{fontSize: "13px",fontWeight:"700"}}> Ubicación: ⬜ Sobre Escritorio	⬜ Bajo el Escritorio ⬜ A nivel </h1>
                        </tr>
                    </tbody>
                </table>

                <h1 style={{fontSize: "13px",fontWeight:""}}> &nbsp; En el presente informe se detalla el estado del equipo verificado visualmente por el Personal de Soporte Técnico: </h1>
               
                <table className="table">
                    
                    <tbody style={{border:"5"}}>
                        <tr > 
                           
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Código Patrimonial de CPU: <u> {dep.codigopatrimonialcpu} </u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{ textAlign:"right",marginRight:"70px",fontSize: "13px",fontWeight:"700"}} > N° de Serie: <u> {dep.seriecpu} </u> </h1> </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Con seguro  ⬜ Con sticker de Manto  ⬜ Sin sticker de Manto  </h1>
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Otros  _______________________________________________________________________________________________________________ </h1>
                            </td> 
                        </tr>
                       
                    </tbody>
                </table>

                <table className="table">
                    
                    <tbody style={{border:"5"}}>
                        <tr > 
                           
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Código Patrimonial de monitor: <u> {dep.codigopatrimonialmonitor} </u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{ textAlign:"right",marginRight:"70px",fontSize: "13px",fontWeight:"700"}} > N° de Serie: <u> {dep.seriemonitor} </u> </h1> </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Pixeles quemados   ⬜ Rayado   ⬜ Poco brillo y contraste  ⬜ Pines de Conector dañados  </h1>
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Otros  _______________________________________________________________________________________________________________ </h1>
                            </td> 
                        </tr>
                       
                    </tbody>
                </table>

                <table className="table">
                    
                    <tbody style={{border:"5"}}>
                        <tr > 
                           
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Código Patrimonial del Teclado: <u> {dep.codigopatrimonialteclado} </u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{ textAlign:"right",marginRight:"70px",fontSize: "13px",fontWeight:"700"}} > N° de Serie: <u> {dep.serieteclado} </u> </h1> </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Falla de teclas  ⬜ Tipos ilegibles  ⬜ Barra espaciadora con dificultad ⬜ Pines de Conector dañados  </h1>
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp;  ⬜ Otros _______________________________________________________________________________________________________________ </h1>
                            </td> 
                        </tr>
                       
                    </tbody>
                </table>

                <table className="table">
                    
                    <tbody style={{border:"5"}}>
                        <tr > 
                           
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Marca de mouse: <u> {dep.marcamouse} </u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{ textAlign:"right",marginRight:"70px",fontSize: "13px",fontWeight:"700"}} > N° de Serie: <u> {dep.seriemouse} </u> </h1> </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Falla de teclas  ⬜ Tipos ilegibles  ⬜ Barra espaciadora con dificultad ⬜ Pines de Conector dañados </h1>
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp;  ⬜ Otros _______________________________________________________________________________________________________________ </h1>
                            </td> 
                        </tr>
                       
                    </tbody>
                </table>

                <table className="table">
                    
                    <tbody style={{border:"5"}}>
                        <tr > 
                           
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{fontSize: "13px",fontWeight:"700"}} > Código Patrimonial del UPS:<u>  </u> </h1> </td>
                            <td style={{ borderBottomWidth:"0" }}><h1 style={{ textAlign:"right",marginRight:"180px",fontSize: "13px",fontWeight:"700"}} > N° de Serie: <u> </u> </h1> </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp; ⬜ Falla de voltaje  ⬜ Falla de batería ⬜ Roto ⬜ Otros  </h1>
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ borderBottomWidth:"0" }}>
                                <h1 style={{fontSize: "13px",fontWeight:"700"}}> &nbsp;  _________________________________________________________________________________________________________________________ </h1>
                            </td> 
                        </tr>
                       
                    </tbody>
                </table>
                <table className="table">
                    <tbody style={{border:"5"}}>
                        <tr> 
                           <td style={{ borderBottomWidth:"0" }}><h1 style={{textAlign:"center", fontSize: "13px",fontWeight:"700",padding:"0px",marginBottom:"0px"}}> <u>_____________________________</u> </h1> </td>
                           <td style={{ borderBottomWidth:"0" }}><h1 style={{textAlign:"center", fontSize: "13px",fontWeight:"700",padding:"0px",marginBottom:"0px"}}> <u>_____________________________</u> </h1> </td>
                        </tr>
                        <tr> 
                           <td style={{ borderBottomWidth:"0" }}><h1 style={{textAlign:"center", fontSize: "13px",fontWeight:"500",marginBottom:"0px"}}> Técnico de Soporte </h1> </td>
                           <td style={{ borderBottomWidth:"0" }}><h1 style={{textAlign:"center", fontSize: "13px",fontWeight:"500",marginBottom:"0px"}}> Firma del Usuario  </h1> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </>

            ))}
        </>
    );

};
export default FormatoPDF;

/*
     
                <table>
                    
                    <tbody >
                        <tr style={{ border-bottom-width::"50%" }}> 
                            <td></td>
                            <td><h1 style={{  fontSize: "16px" }} > Nombre de CPU: <u> PEDRO </u> </h1> </td>
                            <td><h1 style={{  fontSize: "16px" }} > Fecha: <u> 05/09/2022 </u> </h1> </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><h1 style={{ fontSize: "16px" }} > Dependencia: <u> OFICINA DE TECNOLOGÍAS DE INFORMACIÓN </u> </h1> </td>
                            <td><h1 style={{ fontSize: "16px" }} > Usuario: <u> PEDRO manuel antonio jurado moreno</u> </h1> </td>
                        </tr>   
                        
                    </tbody>
                </table>
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint:()=>alert('Print success')
    })


    return (
        <>
            <button onClick={handlePrint}> PDF</button>
            <div className="" ref={componentRef}>

                <br></br>  <br></br>
                <img src={logo} className="" alt="logo" style={{ width: "250px", marginLeft: "50px" }} />
                <br></br>  <br></br>
                <h1 className="text-center" style={{ fontSize: "20px" }} >FORMATO 1: Verificación de Equipo – Mantenimiento Preventivo 2022 </h1>

              

         


            </div>

        </>
    );

*/
