import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Button, Table, Descriptions } from "antd";
import { CircularProgressbar } from "react-circular-progressbar";
import { ArrowRightOutlined } from "@ant-design/icons";
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
        <UserActivity />
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
