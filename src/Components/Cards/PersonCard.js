import React from "react";
import "../../Style/personCard.css"

function PersonCard({ data, handleActive, removePersona }) {
  return (
    <div className="person-card">
      <div className="person-form">
        <div className="person-data">
          <label>Nombres</label>
          <input type="text" value={data ? data.nombre : ""} readOnly></input>
        </div>
        <div className="person-data">
          <label>Apellido Paterno</label>
          <input type="text" value={data ? data.apellido_P : ""} readOnly />
        </div>
      </div>
      <div className="person-form">
        <div className="person-data">
          <label>Apellido Materno</label>
          <input type="text" value={data ? data.apellido_M : ""} readOnly />
        </div>
        <div className="person-data">
          <label>DNI</label>
          <input type="text" value={data ? data.dni : ""} readOnly />
        </div>
      </div>
      <div className="person-form">
        <div className="person-data email">
          <label>Correo Electronico</label>
          <input type="email" value={data ? data.correo : ""} readOnly />
        </div>
      </div>
      <div className="person-form">
        <div className="person-data buttons">
          <button onClick={handleActive} >
            <i className="fa-solid fa-file-pen send-memo "></i>Actualizar
          </button>
          <button onClick={()=>removePersona(data.dni)} >
          <i className="fa-solid fa-trash search-memo"></i>Eliminar
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
