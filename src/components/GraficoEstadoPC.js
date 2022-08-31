import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, Legend , CategoryScale, LinearScale,BarElement} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import GraficoSede from './GraficoSede';
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoEstadoPC() {
  const [estado, setEstado] = useState([]);  // trae todo los datos y muestra
  const [contador, setContador]=useState([]);
  const [dependencias, setDependencia] = useState([]);  // trae todo los datos y muestra
  const [iddependencia, setIdDependencia]= useState('');
  const [lista, setLista]=useState([]);
  const [showNav,setShowNav] =useState(false); // para el navbar

const data = {
    datasets: [
    {
        label: '# CANTIDAD DE COMPUTADORAS',
        data: contador,
        backgroundColor:['#4caf50','#ebbd32','#f44336'],
        borderColor:'black',
        borderWidth:1,
        hoverBackgroundColor:['#10ef19','#ffc107','#e51d0e'],
        hoverBorderColor:'#1e201e',
    },
  ],
  //labels:["BAJA", "INOPERATIVO","OPERATIVO","SIN USO"], 
  labels:estado,
}

const opciones={
  //  maintainAspectRatio:false,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
    responsive:true,
    plugins: {
        title: {
          display: true,
          //text: 'CANTIDAD DE COMPUTADORAS POR OFICINA',
        },
      },
}

/*
const peticionAPI= (iddependencia)=>{
    //const rutaServicio ="http://localhost/api_inventario/graficoestado.php";
    const rutaServicio =`http://localhost/api_inventario/graficoestado.php?iddependencia=${iddependencia}`;
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    let respuesta = result;
                    let estado= [], contador=[];
                    respuesta.map(elemento => {
                      estado.push(elemento.estado)
                      contador.push(elemento.contador)
                    });
                    setEstado(estado);
                    setContador(contador);
               
                 
               }
            )
}*/
// CALCULAR LA CANTIDAD DE PC 
const total = lista.map((data) => Number(data.contador)).reduce((a, b) => a + b, 0); 

const obtenerGraficoEstado= (itemEq) => {
    ///const rutaServicio = ApiWebUrl + "graficoestado.php"; //"http://localhost/api_inventario/graficoestado.php";
    const rutaServicio =  ApiWebUrl + `equiposestado/${itemEq}`;
    // var formData = new FormData();
    //formData.append("iddependencia",itemEq)  
    //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

    fetch(rutaServicio,{
       // method: 'GET',
      //  body: formData,

     
    })
    .then(
        res => res.json()
    )
    .then(
        (result) => {
           console.log(result);
           setLista(result);
           let respuesta = result;
           let estado= [], contador=[];
            /* respuesta.forEach = respuesta.map */
           respuesta.forEach(elemento => {
              estado.push(elemento.estado)
              contador.push(elemento.contador)
            });
            setEstado(estado);
            setContador(contador);
       
         
       }
    )
}
useEffect(()=> {

 // peticionAPI(iddependencia);
 // console.log(iddependencia)
  obtenerGraficoEstado(iddependencia);
  getDependencias();


}, [iddependencia])

const getDependencias = async () => {
    const rutaServicio = ApiWebUrl +"dependencia"; //"http://localhost/api_inventario/dependencia.php";
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    console.log(result);
                    setDependencia(result);
               
               }
            )
};
/*
const getData = async () => {
    const rutaServicio ="https://pedromanueljm.github.io/api_onepiece/data.json";
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    console.log(result);
                    setDatas(result);
               
               }
            )
};
*/
return (
    <>
      <div className=''>
        <header> <FontAwesomeIcon icon={faBars} style={{color:"#fff"}} onClick={()=> setShowNav(!showNav)} /> </header>
        <Navbar show={showNav}/>
      </div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
          <label htmlFor="inputDependencia" className="form-label"> <b>1).REPORTE - SEDE</b></label>
           <GraficoSede/>
          </div>
          <div className="col-md-2">
        
          </div>
          <div className="col-md-5">

            <div className="form-group col-md-12">
                        <label htmlFor="inputDependencia" className="form-label"> <b>2).REPORTE - DEPENDENCIA</b></label>
                        <br></br>
                        <select className="form-control" name="dependencia" onChange={(e) => setIdDependencia(e.target.value)} value={iddependencia} >
                    
                        <option value="">Seleccione la dependencia </option>
                        {dependencias && dependencias.map((dep) => (
                          <option  key={dep.iddependencia} value={dep.iddependencia}> {dep.nombre_dependencia}</option>
                        ))}

                        </select>
            </div> 
            <br></br>
            <table
              className="table table-striped table-responsive"
              width="100%"
              id="table"
              style={{ border: "2px solid black" }}
            >
              <thead>
                <tr>
                  <th className="text-center">ESTADO </th>
                  <th className="text-center">CANTIDAD DE COMPUTADORAS</th>
                </tr>
              </thead>

              <tbody>
                {lista.length === 0 && <h5>  </h5>}
                {lista &&
                  lista.map((list) => (
                    <tr className="table-dark" key={list.iddependencia}>
                      <td className="text-center"> {list.estado}</td>
                      <td className="text-center"> {list.contador}</td>
                    </tr>
                  ))}
              </tbody>
            </table> 
            <b> TOTAL DE COMPUTADORAS POR DEPENDENCIA :</b> <span className="badge bg-success rounded-pill"> {total} </span> 
            <Bar data={data} options={opciones} />

          </div>
        </div>
      </div>
    </>
  );
}

export default GraficoEstadoPC;
/*
  const data={
     labels:['CASA MILITAR','OFICINA DE TECNOLOGÍAS DE INFORMACIÓN','italia','colombia','españa'],
     datasets:[{
        label:'HABITANTES',
        backgroundColor:'rgba(0,255,0,1)',
        borderColor:'black',
        borderWidth:1,
        hoverBackgroundColor:'rgba(0,255,0,0.2)',
        hoverBorderColor:'#FF0000',
        data:[327.16,126.19,60.43,49.64,46.72]

     }]
    };


    const opciones = {
        maintainAspectRatio:false,
        responsive:true
    }

    return(
     <div style={{width:'100%',height:'500px'}}> 
        <h2> poblacion  </h2>
        <Bar data={data} options={opciones}/>
      </div>
    );

*/