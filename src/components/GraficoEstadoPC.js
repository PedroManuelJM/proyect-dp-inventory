import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, Legend , CategoryScale, LinearScale,BarElement} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { ApiWebUrl } from "../utils";

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

const data = {
    datasets: [
    {
        label: '# CANTIDAD DE COMPUTADORAS - ESTADO',
        data: contador,
        backgroundColor:'rgba(0,255,0,1)',
        borderColor:'black',
        borderWidth:1,
        hoverBackgroundColor:'rgba(0,255,0,2)',
        hoverBorderColor:'#FF0000',
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
          text: 'CANTIDAD DE COMPUTADORAS POR OFICINA',
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

const obtenerGraficoEstado= (itemEq) => {
    const rutaServicio = ApiWebUrl + "graficoestado.php"; //"http://localhost/api_inventario/graficoestado.php";

    var formData = new FormData();
    formData.append("iddependencia",itemEq)  
    //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  

    fetch(rutaServicio,{
        method: 'POST',
        body: formData
    })
    .then(
        res => res.json()
    )
    .then(
        (result) => {
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
  obtenerGraficoEstado(iddependencia);
  getDependencias();


}, [iddependencia])

const getDependencias = async () => {
    const rutaServicio = ApiWebUrl +"dependencia.php"; //"http://localhost/api_inventario/dependencia.php";
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
    <div className="container">
      <div className="row">
        <div className="col-md-12">

        <div className="form-group col-md-6">
                    <label htmlFor="inputDependencia" className="form-label"> <b>DEPENDENCIA</b></label>
                    <br></br>
                    <select className="form-control" name="dependencia" onChange={(e) => setIdDependencia(e.target.value)} value={iddependencia} >
                 
                    <option value="">Seleccione la dependencia </option>
                     {dependencias && dependencias.map((dep) => (
                       <option  key={dep.iddependencia} value={dep.iddependencia}> {dep.nombre_dependencia}</option>
                     ))}

                    </select>
        </div>    
        <b>TOTAL DE COMPUTADORAS :</b> <span className="badge bg-success rounded-pill">  </span> 
        <Bar data={data} options={opciones} />

        </div>
      </div>
    </div>
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