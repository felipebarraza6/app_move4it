import React, { useContext } from "react";
import { Flex, Card } from "antd";
import { AppContext } from "../../../App";
import Stats from "../ProfileUser/Stats";
const Welcome = () => {
  const { state } = useContext(AppContext);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card style={styles.card}>
      <Flex gap="small" vertical>
        <div>
          Hola, {capitalizeFirstLetter(state.user.first_name)}{" "}
          {capitalizeFirstLetter(state.user.last_name)}
        </div>
        <div>Bienvenido a Move4it</div>
      </Flex>
    </Card>
  );
};

const styles = {
  badgeText: {
    fontSize: "15px",
  },
  card: {
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
    fontSize: "17px",
    border: "none",
  },
};

export default Welcome;
