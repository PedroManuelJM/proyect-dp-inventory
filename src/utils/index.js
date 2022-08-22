export const ApiWebUrl="https://pruebainventariodp.herokuapp.com/";//"https://prueba12320211.000webhostapp.com/prueba/"; //http://localhost/api_inventario/

export const usuarioLocal=()=>{
    if(localStorage.getItem('DatosUsuario')!==null){
       // console.log(JSON.parse(localStorage.getItem('DatosUsuario')))
        return JSON.parse(localStorage.getItem('DatosUsuario'))
    }else{
        return null
    }
}