import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Flex,
  Table,
  Tag,
  Spin,
  Statistic,
  Badge,
  Descriptions,
} from "antd";
import { useLocation } from "react-router-dom";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";

import {
  OrderedListOutlined,
  CloudUploadOutlined,
  CalendarFilled,
} from "@ant-design/icons";

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
        <Flex
          gap="small"
          align="end"
          style={{
            marginTop: "5px",
            marginBottom: "10px",
            padding: "5px",
            borderRadius: "15px",
          }}
        >
          <Button
            shape="round"
            type="primary"
            onClick={nextInterval}
            disabled={currentInterval >= challengers.length - 1}
          >
            <ArrowLeftOutlined />
            <div style={{ fontSize: "10px", marginLeft: "5px" }}>
              {currentInterval < challengers.length - 1 ? (
                <>
                  <CalendarOutlined />{" "}
                  {new Date(
                    new Date(
                      challengers[currentInterval + 1].start_date
                    ).setDate(
                      new Date(
                        challengers[currentInterval + 1].start_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}
                  <br />
                  <CalendarFilled />{" "}
                  {new Date(
                    new Date(challengers[currentInterval + 1].end_date).setDate(
                      new Date(
                        challengers[currentInterval + 1].end_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}
                </>
              ) : (
                <>
                  dd-m
                  <br />
                  dd-m
                </>
              )}
            </div>
          </Button>
          <div
            size="small"
            style={{
              fontSize: "12px",
            }}
          >
            <center>
              <CalendarOutlined style={{ textAlign: "center" }} />
            </center>
            {new Date(
              new Date(challengers[currentInterval].start_date).setDate(
                new Date(challengers[currentInterval].start_date).getDate() + 1
              )
            ).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            })}
            <br />
            {new Date(
              new Date(challengers[currentInterval].end_date).setDate(
                new Date(challengers[currentInterval].end_date).getDate() + 1
              )
            ).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            })}
          </div>
          <Button
            shape="round"
            type={"primary"}
            onClick={previousInterval}
            disabled={currentInterval === 0}
          >
            <div style={{ fontSize: "10px", marginRight: "5px" }}>
              {currentInterval > 0 ? (
                <>
                  {new Date(
                    new Date(
                      challengers[currentInterval - 1].start_date
                    ).setDate(
                      new Date(
                        challengers[currentInterval - 1].start_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}{" "}
                  <CalendarOutlined />
                  <br />
                  {new Date(
                    new Date(challengers[currentInterval - 1].end_date).setDate(
                      new Date(
                        challengers[currentInterval - 1].end_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}{" "}
                  <CalendarFilled />
                </>
              ) : (
                <>
                  dd-m
                  <br />
                  dd-m
                </>
              )}
            </div>
            <ArrowRightOutlined />
          </Button>
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
        <Flex gap="small" align="center" justify="space-between">
          <Flex gap="small">
            <OrderedListOutlined />{" "}
            {location.pathname === "/profile_competition"
              ? "Tus pruebas en competencía"
              : "Tus pruebas"}
          </Flex>
          <Flex>{extra()}</Flex>
        </Flex>
      }
      style={{
        ...styles.table,
      }}
    >
      <Flex gap="large" vertical justify="space-between">
        {location.pathname === "/profile_competition" && (
          <Flex gap="small" justify="space-between">
            <Card size="small" hoverable style={{ width: "100%" }}>
              <Statistic
                value={data.length}
                title="Total"
                valueStyle={{ textAlign: "center" }}
              />
            </Card>
            <Card size="small" hoverable style={{ width: "100%" }}>
              <Statistic
                value={data.filter((state) => state.is_completed).length}
                title="Completadas"
                valueStyle={{ textAlign: "center" }}
              />
            </Card>

            <Card size="small" hoverable style={{ width: "100%" }}>
              <Statistic
                value={data.filter((state) => !state.is_completed).length}
                title="No completadas"
                valueStyle={{ textAlign: "center" }}
              />
            </Card>
            <Card size="small" hoverable style={{ width: "100%" }}>
              <Statistic
                title={"Puntos"}
                value={totalPoints()}
                valueStyle={{ textAlign: "center" }}
              />
            </Card>
          </Flex>
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
