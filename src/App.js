import "./App.css";
import { Routes,Route } from "react-router-dom";
import Dependencia from "./components/Dependencia";
import Equipo from "./components/Equipo";
import Catalogo from "./components/Catalogo";
import GraficoPC from "./components/GraficoPc";
import GraficoEstadoPC from "./components/GraficoEstadoPC";
import Login from "./components/Login";


function App() {

  return (
    <div>

        
        <Routes>
          <Route path="/" element={<Catalogo/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/dependencia" element={<Dependencia/>}/>
          <Route path="/equipo" element={<Equipo/>}/>
          <Route path="/grafico" element={ <GraficoPC/>}/>
          <Route path="/graficoestado" element={ <GraficoEstadoPC/>}/>
        </Routes>
    
     
 
    </div>
  );
}

export default App;

/*

  <div>

        <Navbar/>
        <Routes>
          <Route path="/" element={<Catalogo/>}/>
          <Route path="/dependencia" element={<Dependencia/>}/>
          <Route path="/equipo" element={<Equipo/>}/>
          <Route path="/registrar" element={ <RegistrarDependencia/>}/>
          <Route path="/editar/:id" element={ <EditarDependencia/>}/>
          <Route path="/grafico" element={ <GraficoPC/>}/>
          <Route path="/graficoestado" element={ <GraficoEstadoPC/>}/>
        </Routes>
    
     
 
    </div>


 */