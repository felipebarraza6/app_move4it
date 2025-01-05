import React, { useContext, useState } from "react";
import { Flex, Card, Descriptions } from "antd";
import { AppContext } from "../../../App";
const UserActivity = () => {
  const { state } = useContext(AppContext);

  const initialStateStats = {
    totalActivities: 0,
    totalCompletedActivities: 0,
    totalDuration: 0,
    potinsAdd: (
      state.user.team.participants.reduce(
        (total, user) => total + user.points,
        0
      ) / state.user.team.participants.length
    ).toFixed(0),
  };

  console.log(state)
  const [statsActualInvertal, setStatsPersonal] = useState(initialStateStats);

  return (
    <Card title="Tu actividad" style={styles.card}>
      <Flex justify="space-around">
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
        <Descriptions title="Intervalo actual" bordered>
          <Descriptions.Item label="Pruebas en competencia " span={3}>
            {statsActualInvertal.totalActivities}
          </Descriptions.Item>
          <Descriptions.Item label="Pruebas completadas" span={3}>
            {statsActualInvertal.totalCompletedActivities}
          </Descriptions.Item>
          <Descriptions.Item label="Puntos obtenidos" span={3}>
            {statsActualInvertal.potinsAdd}
          </Descriptions.Item>
          <Descriptions.Item label="Minutos ejercitados" span={3}>
            {statsActualInvertal.totalDuration}
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Card>
  );
};

const styles = {
  card: {
    marginTop: "20px",
    background:
      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%)",
  },
};

export default UserActivity;
