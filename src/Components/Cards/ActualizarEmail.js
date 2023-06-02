import React from "react";
import { useForm } from "react-hook-form";
import actualalizarEnvio from "../../Service/Memos/actualizarEnvioMemo";
import eliminarPdf from "../../Service/Pdf/EliminarPdf";
import "../../Style/actualizarEmail.css";

export default function ActualizarEmail({
  dataNewMemo,
  closeModal,
  setShowSpinner,
  actuazlizacionMemos,
}) {
  


  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  

  const sendNewEmail = async (newEmailData) => {
    console.log(newEmailData)
    
    setShowSpinner();

    let status = await actualalizarEnvio({
      id_p: dataNewMemo.id_p,
      id_m: dataNewMemo.id_m,
      emailS: newEmailData.newemailS,
      emailC: newEmailData.newemailC,
      subject: dataNewMemo.subject,
      memo: dataNewMemo.memo,
      numero: dataNewMemo.numeroCorrelativo,
    });

    if (status === 200) {
      actuazlizacionMemos(
        dataNewMemo.id_m,
        dataNewMemo.subject,
        dataNewMemo.memo
      );
      closeModal();
    }
    
  };

  const cancelarActualizacion = () => {
    closeModal();
    eliminarPdf();
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendNewEmail)}>
        <div className="modal-content">
          <div className="update-email-card">
            <div className="update-email-header">
              <h2>Envio de Email</h2>
            </div>
            <div className="update-email-content">
              <div className="area-update-email">
                <div className="subject-update-email">
                  <input
                    {...register("newemailS", {
                      required: { value: true },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                      },
                    })}
                    style={{
                      outline: errors.newemailS?.type ? "3px solid #d93025" : "",
                    }}
                    placeholder="Ingrese el Asunto"
                  />
                  {errors?.newemailS?.type === "required" && (
                    <span>Este campo es requerido</span>
                  )}
                  {errors?.newemailS?.type === "pattern" && (
                    <span>Solo se aceptan caracteres alfabeticos y algunos especiales
                    como , ; . @{" "}</span>
                  )}
                </div>

                <textarea
                  {...register("newemailC", {
                    required: { value: true },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                    },
                  })}
                  style={{
                    outline: errors.newemailC?.type ? "3px solid #d93025" : "",
                  }}
                  placeholder="Ingrese el Contenido"
                ></textarea>
                {errors?.newemailC?.type === "required" && (
                  <span>Este campo es requerido</span>
                )}
                {errors?.newemailC?.type === "pattern" && (
                  <span>
                    Solo se aceptan caracteres alfabeticos y algunos especiales
                    como , ; . @{" "}
                  </span>
                )}
              </div>
              <div className="buttons">
                <button>
                  {" "}
                  <i className="fa-solid fa-paper-plane"></i> Enviar
                </button>
                <button onClick={cancelarActualizacion}>
                  {" "}
                  <i className="fa-solid fa-circle-xmark"></i> Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
