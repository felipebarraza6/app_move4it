import React, { useContext } from "react";
import { Card, Button, Flex, Table, Typography, Tag } from "antd";
import { AppContext } from "../../../App";

import { OrderedListOutlined, CloudUploadOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

const UserChallenge = () => {
  const { state } = useContext(AppContext);

  const challengers = state.user.profile.total_activities_user;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const disabledActionButton = (finish_date_time) => {
    const currentDate = new Date();
    const finishDate = new Date(finish_date_time);
    return currentDate > finishDate;
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
        <Tag color="green-inverse"> {formatDate(state.start_date_time)}</Tag>
      ),
    },
    {
      title: "Finaliza",
      width: 100,

      align: "center",
      render: (state) => (
        <Tag color="geekblue-inverse">{formatDate(state.finish_date_time)}</Tag>
      ),
    },
    {
      title: "Estado",
      width: 100,
      render: (state) => {
        if (state.is_complete) {
          return "completado";
        } else if (!state.is_load) {
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
          disabled={disabledActionButton(state.finish_date_time)}
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
      extra={`${challengers.length} Pruebas asignadas`}
      hoverable
      style={styles.table}
    >
      <Table
        size="small"
        dataSource={challengers}
        bordered={true}
        pagination={{ simple: true, pageSize: 3 }}
        columns={columns}
      />
    </Card>
  );
};
const styles = {
  table: {
    marginBottom: "20px",
    border: "1px solid white",
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
  },
};

export default UserChallenge;
