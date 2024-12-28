import React, { useContext } from "react";
import { Flex, Card,  Badge } from "antd";
import { AppContext } from "../../../App";

const Welcome = () => {
  const { state } = useContext(AppContext);

  return (
    <Flex justify="space-between">
      <Card style={styles.card}>
        <Flex gap="small" vertical>
          <div>
            Hola, {state.user.first_name} {state.user.last_name}
          </div>
          <div>Bienvenido a Move4it</div>
        </Flex>
      </Card>
      <Card hoverable style={styles.card}>
        <Flex gap="small" vertical align="center">
          <div>@ {state.user.username}</div>
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
    marginBottom: "10px",
    backgroundColor: "#001529",
    fontSize: "20px",
    color: "white",
    fontWeight: "bold",
  },
};

export default Welcome;
