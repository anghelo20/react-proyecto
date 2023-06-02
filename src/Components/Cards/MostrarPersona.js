import React from "react";
import "../..//Style/mostrarpersona.css";

function MostrarPersona({ data,handleActive,statebtndisable }) {

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
          <button onClick={handleActive} className="send-memo" disabled={data ? !statebtndisable : statebtndisable}>
            <i className="fa-solid fa-file-pen send-memo "></i>Enviar Memo
          </button>
          <button onClick={handleActive} className="search-memo" disabled={data ? !statebtndisable : statebtndisable}>
          <i className="fa-solid fa-magnifying-glass search-memo"></i>Buscar Memos
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default MostrarPersona;
