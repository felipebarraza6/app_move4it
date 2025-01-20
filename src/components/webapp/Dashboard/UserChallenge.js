import React, { useState, useEffect } from "react";
import { Card, Button, Flex, Table, Tag, Spin, Statistic } from "antd";
import { useLocation } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { OrderedListOutlined, CloudUploadOutlined } from "@ant-design/icons";

const UserChallenge = ({ challengers, pagination }) => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [currentInterval, setCurrentInterval] = useState(0);

  const disabledActionButton = (finish_date_time, state) => {
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
      hidden: location.pathname === "/profile_competition",
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

  const dataSource = () => {
    if (location.pathname === "/profile_competition") {
      setData(challengers[0].data.user.activities);
      return challengers[0].data.user.activities;
    } else {
      setData(challengers.user);
      return challengers.user;
    }
  };

  const extra = () => {
    const nextInterval = () => {
      setData(challengers[currentInterval + 1].data.user.activities);
      setCurrentInterval((prevInterval) => prevInterval + 1);
    };

    const previousInterval = () => {
      setData(challengers[currentInterval - 1].data.user.activities);
      setCurrentInterval((prevInterval) => prevInterval - 1);
    };

    if (location.pathname === "/profile_competition") {
      return (
        <Flex gap="small" align="center">
          <Button
            icon={<ArrowLeftOutlined />}
            shape="circle"
            type={"primary"}
            size="small"
            onClick={previousInterval}
            disabled={currentInterval === 0}
          />
          {challengers[currentInterval].start_date} /{" "}
          {challengers[currentInterval].end_date}
          <Button
            icon={<ArrowRightOutlined />}
            shape="circle"
            size="small"
            type="primary"
            onClick={nextInterval}
            disabled={currentInterval === challengers.length - 1}
          />
        </Flex>
      );
    } else {
      return `${challengers.start_date} / ${challengers.end_date}`;
    }
  };

  useEffect(() => {
    dataSource();
    setCurrentInterval(0);
  }, [challengers]);

  const totalPoints = () => {
    const process = data
      .filter((state) => state.is_completed)
      .reduce((acc, state) => acc + state.activity.points, 0);
    const participants = challengers[currentInterval].data.my_team.activities;
    const uniqueUsers = [
      ...new Set(participants.map((activity) => activity.user.id)),
    ];
    const numParticipants = uniqueUsers.length;
    const divide = parseInt(process / numParticipants);
    var value = 0;
    if (divide > 0) {
      value = divide;
    }
    return value;
  };

  return (
    <Card
      title={
        <Flex gap="small">
          <OrderedListOutlined />{" "}
          {location.pathname === "/profile_competition"
            ? "Tus pruebas en competencía"
            : "Tus pruebas"}
        </Flex>
      }
      extra={extra()}
      style={{
        ...styles.table,
      }}
    >
      <Flex gap="large" vertical justify="space-between">
        {location.pathname === "/profile_competition" && (
          <Card size="small">
            <Flex gap="small" justify="space-between">
              <Statistic value={data.length} title="Pruebas en intervalo" />
              <Statistic
                value={data.filter((state) => state.is_completed).length}
                title="Pruebas completadas"
              />
              <Statistic
                value={data.filter((state) => state.is_load).length}
                title="Pruebas realizadas"
              />
              <Statistic
                value={data.filter((state) => !state.is_load).length}
                title="Pruebas no realizadas"
              />

              <Statistic title={"Puntos obtenidos"} value={totalPoints()} />
            </Flex>
          </Card>
        )}

        <Flex vertical>
          <Table
            size="small"
            dataSource={data}
            bordered={true}
            pagination={false}
            columns={columns}
          />
        </Flex>
      </Flex>
    </Card>
  );
};
const styles = {
  table: {
    width: "100%",
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
  },
};

export default UserChallenge;
