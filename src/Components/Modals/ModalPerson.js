import React from "react";
import ActualizarP from "../UpdateCard/ActualizarPerson";
import "../../Style/modalPersona.css";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useState } from "react";

function Modal({ handleActive, data, actualizarPerson }) {
  const [showPerson, setCardData] = useState("updatePerson");

  const setUpdatePerson = () => {
    setCardData("spinner");
  };
  return (
    <>
      <div className="block-shadow "></div>
      <div className="absolute">
        {showPerson === "updatePerson" ? (
          <ActualizarP
            setUpdatePerson={setUpdatePerson}
            handleActive={handleActive}
            data={data}
            actualizarPerson={actualizarPerson}
          />
        ) : (
          ""
        )}
        {showPerson === "spinner" ? (
          <LoadingSpinner className="loading-update" text={"Actualizando"} theme={true} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Modal;
