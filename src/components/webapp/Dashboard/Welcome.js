import React, { useContext } from "react";
import { Flex, Card, Badge } from "antd";
import { AppContext } from "../../../App";
import Stats from "../ProfileUser/Stats";
const Welcome = () => {
  const { state } = useContext(AppContext);

  return (
    <Flex
      justify="space-around"
      align="center"
      style={{ marginBottom: "20px" }}
    >
      <Card style={styles.card}>
        <Flex gap="small" vertical>
          <div>
            Hola, {state.user.first_name} {state.user.last_name}
          </div>
          <div>Bienvenido a Move4it</div>
        </Flex>
      </Card>
      <Stats />
      <Card hoverable style={styles.card}>
        <Flex gap="small" vertical align="center">
          <div>Tu puntaje</div>
          <div>
            <Badge count={state.user.points} color="blue" />
            <strong style={styles.badgeText}> pts.</strong>
          </div>
        </Flex>
      </Card>
    </Flex>
  );
};

const styles = {
  badgeText: {
    fontSize: "15px",
  },
  card: {
    backgroundColor: "#001529",
    fontSize: "20px",
    color: "white",
    fontWeight: "bold",
    height: "100%",
  },
};

export default Welcome;
