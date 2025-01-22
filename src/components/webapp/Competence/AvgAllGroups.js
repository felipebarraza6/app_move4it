import React, { useContext } from "react";
import { Statistic, Card, Flex, Typography } from "antd";
import { AppContext } from "../../../App";
const { Text, Title } = Typography;
const AvgAllGroups = () => {
  const { state } = useContext(AppContext);

  const avg =
    state.user.enterprise_competition_overflow.last_competence
      .avg_corporal_meditions;

  return (
    <Flex
      gap="large"
      justify="center"
      align="center"
      style={{ width: "100%" }}
      vertical
    >
      <Flex style={{ width: "100%" }} justify="center" align="center">
        <Card
          style={{
            backgroundColor: "#c9d3d9",
            borderRadius: "10px",
            textAlign: "center",
            width: "100%",
          }}
          title={
            <Text style={{ fontSize: "17px", color: "black" }}>
              Mediciones promedio
            </Text>
          }
        >
          <Flex gap="large" justify="center" align="center">
            <Card hoverable style={{ ...styles.static, textAlign: "center" }}>
              <Statistic
                title="Estatura "
                value={avg.height.toFixed(2)}
                suffix={<Text>mt</Text>}
              />
            </Card>
            <Card hoverable style={{ ...styles.static, textAlign: "center" }}>
              <Statistic
                title="Grasa "
                value={avg.fat.toFixed(1)}
                suffix={<Text>%</Text>}
              />
            </Card>
            <Card hoverable style={{ ...styles.static, textAlign: "center" }}>
              <Statistic
                title="Peso "
                suffix={<Text>Kg</Text>}
                kg
                value={avg.weight.toFixed(1)}
              />
            </Card>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

const styles = {
  static: {
    background:
      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(170,184,193,1) 81%)",
    borderRadius: "10px",
    width: "100%",
  },
};

export default AvgAllGroups;
