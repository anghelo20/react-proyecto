import React from "react";
import { useForm } from "react-hook-form";
import {message } from 'antd';
import "../../Style/buscar.css";
import Busqueda from "../../Service/Persona/Busqueda";

function Buscar({ ObtenerDatos }) {
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const success = () => {
    message.success({content:'PERSONA ENCONTRADA',
    className: 'message-succes-content',
    duration:2.5
    
  });
  };

  const errorMessage = () => {
    message.error({content:'PERSONA NO ENCONTRADA',
    className: 'message-error-content',
    duration:2.5
    
  });
  };

  const handleSearchSubmit = (data) => {
    console.log(data);
    Busqueda(data)
    .then((val) =>{
      ObtenerDatos(val)
      success()
      setValue("dni", ""
      )
    } )
    .catch((error) =>{
      console.log(error)
      errorMessage()
    });
  };
  return (
    <div className="form-card">
      <form
        onSubmit={handleSubmit(handleSearchSubmit)}
        className="form-content"
      >
        <div className="form-input">
          <label>Ingrese DNI</label>
          <input
            type="text"
            {...register("dni", {
              required: { value: true, message: "el campo es requerido" },
              pattern: {
                value: /^[0-9]{8}$/g,
                message: "El campo solo recibira 8 caracteres numericos",
              },
            })}
            
            style={{ outline: errors.dni?.message ? '3px solid #d93025' : '' }}
          />
        </div>
        <div className="form-button">
          <button type="submit" className="button-submit">
            <i className="fa-solid fa-magnifying-glass"></i>Buscar
          </button>
        </div>
      </form>
      {errors.dni && <span className="span-tool">{errors.dni.message}</span>}
    </div>
  );
}

export default Buscar;
