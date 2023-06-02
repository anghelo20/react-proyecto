import React from "react";
import ActualizarM from "../UpdateCard/ActualizarMemo";
import "../../Style/modalMemo.css";
import ActualizarEmail from "../Cards/ActualizarEmail";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useState } from "react";

function ModalM({ memo, closeModal, resetSearch, data, actuazlizacionMemos }) {
  console.log(memo.n_memo);
  const [showUpdateM, setModal] = useState("updateMemo");
  const [dataNewMemo, setNewMemo] = useState({
    id_p: data.id_person,
    id_m: memo.id,
    subject: "",
    memo: "",
    numeroCorrelativo : memo.n_memo
  });

  const updateData = (newSubject, newMemo) => {
    console.log(newSubject, newMemo);
    setNewMemo({
      id_p: data.id_person,
      id_m: memo.id,
      subject: newSubject,
      memo: newMemo,
      numeroCorrelativo : memo.n_memo
    });
    setModal("updateEmail");
  };

  const setShowSpinner = () => {
    setModal("spinner");
  };

 

  console.log(dataNewMemo)
  return (
    <>
      <div className="block-shadow "></div>
      <div className="absolute">
        {showUpdateM === "updateMemo" ? (
          <ActualizarM
            memo={memo}
            closeModal={closeModal}
            resetSearch={resetSearch}
            data={data}
            updateData={updateData}
          />
        ) : (
          ""
        )}
        {showUpdateM === "updateEmail" ? (
          <ActualizarEmail
            dataNewMemo={dataNewMemo}
            actuazlizacionMemos={actuazlizacionMemos}
            closeModal={closeModal}
            setShowSpinner={setShowSpinner}
          />
        ) : (
          ""
        )}
        {showUpdateM === "spinner" ? (
          <LoadingSpinner text={"Actualizando"} theme={true} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ModalM;
