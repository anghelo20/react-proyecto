import React, { useState } from "react";
import Memorandum from "../../Components/Modals/Memorandum";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Email from "./Email";

export default function MemoEnvio({ data}) {
  const [showCard, setCard] = useState("memo");
  const [spinner, setShowSpinner] = useState('')
  const [saveMemo, setSave] = useState({subject: "",memo:""})

  const showSpinnerGenerate = () =>{
    setCard("")
    setShowSpinner("generate")

  }

  const showSpinnerSend = () =>{
    setCard("")
    setShowSpinner("send")

  }

  const cancelMemo = () =>{
    setCard("")
    setShowSpinner("cancel")
  }

  const saveDataMemo = (subject,memo) =>{
    setSave({subject:subject,memo:memo})
  }

  const showEmail = () =>{
        setShowSpinner('')
    setCard("email")
    
  }

  const showMemoGenerate = () =>{
        setShowSpinner('')
    setCard("memo")
    
  }

  return (
    <>
      {showCard === "memo" ? (
            <Memorandum
              data={data}
              showSpinnerGenerate={showSpinnerGenerate}
              showEmail={showEmail}
              saveDataMemo={saveDataMemo}
            />
          ) : (
            ""
          )}
          {showCard === "email" ? (
            <Email
            data={data}
            saveMemo={saveMemo}
            showMemoGenerate={showMemoGenerate}
            showSpinnerSend={showSpinnerSend}
            cancelMemo={cancelMemo}
            />
          ) : (
            ""
          )}
          {spinner === "generate"  ? <LoadingSpinner text={"Generando Memo"} theme={false} /> : ""}
          {spinner === "send" ? <LoadingSpinner text={"Enviando Memo"} theme={false}/> : ""}
          {spinner === "cancel" ? <LoadingSpinner text={"Cancelando Memo"} theme={false}/> : ""}
    </>
  );
}
