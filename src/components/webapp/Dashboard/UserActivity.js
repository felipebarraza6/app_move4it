import React, { useContext, useState } from "react";
import { Flex, Card, Descriptions } from "antd";
import { AppContext } from "../../../App";
const UserActivity = () => {
  const { state } = useContext(AppContext);

  const initialStateStats = {
    totalActivities: 0,
    totalCompletedActivities: 0,
    totalDuration: 0,
  };

  console.log(state);
  const [statsActualInvertal, setStatsPersonal] = useState(initialStateStats);

  return (
    <Card title="Indicadores competencía" style={styles.card}>
      <Flex justify="space-around" gap={"small"}>
        <Descriptions bordered size="small">
          <Descriptions.Item
            label="Pruebas en competencia "
            span={3}
          ></Descriptions.Item>
          <Descriptions.Item
            label="Pruebas completadas"
            span={3}
          ></Descriptions.Item>
          <Descriptions.Item
            label="Puntos obtenidos"
            span={3}
          ></Descriptions.Item>
          <Descriptions.Item
            label="Minutos ejercitados"
            span={3}
          ></Descriptions.Item>
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
