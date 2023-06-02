import React from "react";
import { useForm } from "react-hook-form";
import {message } from 'antd';
import Create from "../../Service/Persona/Creacion";
import "../../Style/crear.css";

function Crear() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const successCreate = () => {
    message.success({content:'Persona creada correctamente',
    className: 'message-succes-content',
    duration:2.5
    
  });
  };

  const messageCustom = (text) => {
    message.error({content:text,
    className: 'message-error-content',
    duration:2.5
    
  });
  };

  const handleCreateSumbit = async (dataPerson) => {
    let regi = await Create(dataPerson);
    if (regi !== "OK") {
      messageCustom(regi)
    }else{
      successCreate()
      if (dataPerson) {
        Object.entries(dataPerson).forEach(
          ([name, value]) => setValue(name, ''));
      }
    }
    
  };

  return (
    <div className="form-create">
      <form
        onSubmit={handleSubmit(handleCreateSumbit)}
        className="form-create-contents"
      >
        <div className="form-create-content">
          <div className="form-input">
            <label>Ingrese Nombre</label>
            <input
              {...register("nombre", {
                required: { value: true },
                minLength: 2,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                },
              })}
              style={{ outline: errors.nombre?.type ? '3px solid #d93025' : '' }}
              className="search-input"
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
          <div className="form-input">
            <label>Ingrese Apellido Paterno</label>
            <input
              {...register("apellido_P", {
                required: { value: true,  },
                minLength: 2,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  
                },
              })}
              style={{ outline: errors.apellido_P?.type ? '3px solid #d93025' : '' }}
              className="search-input"
              type="text"
            />
            {errors?.apellido_P?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.apellido_P?.type === "maxLength" && (
              <span>El apellido no puede exceder los 20 caracteres</span>
            )}
            {errors?.apellido_P?.type === "minLength" && (
              <span>El apellido no puede ser menor a 2 caracteres</span>
            )}
            {errors?.apellido_P?.type === "pattern" && (
              <span>Solo caracteres alfabeticos</span>
            )}
          </div>
        </div>
        <div className="form-create-content">
          <div className="form-input">
            <label>Ingrese Apellido Materno</label>
            <input
              {...register("apellido_M", {
                required: { value: true,  },
                minLength: 2,
                maxLength: 20,
                pattern: {
                  value: /^[A-Za-z]+$/i,
                },
              })}
              style={{ outline: errors.apellido_M?.type ? '3px solid #d93025' : '' }}
              className="search-input"
              type="text"
            />
            {errors?.apellido_M?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.apellido_M?.type === "maxLength" && (
              <span>El apellido no puede exceder los 20 caracteres</span>
            )}
            {errors?.apellido_M?.type === "minLength" && (
              <span>El apellido no puede ser menor a 2 caracteres</span>
            )}
            {errors?.apellido_M?.type === "pattern" && (
              <span>Solo caracteres alfabeticos</span>
            )}
          </div>
          <div className="form-input">
            <label>Ingrese DNI</label>
            <input
              {...register("dni", {
                required: { value: true },
                pattern: {
                  value: /^[0-9]{8}$/g
                  
                },
              })}
              style={{ outline: errors.dni?.type ? '3px solid #d93025' : '' }}
              className="search-input"
              type="text"
            />
            {errors?.dni?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.dni?.type === "pattern" && (
              <span>El campo solo recibira 8 caracteres numericos</span>
            )}
          </div>
        </div>
        <div className="form-create-content">
          <div className="form-input email">
            <label>Ingrese Correo Electronico</label>
            <input
              {...register("correo", {
                required: { value: true},
                pattern: {
                  value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                },
              })}
              style={{ outline: errors.correo?.type ? '3px solid #d93025' : '' }}
              className="search-input"
              type="email"
            />
            {errors?.correo?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.correo?.type === "pattern" && (
              <span>El correo no respeta el formato</span>
            )}
          </div>
          <div className="form-input">
            <button type="submit">
              <i className="fa-solid fa-circle-plus"></i>Crear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Crear;
