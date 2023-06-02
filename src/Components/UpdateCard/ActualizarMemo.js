import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../Style/actualizarMemo.css";
import actualizarMemo from "../../Service/Memos/actualizarMemo";

function ActualizarMemo({ memo, closeModal, data, updateData }) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });


  useEffect(() => {
    if (memo) {
      console.log(memo);
      Object.entries(memo).forEach(([name, value]) => setValue(name, value));
    }
  }, [setValue, memo]);

  const handleSubmitNewMemo = (dataNewMemo) => {
    console.log(dataNewMemo);
    actualizarMemo({
      id_p: data.id_person,
      id_m: memo.id,
      subject: dataNewMemo.asunto,
      memo: dataNewMemo.razon,
    }).then(updateData(dataNewMemo.asunto, dataNewMemo.razon));
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitNewMemo)}>
      <div className="modal-content-memo">
        <div className="card-update-memo">
          <div className="update-memo-header">
            <h2>Actualizar Memo</h2>
          </div>
          <div className="card-update-content">
            <div className="card-input">
              <input
                {...register("asunto", {
                  required: { value: true },
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                  },
                })}
                style={{ outline: errors.asunto?.type ? "3px solid #d93025" : "" }}
                placeholder = "Ingrese el nuevo asunto"
                type="text"
              />
              {errors?.asunto?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.asunto?.type === "pattern" && (
              <span>Solo caracteres alfabeticos y algunos caracteres y algunos especiales como , ; .</span>
            )}
            </div>
            <textarea
              {...register("razon", {
                required: { value: true },
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\u00f1\u00d1_@/#&+-.,;s:\s]+$/i,
                },
              })}
              style={{ outline: errors.razon?.type ? '3px solid #d93025' : '' }}
              placeholder="Ingrese el nuevo contenido"
            ></textarea>
            {errors?.razon?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.razon?.type === "pattern" && (
              <span>Solo se aceptan caracteres alfabeticos y algunos especiales como , ; . @ </span>
            )}
          </div>
          <div className="card-update-buttons">
            <button type="submit">
              <i className="fa-solid fa-paper-plane"></i> Actualizar
            </button>
            <button onClick={closeModal}>
              <i className="fa-solid fa-circle-xmark"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ActualizarMemo;
