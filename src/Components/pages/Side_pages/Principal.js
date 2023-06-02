import React, { useEffect } from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../../../Style/principal.css";
import getchartQuery from "../../../Service/Graficos/ObtenerDateGrafico";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
};
const dataLabels = {
  "01": "0",
  "02": "1",
  "03": "2",
  "04": "3",
  "05": "4",
  "06": "5",
  "07": "6",
  "08": "7",
  "09": "8",
  10: "9",
  11: "10",
  12: "11",
};
const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function Principal() {
  const [bitacoraInfoPerson, setBitacoraInfoPerson] = useState([]);
  const [bitacoraInfoMemo, setBitacoraInfoMemo] = useState([]);
  const [ListPersonActive, setPersonActive] = useState([]);
  const [ListPersonInactive, setPersonInactive] = useState([]);
  const [ListMemoActive, setMemoActive] = useState([]);
  const [ListMemoInactive, setMemoInactive] = useState([]);

  const dataPersonActive = {
    labels,
    datasets: [
      {
        label: "Personas Registradas Activas",
        data: ListPersonActive,
        borderColor: "rgb(55, 138, 182)",
        backgroundColor: "rgba(55, 138, 182, 0.5)",
      },
    ],
  };

  const dataPersonInactive = {
    labels,
    datasets: [
      {
        label: "Personas Registradas Inactivas",
        data: ListPersonInactive,
        borderColor: "rgb(220, 48, 48)",
        backgroundColor: "rgba(220, 48, 48, 0.5)",
      },
    ],
  };

  const dataMemoActive = {
    labels,
    datasets: [
      {
        label: "Memos Registrados Activos",
        data: ListMemoActive,
        borderColor: "rgb(64, 148, 71)",
        backgroundColor: "rgba(64, 148, 71, 0.5)",
      },
    ],
  };

  const dataMemoInactive = {
    labels,
    datasets: [
      {
        label: "Memos Registrados Inactivos",
        data: ListMemoInactive,
        borderColor: "rgb(197, 18, 18)",
        backgroundColor: "rgb(197, 18, 18,0.5)",
      },
    ],
  };

  useEffect(() => {
    getDateChart();
  }, []);

  const getDateChart = async () => {
    let DataInfo = await getchartQuery();
    const { dataBarChart, dataBitacora } = DataInfo;
    const { PersonaCreada,PersonaEliminada,MemoCreada,MemoEliminada } = dataBarChart;
    const { Person, Memo } = dataBitacora;
    setBitacoraInfoPerson(Person);
    setBitacoraInfoMemo(Memo);
    let newArryPersonActive = Array(12).fill(0);
    let newArryPersonInactive = Array(12).fill(0);
    let newArryMemoActive = Array(12).fill(0);
    let newArryMemoInactive = Array(12).fill(0);
    PersonaCreada.forEach((person) => {
      console.log((newArryPersonActive[dataLabels[person.mes]] = person.cantidad));
    });
    PersonaEliminada.forEach((person) => {
      console.log((newArryPersonInactive[dataLabels[person.mes]] = person.cantidad));
    });
    MemoCreada.forEach((person) => {
      console.log((newArryMemoActive[dataLabels[person.mes]] = person.cantidad));
    });
    MemoEliminada.forEach((person) => {
      console.log((newArryMemoInactive[dataLabels[person.mes]] = person.cantidad));
    });
    setPersonActive(newArryPersonActive);
    setPersonInactive(newArryPersonInactive)
    setMemoActive(newArryMemoActive)
    setMemoInactive(newArryMemoInactive)
  };

  return (
    <div className="chart-principal">
      <div className="charts">
      <div className="title-chart">
      <i className="fa-solid fa-house"></i>
      <span>Principal</span>
      </div>
        <div className="charts-header">
          <div className="charts-header-content person-create">
            <div className="chart-icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="chart-information">
              <h5>
                {bitacoraInfoPerson.length === 0
                  ? 0
                  : bitacoraInfoPerson[1].cantidad}
              </h5>
              <h5>Personas Activas</h5>
            </div>
          </div>
          <div className="charts-header-content person-delete">
            <div className="chart-icon">
              <i className="fa-solid fa-user-xmark"></i>
            </div>
            <div className="chart-information">
              <h5>
                {bitacoraInfoPerson.length === 0
                  ? 0
                  : bitacoraInfoPerson[0].cantidad}
              </h5>
              <h5>Personas Eliminadas</h5>
            </div>
          </div>
          <div className="charts-header-content memo-create">
            <div className="chart-icon">
              <i className="fa-solid fa-file-circle-plus"></i>{" "}
            </div>
            <div className="chart-information">
              <h5>
                {bitacoraInfoMemo.length === 0
                  ? 0
                  : bitacoraInfoMemo[1].cantidad}
              </h5>
              <h5>Memos Activos</h5>
            </div>
          </div>
          <div className="charts-header-content memo-delete">
            <div className="chart-icon">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className="chart-information">
              <h5>
                {bitacoraInfoMemo.length === 0
                  ? 0
                  : bitacoraInfoMemo[0].cantidad}
              </h5>
              <h5>Memos Eliminados</h5>
            </div>
          </div>
        </div>
        <div className="charts-content">
          <div className="charts-show">
            <div className="chart-content-bar-person">
              <Line options={options} data={dataPersonActive} />
            </div>
            <div className="chart-content-bar-person">
              <Line options={options} data={dataPersonInactive} />
            </div>
          </div>
          <div className="charts-show">
            <div className="chart-content-bar-person">
              <Line options={options} data={dataMemoActive} />
            </div>
            <div className="chart-content-bar-person">
              <Line options={options} data={dataMemoInactive} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Principal;
