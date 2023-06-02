import React from "react";
import {message } from 'antd';
import { useForm } from "react-hook-form";
import EnviarMemo from "../../Service/Memos/enviarMemo";
import eliminarPdf from "../../Service/Pdf/EliminarPdf";
import "../../Style/newEmail.css";

export default function Email({
  data,
  saveMemo,
  showMemoGenerate,
  showSpinnerSend,
  cancelMemo,
}) {

  const MessageSendMemo = () => {
    message.success({content:'MEMO ENVIADO CORRECTAMENTE',
    className: 'message-succes-content',
    duration:2.5
    
  });
  };


  const MessageCancelMemo = () => {
    message.error({content:'MEMO CANCELADO',
    className: 'message-delete-content',
    duration:2.5
    
  });
  };
  

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  

  const backToGenerate = async () => {
    cancelMemo();
    let status = await eliminarPdf();
    if (status === 200) {
      MessageCancelMemo()
      showMemoGenerate();
    }
  };

  const handleSubmitEmail = async (dataEmail) => {
    console.log(dataEmail);
    
    showSpinnerSend();
    let status = await EnviarMemo({
      id_p: data.id_person,
      emailS: dataEmail.emailS,
      emailC: dataEmail.emailC,
      subject: saveMemo.subject,
      memo: saveMemo.memo,
    });
    if (status === 200) {
      showMemoGenerate();
      MessageSendMemo()
    }
    
  };
  return (
    <>
      <div className="email-card">
        <div className="email-header">
          <h2>Envio de Email</h2>
        </div>
        <div className="form-email">
          <form className="form-send-email" onSubmit={handleSubmit(handleSubmitEmail)}>
            <div className="email-content">
              <div className="area-email">
                <div className="subject-email">
                  <input
                    {...register("emailS", {
                      required: { value: true },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                      },
                    })}
                    style={{
                      outline: errors.emailS?.type ? "3px solid red" : "",
                    }}
                    type="text"
                    placeholder="Ingrese el Asunto"
                  />
                  {errors?.emailS?.type === "required" && (
                    <span>Este campo es requerido</span>
                  )}
                  {errors?.emailS?.type === "pattern" && (
                    <span>Solo caracteres alfabeticos</span>
                  )}
                </div>

                <textarea
                  {...register("emailC", {
                    required: { value: true },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                    },
                  })}
                  style={{
                    outline: errors.emailC?.type ? "3px solid red" : "",
                  }}
                  placeholder="Ingrese el Contenido"
                ></textarea>
                {errors?.emailC?.type === "required" && (
                  <span>Este campo es requerido</span>
                )}
                {errors?.emailC?.type === "pattern" && (
                  <span>
                    Solo se aceptan caracteres alfabeticos y algunos especiales
                    como , ; . @{" "}
                  </span>
                )}
              </div>
            </div>
            <div className="buttons">
              <button type="submit">
                {" "}
                <i className="fa-solid fa-paper-plane"></i> Enviar
              </button>
              <button type="button" onClick={backToGenerate}>
                {" "}
                <i className="fa-solid fa-trash"></i> Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
