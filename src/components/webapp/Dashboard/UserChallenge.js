import React, { useContext } from "react";
import { Card, Button, Flex, Table, Typography } from "antd";
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
      title: "Nombre",
      width: 100,
      render: (state) => (
        <Flex vertical align="top">
          <strong>{state.activity.name}</strong>
          <Paragraph>{state.activity.description}</Paragraph>
        </Flex>
      ),
    },
    {
      width: 100,
      title: "Categoría",
      render: (state) => state.activity.category.name,
    },
    {
      title: "Inicia",
      width: 100,
      render: (state) => formatDate(state.start_date_time),
    },
    {
      title: "Finaliza",
      width: 100,
      render: (state) => formatDate(state.finish_date_time),
    },
    {
      width: 100,
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
          <OrderedListOutlined /> Tus pruebas ({challengers.length})
        </Flex>
      }
      extra={<Button type="primary">Ver más </Button>}
      hoverable
    >
      <Table
        size="small"
        dataSource={challengers}
        bordered={true}
        pagination={{ simple: true }}
        columns={columns}
      />
    </Card>
  );
};

export default UserChallenge;
