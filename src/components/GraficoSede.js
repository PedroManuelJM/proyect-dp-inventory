import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, Legend , CategoryScale, LinearScale,BarElement} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { ApiWebUrl } from "../utils";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoSede() {
  const [sede, setSede] = useState([]);  // trae todo los datos y muestra
  const [contador, setContador]=useState([]);
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
  labels:sede,
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
         
        },
      },
}




const obtenerGraficoSede= async () => {
    ///const rutaServicio = ApiWebUrl + "graficoestado.php"; //"http://localhost/api_inventario/graficoestado.php";
    const rutaServicio =  ApiWebUrl + 'equipossede';
    // var formData = new FormData();
    //formData.append("iddependencia",itemEq)  
    //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

    fetch(rutaServicio,{
     method: 'GET',
    })
    .then(
        res => res.json()
    )
    .then(
        (result) => {
           console.log(result);
       
           let respuesta = result;
           let sede= [], contador=[];
            /* respuesta.forEach = respuesta.map */
            respuesta.forEach(elemento => {
              sede.push(elemento.sede)
              contador.push(elemento.contador)
            });
            setSede(sede);
            setContador(contador);
            setLista(result);
         
       }
    )
}
useEffect(()=> {

obtenerGraficoSede();

},[])


return (
  <div>
    <br></br>
    <b> # NRO DE COMPUTADORAS POR SEDES </b>
    <table
      className="table table-striped table-responsive"
      width="100%"
      id="table"
      style={{border:"2px solid black"}}
    >
      <thead>
        <tr>
          <th className="text-center">SEDES</th>
          <th className="text-center">CANTIDAD DE COMPUTADORAS</th>
        </tr>
      </thead>

      <tbody>
        {lista.length === 0 && <h5> No se encontró en la base de datos. </h5>}
        {lista &&
          lista.map((list) => (
            <tr className="table-dark" key={list.iddependencia}>
              <td className="text-center"> {list.sede}</td>
              <td className="text-center"> {list.contador}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <Bar data={data} options={opciones} />
  </div>
);
}

export default GraficoSede;
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