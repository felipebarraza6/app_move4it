import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Tag,
  Table,
  Descriptions,
} from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  ClockCircleFilled,
  ArrowRightOutlined,
  UpCircleFilled,
  TeamOutlined,
  CheckCircleFilled,
  PlusCircleFilled,
  LeftOutlined,
  EuroCircleFilled,
  RightOutlined,
} from "@ant-design/icons";
import "react-circular-progressbar/dist/styles.css";
import Blog from "./Blog";
import { AppContext } from "../App";
import { all } from "axios";

const { Title, Paragraph, Text } = Typography;

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const [stats_personal, setStatsPersonal] = useState([]);
  const [challengersUser, setChallengersUser] = useState([]);
  const [typeMeditions, setTypeMeditions] = useState([]);

  const Ranking = () => {
    var myRanking =
      state.user.profile.groups
        .sort((a, b) => b.points - a.points)
        .findIndex((item) => item.id === state.user.team.id) + 1;

    return <span style={{ marginRight: "10px" }}>#{myRanking}</span>;
  };

  const filterActivities = (activities) => {
    return activities
      .filter((item) => item.activity) // Filtrar solo los elementos que tienen una propiedad 'activity'

      .map((item) => {
        return {
          name: item.activity.name,
          value_activity: parseFloat(item.activity.value) || 0,
          type_stats: item.activity.type_stats,
          value_team: item.value, // Agregar la propiedad 'value_team' con valor inicial 0
        };
      }); // Crear un nuevo array con solo 'activity.name', 'value', y 'value_team'
  };

  const filterActivitiesUser = (activities) => {
    const filteredActivities = activities.filter((item) => item.activity); // Filtrar solo los elementos que tienen una propiedad 'activity'

    const allTimeActivities = filteredActivities;

    const allTimeWeeks = {};
    allTimeActivities.forEach((item) => {
      const activityDate = new Date(item.start_date_time);
      const activityWeek = getWeekNumber(activityDate);
      if (!allTimeWeeks[activityWeek]) {
        allTimeWeeks[activityWeek] = {
          totalActivities: 0,
          totalCompletedActivities: 0,
          totalDuration: 0,
          totalCaloriesBurned: 0,
        };
      }
      allTimeWeeks[activityWeek].totalActivities++;
      if (item.is_completed) {
        allTimeWeeks[activityWeek].totalCompletedActivities++;
        allTimeWeeks[activityWeek].totalCaloriesBurned +=
          item.activity.calories_burned;
      }
      allTimeWeeks[activityWeek].totalDuration += item.duration;
    });

    const dataSource = Object.entries(allTimeWeeks).map(
      (
        [
          week,
          {
            totalActivities,
            totalCompletedActivities,
            totalDuration,
            totalCaloriesBurned,
          },
        ],
        index
      ) => ({
        week: `Week ${index + 1}`,
        totalActivities,
        totalCompletedActivities,
        totalDuration,
        totalCaloriesBurned,
      })
    );

    var type_meditions = state.user.profile.type_meditions;

    const dataSourceWithMeditions = dataSource.map((data) => {
      return {
        ...data,
      };
    });

    return dataSourceWithMeditions.reverse();
  };

  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  useEffect(() => {
    const filteredActivities = filterActivities(
      state.user.profile.total_activities_group
    );

    const filteredActivitiesUser = filterActivitiesUser(
      state.user.profile.total_activities_user
    );

    dispatch({
      type: "SET_ACTIVITIES",
      payload: filteredActivities,
    });
    dispatch({
      type: "SET_STATS_USER",
      payload: filteredActivitiesUser,
    });
    setStatsPersonal(filteredActivitiesUser);
    setChallengersUser(state.user.profile.total_activities_user);
    setTypeMeditions(state.user.profile.type_meditions);
  }, []);

  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col>
        <Card style={styles.card} hoverable>
          <Title
            level={1}
            style={{
              ...styles.title,
              marginBottom: "-40px",
              marginTop: "-5px",
            }}
          >
            Hola, {state.user.first_name} {state.user.last_name}
          </Title>{" "}
          <br />
          <Title level={4} style={styles.title}>
            Bienvenido a Move4it
          </Title>
        </Card>
      </Col>

      <Col>
        <Card style={styles.cardC} hoverable>
          <Title
            level={3}
            style={{
              ...styles.title,
              marginTop: "-10px",
              marginBottom: "-10px",
            }}
          >
            @ {state.user.username}
          </Title>
          <br />
          <Button type="primary" size="large">
            {state.user.points} pts.
          </Button>
        </Card>
      </Col>
      <Col span={24}>
        <Row
          align="middle"
          justify={"space-between"}
          style={{ marginTop: "30px" }}
        >
          <Col>
            <Title level={2}>Resumen competencia</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              style={{ marginBottom: window.innerWidth < 900 && "20px" }}
              onClick={() => window.location.assign("/enterprise")}
            >
              Ver mas
            </Button>
          </Col>
        </Row>
      </Col>

      <Col xl={8} xs={24}>
        <Card style={{ width: "300px", ...styles.card }} hoverable>
          <Row align={"middle"} justify={"space-evenly"}>
            <Col>
              <Tag color="geekblue-inverse">
                {state.user.team.enterprise.name}
              </Tag>
            </Col>

            <Col>
              <Title
                level={2}
                style={{
                  ...styles.title,
                  marginBottom: "-5px",
                  marginTop: "-5px",
                }}
              >
                <TeamOutlined style={{ marginRight: "5px" }} />
                {state.user.team.name}
              </Title>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={8} xl={8} xs={24}>
        <Card style={{ width: "260px", ...styles.card }} hoverable>
          <Title
            level={2}
            style={{
              ...styles.title,
              marginBottom: "-30px",
              marginTop: "-5px",
            }}
          >
            <UpCircleFilled style={{ marginRight: "10px" }} />
            {(
              state.user.team.participants.reduce(
                (total, user) => total + user.points,
                0
              ) / state.user.team.participants.length
            ).toFixed(0)}
          </Title>{" "}
          <br />
        </Card>
      </Col>
      <Col span={8} xl={8} xs={24}>
        <Card
          style={{ width: "260px", ...styles.card, padding: "0px" }}
          hoverable
        >
          <Row align={"middle"} justify={"center"}>
            <Col style={{ marginBottom: "10px" }}>
              <Tag color="green-inverse" style={{ marginLeft: "0px" }}>
                # RANKING
              </Tag>
            </Col>
            <Col>
              <Title
                level={2}
                style={{
                  ...styles.title,
                  marginBottom: "-30px",
                  marginTop: "-5px",
                }}
              >
                <Ranking />/{" "}
                <span style={{ fontSize: "22px" }}>
                  {" "}
                  {state.user.profile.groups.length} Equipos{" "}
                </span>
              </Title>
            </Col>
          </Row>
          <br />
        </Card>
      </Col>
      <Col span={24} style={{ marginTop: "20px" }}>
        <Row
          align="middle"
          justify={"space-between"}
          style={{ marginTop: "0px" }}
        >
          <Col>
            <Title level={2}>Pruebas</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => window.location.assign("/challenges")}
            >
              Ver mas
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={window.innerWidth > 900 ? "space-between" : "center"}>
          {challengersUser.map((item) => (
            <Col>
              <Card
                hoverable
                style={{ width: "250px", ...styles.card }}
                cover={
                  <img
                    alt="example"
                    src={`http://localhost:8000/${item.activity.image}`}
                  />
                }
              >
                <Card.Meta
                  title={
                    <Title level={4} style={{ color: "white" }}>
                      {item.activity.name}
                    </Title>
                  }
                  description={
                    <>
                      <Paragraph level={4} style={{ color: "white" }}>
                        {item.activity.description}
                      </Paragraph>
                      <Paragraph level={4} style={{ color: "white" }}>
                        <ClockCircleFilled style={{ marginRight: "10px" }} />{" "}
                        Inicio: {item.start_date_time.slice(0, 10)} <br />
                        <ClockCircleFilled
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Finalizar: {item.finish_date_time.slice(0, 10)}
                      </Paragraph>
                    </>
                  }
                />
                <Button
                  icon={<PlusCircleFilled />}
                  style={{
                    float: "right",
                    color:
                      new Date(item.finish_date_time) < new Date() && "grey",
                  }}
                  block
                  disabled={new Date(item.finish_date_time) < new Date()}
                >
                  Realizar
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24} style={{ marginTop: "20px" }}>
        <Row
          align="middle"
          justify={"space-between"}
          style={{ marginTop: "30px" }}
        >
          <Col>
            <Title level={2}>Desempeño grupal</Title>
          </Col>

          <Col>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              style={{ marginBottom: window.innerWidth < 900 && "20px" }}
              onClick={() => window.location.assign("/team")}
            >
              Ver mas
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {state.dashboard && (
          <Row style={{ marginBottom: "20px" }} justify={"space-around"}>
            {state.dashboard.activities.map((item) => (
              <Col style={{ width: 150, height: 140 }}>
                <CircularProgressbar
                  value={item.value_team}
                  maxValue={item.value_activity}
                  text={
                    item.type_stats === "INCREMENTAL"
                      ? `${item.value_team}/${item.value_activity}`
                      : `${(item.value_team * 100) / item.value_activity}%`
                  }
                  styles={styles.circlePro}
                />
                <Title level={4} style={{ textAlign: "center" }}>
                  {item.name}
                </Title>
              </Col>
            ))}
          </Row>
        )}
      </Col>

      <Col span={24} style={{ marginTop: "20px" }}>
        <Row
          align="middle"
          justify={"space-between"}
          style={{ marginTop: "0px" }}
        >
          <Col>
            <Title level={2}>Actividad personal</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              style={{ marginBottom: window.innerWidth < 900 && "20px" }}
              onClick={() => window.location.assign("/profile_competition")}
            >
              Ver mas
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"space-between"} style={{ marginBottom: "20px" }}>
          <Col xl={11} xs={24}>
            {stats_personal.length > 0 && (
              <Descriptions title="Acumulado" bordered>
                <Descriptions.Item label="Pruebas en competencia " span={3}>
                  {state.user.profile.total_activities_user.length}
                </Descriptions.Item>
                <Descriptions.Item label="Pruebas completadas" span={3}>
                  {state.user.profile.total_activities_user_completed.length}
                </Descriptions.Item>
                <Descriptions.Item label="Puntos obtenidos" span={3}>
                  {state.user.points} pts.
                </Descriptions.Item>
                <Descriptions.Item label="Minutos ejercitados" span={3}>
                  {state.user.profile.total_activities_user.reduce(
                    (total, activity) => total + activity.duration,
                    0
                  )}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Col>
          <Col xl={11} xs={24} style={{ marginTop: "-23px" }}>
            {stats_personal && (
              <>
                <Title level={4} style={{ marginBottom: "15px" }}>
                  Intervalos
                </Title>
                <Table
                  bordered
                  style={{ marginBottom: "10px" }}
                  rowClassName={"backtable"}
                  size="small"
                  pagination={{ pageSize: 1 }}
                  columns={[
                    {
                      title: "Intervalo",
                      width: "30%",
                      dataIndex: "week",
                      render: (text) => (
                        <span>{text.replace("Week ", "Intervalo ")}</span>
                      ),
                    },
                    {
                      render: (obj) => (
                        <Row>
                          <Descriptions>
                            <Descriptions.Item
                              label="Pruebas en competencia "
                              span={3}
                            >
                              {obj.totalActivities}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Pruebas completadas"
                              span={3}
                            >
                              {obj.totalCompletedActivities}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Puntos obtenidos"
                              span={3}
                            >
                              {(
                                state.user.team.participants.reduce(
                                  (total, user) => total + user.points,
                                  0
                                ) / state.user.team.participants.length
                              ).toFixed(0)}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Minutos ejercitados"
                              span={3}
                            >
                              {obj.totalDuration}
                            </Descriptions.Item>
                          </Descriptions>
                        </Row>
                      ),
                    },
                  ]}
                  dataSource={stats_personal}
                />
              </>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginTop: "20px" }}>
        <Row
          align="middle"
          justify={"space-between"}
          style={{ marginTop: "30px" }}
        >
          <Col>
            <Title level={2}>Novedades</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => window.location.assign("/blog")}
            >
              Ver mas
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Blog type="novedades" />
      </Col>
    </Row>
  );
};

const styles = {
  title: {
    color: "#fff",
  },
  circlePro: buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "butt",

    // Text size
    textSize: "16px",

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `#001529`,
    textColor: "#001529",
    backgroundColor: "#3e98c7",
  }),
  circleDanger: buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "butt",

    // Text size
    textSize: "16px",

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `#001529`,
    textColor: "grey",
    backgroundColor: "#3e98c7",
  }),
  card: {
    marginBottom: "10px",
    backgroundColor: "#001529",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  cardC: {
    backgroundColor: "#001529",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
  cardContainsRow: {
    backgroundColor: "#001529",
    width: "60%",
    color: "#fff",
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Dashboard;
