import React, { useContext } from "react";
import { Statistic, Card, Flex, Typography } from "antd";
import { AppContext } from "../../../App";
const { Text } = Typography;
const AvgAllGroups = () => {
  const { state } = useContext(AppContext);

  const firstAvg =
    state.user.enterprise_competition_overflow.last_competence
      .avg_corporal_meditions_competition.first_avg;
  const lastAvg =
    state.user.enterprise_competition_overflow.last_competence
      .avg_corporal_meditions_competition.last_avg;

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
          <Flex
            gap="large"
            justify="center"
            align="center"
            style={{ marginBottom: "10px" }}
            vertical={window.innerWidth > 900 ? false : true}
          >
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Estatura Inicial" // eslint-disable-line
                value={firstAvg.height.toFixed(2)}
                suffix={<Text>mt</Text>}
              />
            </Card>
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Grasa Inicial" // eslint-disable-line
                value={firstAvg.fat.toFixed(2)}
                suffix={<Text>%</Text>}
              />
            </Card>
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Peso Inicial" // eslint-disable-line
                value={firstAvg.weight.toFixed(2)}
                suffix={<Text>Kg</Text>}
              />
            </Card>
          </Flex>
          <Flex
            gap="large"
            justify="center"
            align="center"
            vertical={window.innerWidth > 900 ? false : true}
          >
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Estatura Actual" // eslint-disable-line
                value={lastAvg.height.toFixed(2)}
                suffix={<Text>mt</Text>}
              />
            </Card>
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Grasa Actual" // eslint-disable-line
                value={lastAvg.fat.toFixed(2)}
                suffix={<Text>%</Text>}
              />
            </Card>
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Peso Actual"
                value={lastAvg.weight.toFixed(2)}
                suffix={<Text>Kg</Text>}
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
