import React from "react";
import { DatePicker, ConfigProvider, Form, Select, Button } from "antd";
import { useState } from "react";
import moment from "moment";
import "moment/locale/es-us";
import es_ES from "antd/lib/locale/es_ES";
import ObtenerQuery from "../../Service/Estadistica/ObtenerQuery";

const { RangePicker } = DatePicker;
const { Option } = Select;
function Buscador({ setReport, setColumns, setSpinnerReport }) {
  const [dateType, setDateType] = useState(true);
  const [state, setStateActive] = useState(false);

  const [dataQuery, setDataQuery] = useState({
    type: "person",
    action: "1",
    dateD: moment().format("YYYY-MM-DD"),
    dateR: [],
    typeDate: "1",
  });

  const handleDatePickerChange = (date, dateString) => {
    console.log(date, dateString);

    setDataQuery({ ...dataQuery, dateD: dateString });
  };

  const handleDateRangeChange = (date, dateString) => {
    console.log(date, dateString);

    setDataQuery({ ...dataQuery, dateR: dateString });
  };

  const handleChangeSelect = (e) => {
    if (e.target.value === "1") {
      setDateType(true);
      setDataQuery({ ...dataQuery, typeDate: "1" });
    } else if (e.target.value === "2") {
      setDateType(false);
      setDataQuery({ ...dataQuery, typeDate: "2" });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sendQuery = (values) => {
    if (dateType) {
      const newvaluePicker = {
        ...values,
        dateD: values["dateD"].format("YYYY-MM-DD"),
        typeDate: "1",
      };
      console.log(newvaluePicker);
      setSpinnerReport("spinner");
      ObtenerQuery(newvaluePicker)
        .then((data) => {
          setReport(data);
          setSpinnerReport("table");
        })
        .then(() => {
          setColumns(newvaluePicker.type);
        });
    } else {
      const rangeValue = values["dateR"];
      const newvalueRange = {
        ...values,
        dateR: [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD"),
        ],
        typeDate: "2",
      };
      console.log(newvalueRange);
      setSpinnerReport("spinner");
      ObtenerQuery(newvalueRange)
        .then((data) => {
          setReport(data);
          setSpinnerReport("table");
        })
        .then(() => {
          setColumns(newvalueRange.type);
        });
    }
    /*
    setSpinnerReport('spinner')
    ObtenerQuery({
      type: dataQuery.type,
      action: dataQuery.action,
      dateD: dataQuery.dateD,
      dateR: dataQuery.dateR,
      typeDate: dataQuery.typeDate,
      prevState: dataState.prevState,
      currentState: dataState.currentState,
    })
    .then((data)=>{
      setReport(data)
      setSpinnerReport('table')
    })
    .then(()=>{
      setColumns(dataQuery.type)
    });
    */
  };

  const handleStateChange = (e) => {
    if (e === "4") {
      setStateActive(true);
    } else {
      setStateActive(false);
    }
  };

  return (
    <>
      <Form
        className="form-filter"
        action=""
        onFinish={sendQuery}
        onFinishFailed={onFinishFailed}
      >
        <div className="filter-sub">
          <div className="filter-sub-select">
            <div className="select-content">
              <label>Tipo</label>
              <Form.Item
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Seleccione el tipo",
                  },
                ]}
              >
                <Select placeholder="Seleccione">
                  <Option value="person">Persona</Option>
                  <Option value="memo">Memo</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="select-content">
              <label>Accion</label>
              <Form.Item
                name="action"
                rules={[
                  {
                    required: true,
                    message: "Seleccione la accion",
                  },
                ]}
              >
                <Select placeholder="Seleccione" onChange={handleStateChange}>
                  <Option value="1">Crear</Option>
                  <Option value="2">Buscar</Option>
                  <Option value="3">Editar</Option>
                  <Option value="4">Eliminar</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="select-content">
              <label>Estado</label>
              <Form.Item
                name="currentState"
                rules={[
                  {
                    required: true,
                    message: "Seleccione el estado",
                  },
                ]}
              >
                <Select placeholder="Seleccione" disabled={state}>
                  <Option value="2">Todos</Option>
                  <Option value="1">Activo</Option>
                  <Option value="0">Inactivo</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="filter-date">
            <div className="select-date">
              <label>Tipo Fecha</label>
              <select
                onChange={handleChangeSelect}
                className="select-data"
                placeholder="Seleccione"
              >
                <option value="1">Determinada</option>
                <option value="2">Rango</option>
              </select>
              <div className="inputs-dates">
                <ConfigProvider locale={es_ES}>
                  {dateType ? (
                    <Form.Item
                      name="dateD"
                      rules={[
                        {
                          required: true,
                          message: "Establesca la fecha",
                        },
                      ]}
                    >
                      <DatePicker
                        name="dateD"
                        onChange={(date, dateString) =>
                          handleDatePickerChange(date, dateString)
                        }
                        className="datepicker"
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name="dateR"
                      rules={[
                        {
                          type: "array",
                          required: true,
                          message: "Establesca las fechas",
                        },
                      ]}
                    >
                      <RangePicker
                        name="dateR"
                        onChange={(date, dateString) =>
                          handleDateRangeChange(date, dateString)
                        }
                        placeholder={["Fecha Inicial", "Fecha Final"]}
                      />
                    </Form.Item>
                  )}
                </ConfigProvider>
              </div>
            </div>
            <div className="filter-sub-select btn">
              <div className="select-content btn">
                <Form.Item label=" " colon={false} className="filter-type">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="search-btn"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i> buscar
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Buscador;
