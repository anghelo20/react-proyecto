import React from "react";
import {message } from 'antd';
import Buscar from "../../Cards/Buscar";
import "../../../Style/memos.css";
import MostrarPersona from "../../Cards/MostrarPersona";
import { useState } from "react";
import Tablamemos from "../../Tables/Tablamemos";
import ModalM from "../../Modals/ModalMemo";
import BuscarMemo from "../../../Service/Memos/buscarMemo";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import MemoEnvio from "../../Cards/MemoEnvio";

function Memo() {
  const [data, setData] = useState();
  const [show, setShow] = useState("");
  const [showM, setModal] = useState(false);
  const [dataM, setMemos] = useState([]);
  const [memo, setMemo] = useState();
  const [spinnner, setSpinner] = useState(false);



  const MessageUpdateMemo = () => {
    message.success({content:'MEMO ACTUALIZADO CORRECTAMENTE',
    className: 'message-update-content',
    duration:2.5
    
  });
  };

  const MessageDeleteMemo = () => {
    message.error({content:'MEMO ELIMINADO CORRECTAMENTE',
    className: 'message-delete-content',
    duration:2.5
    
  });
  };

  const MessageSearchMemo = () => {
    message.success({content:'BUSQUEDA COMPLETADA',
    className: 'message-succes-content',
    duration:2.5
    
  });
  };

  const statebtndisable = true;
  const resetSearchMemo = () =>{
    setShow('')
  }
  const ObtenerDatos = (personData) => {
    resetSearchMemo()
    setData(personData);
  };

  const obetenerMemos = (memos) => {
    setMemos(memos);
  };


  const searchMemos = async () => {
    console.log("entre");
    showSpinner();
    if (data) {
      let response = await BuscarMemo({ dni: data.dni });
      let datos = await response.json();
      obetenerMemos(datos);
      setSpinner(false);
      showMemos();
    }
  };

  const actualizarLista = (id) => {
    let newList = dataM.filter((memo) => {
      return memo.id !== id;
    });
    setMemos(newList);
    MessageDeleteMemo()
  };

  const actuazlizacionMemos = (id, newsubject, newmemo) => {
    let newList = dataM.map((memo) => {
      if (memo.id === id) {
        memo.asunto = newsubject;
        memo.razon = newmemo;
      }
      return memo;
    });

    setMemos(newList);
    closeModal();
    MessageUpdateMemo()
  };

  const showSpinner = () => {
    setShow("");
    setSpinner(true);
  };
  
  const closeSpinner = () =>{
    setSpinner(false);
  }

  const showMemomarandum = () => {
    setSpinner(false);
    setShow("send-memo");
  };

  const showMemos = () => {
    if (dataM.length !== 0) {
      setSpinner(false);
      setShow("search-memo");
    } else {
      setShow("search-memo");
    }
  };

  const resetSearch = () => {
    setModal(false);
    setShow("");
    searchMemos();
    setShow("search-memo");
  };

  const showModal = (e) => {
    let id = e.target.getAttribute("data-id");
    let newMemo = dataM.find((memo) => {
      return memo.id.toString() === id;
    });
    setMemo({ ...newMemo });
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleActive = async (e) => {
    if (e.currentTarget.classList.contains(show)) {
      return;
    }
    if (e.currentTarget.classList.contains("search-memo")) {
      await searchMemos();
      setShow("search-memo");
      MessageSearchMemo()
    } else if (e.currentTarget.classList.contains("send-memo")) {
      setShow("send-memo");
    }
  };
  return (
    <div className="memo-main">
      <div className="title-memo">
      <i className="fa-solid fa-file"></i>
      <span>Memo</span>
      </div>
      {showM ? (
        <ModalM
          data={data}
          memo={memo}
          closeModal={closeModal}
          resetSearch={resetSearch}
          actuazlizacionMemos={actuazlizacionMemos}
        />
      ) : (
        ""
      )}
      <div className="memo-cards">
        <div className="memo-card">
          <div className="memo-card-search person">
            <Buscar ObtenerDatos={ObtenerDatos} resetSearchMemo={resetSearchMemo} />
          </div>
          <div className="memo-card-show person">
            {<MostrarPersona data={data} handleActive={handleActive} statebtndisable={statebtndisable} />}
          </div>
        </div>
        <div className="memo-card-description ">
          {show === "send-memo" ? (
            <MemoEnvio
              data={data}
              showSpinner={showSpinner}
              showMemomarandum={showMemomarandum}
              closeSpinner={closeSpinner}
            />
          ) : (
            ""
          )}
          {show === "search-memo" ? (
            <Tablamemos
              showModal={showModal}
              dataM={dataM}
              data={data}
              actualizarLista={actualizarLista}
            />
          ) : (
            ""
          )}
          {spinnner ? <LoadingSpinner  /> : ""}
        </div>
      </div>
    </div>
  );
}

export default Memo;
