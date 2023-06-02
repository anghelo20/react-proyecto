import React, { useState, useEffect } from "react";
import { Table, Empty } from "antd";
import "../../Style/tablaMemos.css";
import eliminarMemo from "../../Service/Memos/eliminarMemo";

function Tablamemos({ showModal, dataM, actualizarLista, data }) {
  const [newDataMemo, setNewDataMemo] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const eliminarItem = async (id, n_memo) => {
    await eliminarMemo({ id_m: id, numero: n_memo, id_p: data.id_person });
    actualizarLista(id);
  };

  useEffect(() => {
    let newArray = [];
    newArray = dataM.map((report, index) => {
      return { ...report, key: index };
    });
    setNewDataMemo(newArray);
  }, [dataM]);

  const columnsOfMemos = [
    {
      title: "Nº memo",
      dataIndex: "n_memo",
      key: "n_memo",
    },
    {
      title: "Remitente",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Razon",
      dataIndex: "razon",
      key: "razon",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Asunto",
      dataIndex: "asunto",
      key: "asunto",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Fecha",
      dataIndex: "fecha_RegistroM",
      key: "fecha_RegistroM",
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <>
          <i
            data-id={record.id}
            onClick={showModal}
            className="fa-solid fa-pen-to-square open"
          ></i>
          <i
            onClick={() => {
              console.log(record);
              eliminarItem(record.id,record.n_memo);
            }}
            className="fa-solid fa-trash"
          ></i>
        </>
      ),
    },
  ];

  return (
    <>
      {newDataMemo.length === 0 ? (
        <Empty
          className="empty"
          imageStyle={{
            height: 90,
            color: "#1890ff",
          }}
          description={<span>No se encontraron memos</span>}
        />
      ) : (
        <div className="table-memo">
          <Table
          bordered={true}
            columns={columnsOfMemos}
            dataSource={newDataMemo}
            pagination={{
              position: ["bottomCenter"],
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default Tablamemos;
