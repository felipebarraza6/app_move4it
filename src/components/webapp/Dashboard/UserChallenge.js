import React from "react";
import { Card, Button, Flex, Table, Tag, Spin } from "antd";

import { OrderedListOutlined, CloudUploadOutlined } from "@ant-design/icons";

const UserChallenge = ({ challengers, pagination }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const disabledActionButton = (finish_date_time, state) => {
    console.log(state.is_completed);
    const currentDate = new Date();
    const finishDate = new Date(finish_date_time);
    return currentDate > finishDate || state.is_completed || state.is_load;
  };

  const columns = [
    {
      title: "Actividad",
      width: 100,
      render: (state) => (
        <Flex vertical align="top">
          <strong>{state.activity.name}</strong>
        </Flex>
      ),
    },
    {
      width: 100,
      title: "Categoría",
      render: (state) => <Tag color="blue">{state.activity.category.name}</Tag>,
    },
    {
      title: "Inicia",
      width: 100,
      align: "center",
      render: (state) => (
        <Tag color="green-inverse"> {state.interval.start_date}</Tag>
      ),
    },
    {
      title: "Finaliza",
      width: 100,
      align: "center",
      render: (state) => (
        <Tag color="geekblue-inverse">{state.interval.end_date}</Tag>
      ),
    },
    {
      title: "Estado",
      width: 100,
      render: (state) => {
        if (state.is_completed) {
          return "completado";
        } else if (state.is_load) {
          return (
            <>
              realizado... <Spin size="small" />
            </>
          );
        } else {
          return "sin realizar";
        }
      },
    },
    {
      width: 100,
      align: "center",
      render: (state) => (
        <Button
          shape="round"
          type="primary"
          icon={<CloudUploadOutlined />}
          disabled={disabledActionButton(state.finish_date_time, state)}
        >
          Realizar
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Flex gap="small">
          <OrderedListOutlined /> Tus pruebas{" "}
        </Flex>
      }
      extra={`${challengers.start_date} / ${challengers.end_date}`}
      style={styles.table}
    >
      <Table
        size="small"
        dataSource={challengers.user}
        bordered={true}
        pagination={pagination ? { simple: true, pageSize: 10 } : false}
        columns={columns}
      />
    </Card>
  );
};
const styles = {
  table: {
    marginBottom: "20px",
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
  },
};

export default UserChallenge;
