import React from "react";
import {message } from 'antd';
import { useForm } from "react-hook-form";
import CrearMemo from "../../Service/Memos/crearMemo";
import "../../Style/cardMemorandum.css";

function Memorandum({ data, showSpinnerGenerate, showEmail, saveDataMemo }) {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const MessageGenerateMemo = () => {
    message.success({content:'MEMO GENERADO',
    className: 'message-update-content',
    duration:2.5
    
  });
  };

  

  const handleSubmitMemo = async (memoData) => {
    console.log(memoData)
    let newSubject = memoData.subject.charAt(0).toUpperCase() + memoData.subject.slice(1)
    let newMemo = memoData.memo.charAt(0).toUpperCase() + memoData.memo.slice(1)
    showSpinnerGenerate();
    let response = await CrearMemo({
      id_p: data.id_person,
      subject: newSubject,
      memo: newMemo,
    })
    if(response === 200){
      showEmail();
      saveDataMemo(newSubject, newMemo);
      MessageGenerateMemo()
    };
  
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitMemo)}>
      <div className="memorandum-card">
        <div className="memoran-header">
          <h2>Creacion de Memo</h2>
        </div>
        <div className="memoran-content">
          <div className="area-memo">
            <div className="subject-content">
              <input
                {...register("subject", {
                  required: { value: true },
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                  },
                })}
                style={{ outline: errors.subject?.type ? '3px solid #d93025' : '' }}
                type="text"
                placeholder="Ingrese el Asunto"
              />
              {errors?.subject?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.subject?.type === "pattern" && (
              <span>Solo caracteres alfabeticos</span>
            )}
            </div>

            <textarea
              {...register("memo", {
                required: { value: true },
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                },
              })}
              style={{ outline: errors.memo?.type ? '3px solid #d93025' : '' }}
              placeholder="Ingrese el Contenido"
            ></textarea>
            {errors?.memo?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.memo?.type === "pattern" && (
              <span>Solo se aceptan caracteres alfabeticos y algunos especiales como , ; . @ </span>
            )}
          </div>
          <div className="buttons">
            <button>
              {" "}
              <i className="fa-solid fa-file-pdf"></i> Generar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Memorandum;
