import React from "react";
import { Flex, Card } from "antd";

const UserActivity = () => {
  return <Card title="Tu actividad" style={styles.card}>
<Flex></Flex>
  </Card>;
};

const styles = {
  card: {
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
  },
};

export default UserActivity;
