import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Button, Table, Descriptions } from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ArrowRightOutlined } from "@ant-design/icons";
import "react-circular-progressbar/dist/styles.css";
import Welcome from "../components/webapp/Dashboard/Welcome";
import Blog from "./Blog";
import { AppContext } from "../App";
import CompetitionSummary from "../components/webapp/Dashboard/CompetitionSummary";
import UserChallenge from "../components/webapp/Dashboard/UserChallenge";
import { Link } from "react-router-dom";
import UserActivity from "../components/webapp/Dashboard/UserActivity";

const { Title } = Typography;

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const [stats_personal, setStatsPersonal] = useState([]);

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
  }, []);

  return (
    <Row justify={"space-between"} align={"top"}>
      <Col span={24}>
        <Welcome />
      </Col>
      <Col span={5}>
        <CompetitionSummary />
      </Col>
      <Col span={18}>
        <UserChallenge />
      </Col>
      <Col span={24}>
        <UserActivity/>
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
            <Title level={3}>Actividad personal</Title>
          </Col>
          <Col>
            <Link to="/profile">
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                style={{ marginBottom: window.innerWidth < 900 && "20px" }}
                onClick={() => window.location.assign("/profile_competition")}
              >
                Ver mas
              </Button>
            </Link>
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
            <Title level={3}>Desempeño grupal</Title>
          </Col>

          <Col>
            <Link to="/team">
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                style={{ marginBottom: window.innerWidth < 900 && "20px" }}
              >
                Ver mas
              </Button>
            </Link>
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
            <Link to="/blog">
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                onClick={() => window.location.assign("/blog")}
              >
                Ver mas
              </Button>
            </Link>
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
