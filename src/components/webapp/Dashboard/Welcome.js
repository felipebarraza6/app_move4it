import React, { useContext } from "react";
import { Flex, Card, Badge, Avatar } from "antd";
import { AppContext } from "../../../App";
import Stats from "../ProfileUser/Stats";
const Welcome = () => {
  const { state } = useContext(AppContext);

  return (
    <Flex
      justify="space-between"
      align="top"
      style={{ marginBottom: "20px" }}
      gap={"small"}
    >
      <Card hoverable style={styles.card}>
        <Flex gap="small" vertical>
          <div>
            Hola, {state.user.first_name} {state.user.last_name}
          </div>
          <div>Bienvenido a Move4it</div>
        </Flex>
      </Card>
      <Stats />
    </Flex>
  );
};

const styles = {
  badgeText: {
    fontSize: "15px",
  },
  card: {
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
    fontSize: "20px",
    fontWeight: "bold",
    border: "1px solid white",
    height: "100%",
  },
  badge: {},
};

export default Welcome;
