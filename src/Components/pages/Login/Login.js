import React from "react";
import Verificacion from "../../../Service/Login/Verificacion";
import { useForm } from "react-hook-form";
import "../../../Style/login.css";
import logo from "../../../Image/logo.png";
import side from "../../../Image/side.jpg";

export default function Login() {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const envioDatos = (data) => {
    console.log(data);

    //Verificacion()
    window.location.href = "/dashboard/principal";
  };

  return (
    <div className="App">
      <div className="App-login">
        <div className="logo-content">
          <img alt="no hay imgaen" className="logo-left" src={side}></img>
        </div>
        <form className="App-form" onSubmit={handleSubmit(envioDatos)}>
          <h3 className="title-login">CORTE SUPERIOR DE JUSTICIA DEL SANTA </h3>
          <img alt="no hay imgaen" className="App-logo" src={logo}></img>
          <div className="cont-input">
            <div className="control-input">
              <i className="fa-solid fa-user"></i>
              <input
                {...register("usuario", {
                  required: { value: true },
                  minLength: 2,
                  maxLength: 20,
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                  },
                })}
                style={{
                  outline: errors.usuario?.type ? "3px solid #d93025" : "",
                }}
                type={"text"}
                placeholder="Ingrese usuario"
              ></input>
            </div>
            {errors?.usuario?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.usuario?.type === "maxLength" && (
              <span>El nombre no puede exceder los 20 caracteres</span>
            )}
            {errors?.usuario?.type === "minLength" && (
              <span>El nombre no puede ser menor a 2 caracteres</span>
            )}
            {errors?.usuario?.type === "pattern" && (
              <span>Solo caracteres alfabeticos</span>
            )}
          </div>
          <div className="cont-input">
            <div className="control-input">
              <i className="fa-solid fa-lock"></i>
              <input
                type={"password"}
                placeholder="Ingrese contraseña"
                {...register("contraseña", {
                  required: { value: true },
                  maxLength: 8,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                  },
                })}
                style={{
                  outline: errors.contraseña?.type ? "3px solid #d93025" : "",
                }}
              ></input>
            </div>
            {errors?.contraseña?.type === "required" && (
              <span>Este campo es requerido</span>
            )}
            {errors?.contraseña?.type === "maxLength" && (
              <span>La contraseña no puede exceder los 8 caracteres</span>
            )}
            {errors?.contraseña?.type === "pattern" && (
              <span>Mínimo ocho caracteres, al menos una letra y un número</span>
            )}
          </div>
          <button type="submit">
            <i className="fa-solid fa-right-to-bracket"></i>Iniciar
          </button>
        </form>
      </div>
    </div>
  );
}
