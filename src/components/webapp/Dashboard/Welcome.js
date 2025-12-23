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
        <div style={{ color: "#0A5FE0", fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
          Hola, {capitalizeFirstLetter(state.user.first_name)}{" "}
          {capitalizeFirstLetter(state.user.last_name)}
        </div>
        <div>
          <span style={{ color: "#1a1a1a" }}>Bienvenido a </span>
          <span style={{ color: "#12E3C2", fontWeight: "600" }}>Move4IA</span>
        </div>
      </Flex>
    </Card>
  );
};

const styles = {
  badgeText: {
    fontSize: "15px",
  },
  card: {
    background: "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
    fontSize: "17px",
    border: "1px solid rgba(10, 95, 224, 0.2)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
    color: "#1a1a1a",
  },
};

export default Welcome;
