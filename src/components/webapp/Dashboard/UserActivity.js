import React, { useContext, useState } from "react";
import { Flex, Card, Descriptions } from "antd";
import { AppContext } from "../../../App";
import { BiChart } from "react-icons/bi";
const UserActivity = () => {
  const { state } = useContext(AppContext);

  const initialStateStats = {
    totalActivities: 0,
    totalCompletedActivities: 0,
    totalDuration: 0,
  };

  const activities =
    state.user.enterprise_competition_overflow.last_competence.stats
      .historical_data;

  const allActivities = activities.reduce((acc, activity) => {
    return acc.concat(activity.data.user.activities);
  }, []);

  const allActivitiesGroup = activities.reduce((acc, activity) => {
    return acc.concat(activity.data.my_team.activities);
  }, []);

  const groupedActivities = allActivitiesGroup.reduce((acc, activity) => {
    const intervalId = activity.interval.id;
    if (!acc[intervalId]) {
      acc[intervalId] = {
        intervalId: intervalId,
        totalActivities: 0,
        totalCompleted: 0,
        totalPoints: 0,
        participantsCount: 0,
        participants: new Set(),
      };
    }
    acc[intervalId].totalActivities += 1;
    if (activity.is_completed) {
      acc[intervalId].totalCompleted += 1;
      acc[intervalId].totalPoints += activity.activity.points;
    }
    acc[intervalId].participants.add(activity.user.id);
    acc[intervalId].participantsCount = acc[intervalId].participants.size;
    return acc;
  }, {});

  Object.keys(groupedActivities).forEach((intervalId) => {
    delete groupedActivities[intervalId].participants;
  });

  const averagePointsPerParticipant = Object.keys(groupedActivities).reduce(
    (acc, intervalId) => {
      const interval = groupedActivities[intervalId];
      acc[intervalId] = {
        intervalId: interval.intervalId,
        averagePoints:
          interval.participantsCount > 0
            ? interval.totalPoints / interval.participantsCount
            : 0,
      };
      return acc;
    },
    {}
  );

  const totalAveragePoints = Object.values(averagePointsPerParticipant).reduce(
    (acc, interval) => acc + interval.averagePoints,
    0
  );

  const completedActivities = allActivities.filter(
    (activity) => activity.is_completed
  );

  return (
    <Card title="Indicadores competencía" style={styles.card}>
      <Flex gap={"small"} align="center" style={{ marginTop: "50px" }}>
        <Descriptions bordered style={{ width: "300px" }}>
          <Descriptions.Item label="Pruebas competencia " span={3}>
            {allActivities.length}
          </Descriptions.Item>
          <Descriptions.Item label="Pruebas completadas" span={3}>
            {allActivities.filter((activity) => activity.is_completed).length}
          </Descriptions.Item>

          <Descriptions.Item label="Pruebas no completadas" span={3}>
            {allActivities.filter((activity) => !activity.is_load).length}
          </Descriptions.Item>
          <Descriptions.Item label="Puntos obtenidos" span={3}>
            {totalAveragePoints}{" "}
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Card>
  );
};

const styles = {
  card: {
    background:
      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%)",
  },
};

export default UserActivity;
