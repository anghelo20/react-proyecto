import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../Style/actualizarPersona.css";
import actualizarPersona from "../../Service/Persona/ActualizarPersona";

function Actualizar({ handleActive, data, actualizarPerson, setUpdatePerson }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      Object.entries(data).forEach(([name, value]) => setValue(name, value));
    }
  }, [setValue, data]);

  const submitData = async (dataUpdate) => {
    setUpdatePerson();
    let status = await actualizarPersona(dataUpdate);
    setUpdatePerson();

    if (status === 200) {
      setTimeout(() => {
        actualizarPerson(dataUpdate);
        handleActive();
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className="modal-content-person">
        <div className="update-card">
          <div className="header">
            <div className="update-person-header">
              <h2>Actualizar Persona</h2>
            </div>
            <i
              onClick={handleActive}
              className="fa-solid fa-circle-xmark hide"
            ></i>
          </div>
          <div className="content">
            <div className="update-input">
              <label htmlFor="">Nombre</label>
              <input
                {...register("nombre", {
                  required: { value: true },
                  minLength: 2,
                  maxLength: 20,
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                  },
                })}
                style={{ outline: errors.nombre?.type ? "3px solid #d93025" : "" }}
                type="text"
              />
              {errors?.nombre?.type === "required" && (
                <span>Este campo es requerido</span>
              )}
              {errors?.nombre?.type === "maxLength" && (
                <span>El nombre no puede exceder los 20 caracteres</span>
              )}
              {errors?.nombre?.type === "minLength" && (
                <span>El nombre no puede ser menor a 2 caracteres</span>
              )}
              {errors?.nombre?.type === "pattern" && (
                <span>Solo caracteres alfabeticos</span>
              )}
            </div>
            <div className="update-input">
              <label htmlFor="">Apellido Paterno</label>
              <input
                {...register("apellido_P", {
                  required: { value: true },
                  minLength: 2,
                  maxLength: 20,
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                  },
                })}
                style={{
                  outline: errors.apellido_P?.type ? "3px solid #d93025" : "",
                }}
                type="text"
              />
              {errors?.apellido_P?.type === "required" && (
                <span>Este campo es requerido</span>
              )}
              {errors?.apellido_P?.type === "maxLength" && (
                <span>El nombre no puede exceder los 20 caracteres</span>
              )}
              {errors?.apellido_P?.type === "minLength" && (
                <span>El nombre no puede ser menor a 2 caracteres</span>
              )}
              {errors?.apellido_P?.type === "pattern" && (
                <span>Solo caracteres alfabeticos</span>
              )}
            </div>
          </div>
          <div className="content">
            <div className="update-input">
              <label htmlFor="">Apellido Materno</label>
              <input
                {...register("apellido_M", {
                  required: { value: true },
                  minLength: 2,
                  maxLength: 20,
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                  },
                })}
                style={{
                  outline: errors.apellido_M?.type ? "3px solid #d93025" : "",
                }}
                type="text"
              />
              {errors?.apellido_M?.type === "required" && (
                <span>Este campo es requerido</span>
              )}
              {errors?.apellido_M?.type === "maxLength" && (
                <span>El nombre no puede exceder los 20 caracteres</span>
              )}
              {errors?.apellido_M?.type === "minLength" && (
                <span>El nombre no puede ser menor a 2 caracteres</span>
              )}
              {errors?.apellido_M?.type === "pattern" && (
                <span>Solo caracteres alfabeticos</span>
              )}
            </div>
            <div className="update-input">
              <label htmlFor="">DNI</label>
              <input
                {...register("dni", {
                  required: { value: true },
                  pattern: {
                    value: /^[0-9]{8}$/g,
                  },
                })}
                style={{ outline: errors.dni?.type ? "3px solid #d93025" : "" }}
                type="text"
              />
              {errors?.dni?.type === "required" && (
                <span>Este campo es requerido</span>
              )}
              {errors?.dni?.type === "pattern" && (
                <span>Se deben ingresar 8 caracteres numericos</span>
              )}
            </div>
          </div>
          <div className="content">
            <div className="update-input email">
              <label htmlFor="">Correo</label>
              <input
                {...register("correo", {
                  required: { value: true },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  },
                })}
                style={{ outline: errors.correo?.type ? "3px solid #d93025" : "" }}
                type={"email"}
              />
              {errors?.correo?.type === "required" && (
                <span>Este campo es requerido</span>
              )}
              {errors?.correo?.type === "pattern" && (
                <span>El correo no respeta el formato</span>
              )}
            </div>
          </div>
          <div className="content">
            <button>
              <i className="fa-solid fa-pen-to-square"></i> Actualizar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Actualizar;
