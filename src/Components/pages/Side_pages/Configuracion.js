import React from "react";
import "../../../Style/configuracion.css";
import globaStates from "../../../Hooks/globaStates";
import { Collapse,Checkbox,InputNumber,Space } from "antd";

const { Panel } = Collapse;


export default function Configuracion() {
  const onChange = (key) => {
    console.log(key);
  };

  const onChangeCheck = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChangeNumber = (value) => {
    console.log('changed', value);
  };

  const {stateNotificacion,memosLimite} = globaStates()

  return (
    <div className="config-collapse">
      <div className="title-config">
        <i className="fa-solid fa-screwdriver-wrench"></i>
        <span>Configuracion</span>
      </div>
      <div className="config-content">
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="Notificaciones" key="1">
          <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
          >
          <Checkbox checked={stateNotificacion} onChange={onChangeCheck}>Permitir notificaciones</Checkbox>
          <div>
            <span>Numero maximo de memos </span>
          <InputNumber min={1} max={10} defaultValue={memosLimite} onChange={onChangeNumber} />
          </div>
          </Space>
          </Panel>
          <Panel header="Ediccion Persona" key="2">
          <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
          >
          <Checkbox onChange={onChangeCheck}>Permitir edicion</Checkbox>
          <div>
            <span>Dias pasados</span>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onChangeNumber} />
          </div>
          </Space>
          </Panel>
          <Panel header="Edicion Memo" key="3">
          <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
          >
          <Checkbox onChange={onChangeCheck}>Permitir eliminacion</Checkbox>
          <div>
            <span>Dias pasados </span>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onChangeNumber} />
          </div>
          </Space>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
