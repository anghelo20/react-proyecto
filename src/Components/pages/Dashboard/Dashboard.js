import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import GlobalContext from "../../../Context/GlobalContext";
import { notification } from "antd";
import Principal from "../Side_pages/Principal";
import Memo from "../Side_pages/Memo";
import Persona from "../Side_pages/Persona";
import Estadistica from "../Side_pages/Estadistica";
import Configuracion from "../Side_pages/Configuracion";
import "../../../Style/dashboard.css";
import { useEffect } from "react";

export default function Dashboard() {

  const openNotification = () => {
    notification.open({
      message: 'Notificacion de Memo',
      description:
        'La persona dada ya excedio la cantidad de memos establecido',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  useEffect(() => {
    openNotification()  
  }, [])
  
  const stateGlobal ={
    stateNotificacion : true,
    daysAfter : 2,
    stateEdit: true,
    stateDelete:true,
    memosLimite: 5,
}

  return (
    <GlobalContext.Provider value ={stateGlobal}>
    <div className="dash">
      <div className="side-dash">
        <div className="header-side">
          <div className="content-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFogB3c0aNtnWrl9WPR9VHd4RZXjx5ZAT4Dw&usqp=CAU"
              alt="no hay imagen"
            />
          </div>
          <h2>Sara Jessica Parker</h2>
        </div>
        <nav className="content-side">
          <ul className="content-link">
            <li className="link-component">
              <Link className="link" to="principal">
                <i className="fa-solid fa-house"></i>principal
              </Link>
            </li>
            <li className="link-component">
              <Link className="link" to="persona">
                <i className="fa-solid fa-person"></i>persona
              </Link>
            </li>
            <li className="link-component">
              <Link className="link" to="memo">
                <i className="fa-solid fa-file"></i>memo
              </Link>
            </li>
            <li className="link-component">
              <Link className="link" to="estadistica">
                <i className="fas fa-chart-bar"></i>estadistica
              </Link>
            </li>
            <li className="link-component">
              <Link className="link" to="configuracion">
                <i className="fa-solid fa-screwdriver-wrench"></i>configuracion
              </Link>
            </li>
            <li className="link-component">
              <Link className="link" to="/">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>Salir
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="principal" element={<Principal />}></Route>
        <Route path="memo" element={<Memo />}></Route>
        <Route path="persona" element={<Persona />}></Route>
        <Route path="estadistica" element={<Estadistica />}></Route>
        <Route path="configuracion" element={<Configuracion />}></Route>
        <Route path="/" ></Route>
      </Routes>
    </div>
    </GlobalContext.Provider>
  );
}
