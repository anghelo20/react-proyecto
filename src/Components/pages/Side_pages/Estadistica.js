import React from "react";
import "antd/dist/antd.min.css";
import "../../../Style/estadistica.css";
import Buscador from "../../Cards/Buscador";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import TablaReporte from "../../Tables/TablaReporte";
import { Empty ,message } from "antd";
import { useState } from "react";
import ReportPdf from "../../../Service/Pdf/ReportePdf";

export default function Estadistica() {
  const [dataReport, setDataReport] = useState([]);
  const [dataColumns, setDataColumns] = useState("");
  const [dataReportPdf, setReportPdf] = useState([]);
  const [spinnerShowRepor, setSpinnerReport] = useState("");

  const successGetDataReport = () => {
    message.success({content:'BUSQUEDA COMPLETADA',
    className: 'message-succes-content',
    duration:2.5
    
  });
  };


  const successReportPdf = () => {
    message.success({content:'REPORTE REALIZADO',
    className: 'message-succes-content',
    duration:2.5
    
  });
  };


  const setColumns = (typeColumn) => {
    setDataColumns(typeColumn);
  };

  const setReport = (report) => {
    setDataReport(report);
    successGetDataReport()
  };

  const setNewReportPdf = (dataReport) => {
    setReportPdf(dataReport);
  };

  const sendDataReportPdf = () => {
    console.log(dataReport.length);
    if (dataReportPdf.length === 0) {
      ReportPdf(dataReport, dataColumns);
      successReportPdf()
    } else {
      ReportPdf(dataReportPdf, dataColumns);
      successReportPdf()
    }
  };

  return (
    <div className="filtering-content">
      <div className="title-statics">
      <i className="fas fa-chart-bar"></i>
      <span>Estadistica</span>
      </div>
      <div className="filter-content">
        <div className="filter-search">
          <Buscador setReport={setReport} setColumns={setColumns} setSpinnerReport={setSpinnerReport} />
        </div>
        <div className="filter-table">
          {spinnerShowRepor === "" ? (
            <Empty
              className="empty"
              imageStyle={{
                height: 90,
                color: "#1890ff",
              }}
              description={<span>Consulte Datos</span>}
            />
          ) : spinnerShowRepor === "spinner" ? (
            <LoadingSpinner />
          ) : (
            <TablaReporte
              dataReport={dataReport}
              dataColumns={dataColumns}
              setNewReportPdf={setNewReportPdf}
              sendDataReportPdf={sendDataReportPdf}
            />
          )}
        </div>
      </div>
    </div>
  );
}
