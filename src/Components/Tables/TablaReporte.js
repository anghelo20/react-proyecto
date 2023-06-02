import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Empty, Tag } from "antd";

function TablaReporte({
  dataReport,
  dataColumns,
  setNewReportPdf,
  sendDataReportPdf,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [newDataReport, setNewReport] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    let newArray = [];
    newArray = dataReport.map((report, index) => {
      return { ...report, key: index };
    });
    setNewReport(newArray);
  }, [dataReport]);

  console.log(searchText, searchedColumn);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
          fontSize: "1rem",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columnsPerson = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",

      ...getColumnSearchProps("nombre"),
    },
    {
      title: "Apellido Materno",
      dataIndex: "apellido_M",
      key: "apellido_M",

      ...getColumnSearchProps("apellido_M"),
    },
    {
      title: "Apellido Paterno",
      dataIndex: "apellido_P",
      key: "apellido_P",

      ...getColumnSearchProps("apellido_P"),
    },
    {
      title: "Correo Electronico",
      dataIndex: "correo",
      key: "correo",

      ...getColumnSearchProps("correo"),
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",

      ...getColumnSearchProps("dni"),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) =>
        estado === 1 ? (
          <Tag color="green">Activo</Tag>
        ) : (
          <Tag color="red">Inactivo</Tag>
        ),
      filters: [
        {
          text: "Activo",
          value: 1,
        },
        {
          text: "Inactivo",
          value: 0,
        },
      ],
      onFilter: (value, record) =>
        record.estado.toString().indexOf(value) === 0,
    },
    {
      title: "Fecha",
      dataIndex: "fecha_Accion",
      key: "fecha_Accion",
      sorter: (a, b) => new Date(a.fecha_Accion) - new Date(b.fecha_Accion),
      sortDirections: ["descend", "ascend"],
    },
  ];

  const columnsMemos = [
    {
      title: "Nº memo",
      dataIndex: "n_memo",
      key: "n_memo",

      ...getColumnSearchProps("n_memo"),
    },
    {
      title: "Correo Electronico",
      dataIndex: "correo",
      key: "correo",

      ...getColumnSearchProps("correo"),
    },
    {
      title: "Dni",
      dataIndex: "dni",
      key: "dni",

      ...getColumnSearchProps("dni"),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) =>
        estado === 1 ? (
          <Tag color="green">Activo</Tag>
        ) : (
          <Tag color="red">Inactivo</Tag>
        ),
      filters: [
        {
          text: "Activo",
          value: 1,
        },
        {
          text: "Inactivo",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Fecha",
      dataIndex: "fecha_Accion",
      key: "fecha_Accion",
      sorter: (a, b) => new Date(a.fecha_Accion) - new Date(b.fecha_Accion),
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <>
      {newDataReport.length === 0 ? (
        <Empty
          className="empty"
          imageStyle={{
            height: 90,
            color: "#1890ff",
          }}
          description={<span>No se encontraron datos</span>}
        />
      ) : (
        <>
          <Table
            className="table-report"
            columns={dataColumns === "person" ? columnsPerson : columnsMemos}
            dataSource={newDataReport}
            bordered={true}
            locale={{
              triggerDesc: "Ordenamiento Descendente",
              triggerAsc: "Odenamiento Ascendente",
              cancelSort: "Cancelar Ordenamiento",
              filterReset: <span>Restaurar</span>,
            }}
            pagination={{
              position: ["bottomCenter"],
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
            onChange={(pagination, filters, sorter, extra) => {
              console.log(extra.currentDataSource);
              setNewReportPdf(extra.currentDataSource);
            }}
          />
          <button className="btn-send" onClick={sendDataReportPdf}>
            <i className="fa-solid fa-file-arrow-down"></i> Descargar PDF
          </button>
        </>
      )}
    </>
  );
}

export default TablaReporte;
