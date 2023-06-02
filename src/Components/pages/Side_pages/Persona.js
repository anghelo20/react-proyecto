import React, { useState, useRef } from "react";
import { message } from "antd";
import "../../../Style/person.css";
import Buscar from "../../Cards/Buscar";
import Crear from "../../Cards/Crear";
import ModalP from "../../Modals/ModalPerson";
import eliminar from "../../../Service/Persona/Eliminar";
import PersonCard from "../../Cards/PersonCard";

export default function Persona() {
  const [tab, setTab] = useState("tab-search");
  const [data, setData] = useState({});
  const [active, setActive] = useState(false);
  const [activeT, setCard] = useState(false);

  const refBuscar = useRef(null);
  const refCrear = useRef(null);

  const successUpdate = () => {
    message.success({
      content: "PERSONA ACTUALIZADA CORRECTAMENTE",
      className: "message-update-content",
      duration: 2.5,
    });
  };

  const successDelete = () => {
    message.success({
      content: "PERSONA ELIMINADA CORRECTAMENTE",
      className: "message-delete-content",
      duration: 2.5,
    });
  };

  const manejoTab = (e) => {
    if (e.currentTarget.classList.contains("active")) {
      return;
    }
    if (e.currentTarget.classList.contains("tab-search")) {
      refBuscar.current.classList.remove("active");
      refCrear.current.classList.remove("active");
      refBuscar.current.classList.add("active");
      setTab("tab-search");
      setCard(false);
    } else if (e.currentTarget.classList.contains("tab-create")) {
      refBuscar.current.classList.remove("active");
      refCrear.current.classList.remove("active");
      refCrear.current.classList.add("active");
      setTab("tab-create");
      setCard(false);
    }
  };

  const ObtenerDatos = (personData) => {
    setData(personData);
    setCard(true);
  };

  const actualizarPerson = (newPerson) => {
    setData(newPerson);
    setCard(true);
    successUpdate();
  };

  const handleActive = () => {
    setActive(!active);
  };

  const removePersona = (dni) => {
    eliminar({ dni });
    setCard(false);
    successDelete();
    setData({});
  };

  return (
    <div className="person-content">
      <div className="title-person">
        <i className="fa-solid fa-person"></i>
        <span>Persona</span>
      </div>
      {active ? (
        <ModalP
          handleActive={handleActive}
          data={data}
          actualizarPerson={actualizarPerson}
        />
      ) : (
        ""
      )}
      <div className="card">
        <div className="card-header">
          <div
            ref={refBuscar}
            className="header-tab tab-search active"
            onClick={manejoTab}
          >
            <i className="fa-solid fa-magnifying-glass"></i>Buscar
          </div>
          <div
            ref={refCrear}
            className="header-tab tab-create"
            onClick={manejoTab}
          >
            <i className="fa-solid fa-circle-plus"></i>Crear
          </div>
        </div>
        <div className="card-content">
          {tab === "tab-search" ? (
            <Buscar ObtenerDatos={ObtenerDatos} />
          ) : (
            <Crear />
          )}
        </div>
      </div>
      <div className="card-person-content">
        {activeT ? (
          <PersonCard
            data={data}
            handleActive={handleActive}
            removePersona={removePersona}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
