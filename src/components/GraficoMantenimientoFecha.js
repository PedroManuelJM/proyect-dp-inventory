import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title,Legend , CategoryScale, LinearScale,BarElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ApiWebUrl } from "../utils";
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoMantenimientoFecha() {
  const [fecha, setFecha] = useState([]);  // trae todo los datos y muestra
  const [cantidadPC, setCantidadPC]=useState([]);
  const [cantidadTotalPC, setCantidadTotalPC]=useState([]);
 
const data = {
    datasets: [
    {
        label: '# CANTIDAD DE COMPUTADORAS POR DÍA',
        data: cantidadPC,
        backgroundColor:'rgba(0,255,0,1)',
        borderColor:'black',
        borderWidth:1,
        hoverBackgroundColor:'rgba(0,255,0,2)',
        hoverBorderColor:'#FF0000',
    },
  ],
  labels:fecha, 
}

const opciones={
  //indexAxis: 'y' ,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
    responsive:true,
    plugins: {
        title: {
          display: true,
          text: 'AVANCE DEL MANTENIMIENTO DE COMPUTADORAS POR DÍAS',
        },
      },
}

// CALCULAR LA CANTIDAD DE PC 
const total = cantidadTotalPC.map((data) => Number(data.contador)).reduce((a, b) => a + b, 0); 

const peticionAPI= async()=>{
    const rutaServicio = ApiWebUrl + "equiposmantenimientofecha";
    fetch(rutaServicio)
    .then( res => res.json() )
       .then(
              (result) => {
                    let respuesta = result;
                    let fecha= [], cantidadPC=[];
                    respuesta.forEach(elemento => {
                      fecha.push(elemento.fecha_mantenimiento)
                      cantidadPC.push(elemento.contador)
                    });
                    setFecha(fecha);
                    setCantidadPC(cantidadPC);
                    setCantidadTotalPC(result)
               }
            )
}
useEffect(()=> {

  peticionAPI();

}, [])

return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        <b>TOTAL DE COMPUTADORAS :</b> <span className="badge bg-success rounded-pill"> {total}</span> 
        <Bar data={data} options={opciones} />

        </div>
      </div>
    </div>
  );
}

export default GraficoMantenimientoFecha;
