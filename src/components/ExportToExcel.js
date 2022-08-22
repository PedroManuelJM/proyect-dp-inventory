import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import excel from '../assets/images/excel.png';
export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    /* cabeceras de las columnas */
    XLSX.utils.sheet_add_aoa(ws, [["N°","NOMBRE EQUIPO","ID_DEPENDENCIA","DEPENDENCIA","OFICINA","USUARIO","SEDE","TIPO DE ORDENADOR","MARCA","PROCESADOR","TIPO DE PROCESADOR","SISTEMA OPERATIVO","MEMORIA RAM","HDD","CÓDIGO CPU","SERIE CPU","CÓDIGO MONITOR","SERIE MONITOR","CÓDIGO TECLADO","SERIE TECLADO","MARCA MOUSE","SERIE MOUSE","CÓDIGO ESTABILIZADOR","SERIE ESTABILIZADOR","TIPO CONEXIÓN","ESTADO","FECHA ADQUISICIÓN","OBSERVACIÓN","ACTUALIZADO POR","FECHA_INVENTARIO"]], { origin: "A1" });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className="col-md-6">
      <button onClick={(e) => exportToCSV(apiData, fileName)} style={{border:"none",background:"none"}}  className="float-right"> <img className="delete" src={excel} alt='excel'/> </button>

    </div>
  );
};