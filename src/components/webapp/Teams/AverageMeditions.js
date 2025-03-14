import React, { useContext } from "react";
import { Statistic, Card, Flex, Typography } from "antd";
import { AppContext } from "../../../App";
const { Text, Title } = Typography;

const AverageMeditions = () => {
  const { state } = useContext(AppContext);

  const firstAvg =
    state.user.enterprise_competition_overflow.last_competence
      .avg_corporal_meditions_teams.first_avg;
  const lastAvg =
    state.user.enterprise_competition_overflow.last_competence
      .avg_corporal_meditions_teams.last_avg;

  const my_team_u = state.user.enterprise_competition_overflow.last_competence
    .stats.current_interval_data
    ? state.user.enterprise_competition_overflow.last_competence.stats
        .current_interval_data.my_group
    : [];
  const my_team =
    state.user.enterprise_competition_overflow.last_competence.stats
      .historical_data;

  const totalCompleted = my_team.reduce((acc, interval) => {
    return acc + interval.data.my_team.is_completed;
  }, 0);

  const totalActivity = my_team.reduce((acc, interval) => {
    return acc + interval.data.my_team.is_active;
  }, 0);

  const userCount = Object.keys(my_team_u).length;

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
          >
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Estatura Inicial"
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
                title="Grasa Inicial"
                value={firstAvg.fat.toFixed(1)}
                suffix={<Text>%</Text>}
              />
            </Card>
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Peso Inicial"
                value={firstAvg.weight.toFixed(1)}
                suffix={<Text>Kg</Text>}
              />
            </Card>
          </Flex>
          <Flex gap="large" justify="center" align="center">
            <Card
              size="small"
              hoverable
              style={{ ...styles.static, textAlign: "center" }}
            >
              <Statistic
                title="Estatura Actual"
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
                title="Grasa Actual"
                value={lastAvg.fat.toFixed(1)}
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
                value={lastAvg.weight.toFixed(1)}
                suffix={<Text>Kg</Text>}
              />
            </Card>
          </Flex>
        </Card>
      </Flex>

      <Flex
        gap="large"
        style={{ width: "100%" }}
        justify="center"
        align="center"
      >
        <Card
          hoverable
          style={{ ...styles.static, textAlign: "center", width: "100%" }}
          size="small"
        >
          <Statistic title="En competencía" value={userCount} />
          <Text>Participantes</Text>
        </Card>
        <Card
          hoverable
          style={{ ...styles.static, textAlign: "center", width: "100%" }}
          size="small"
        >
          <Statistic title="Se han agendado" value={totalActivity} />
          <Text type="secondary">Pruebas al equipo</Text>
        </Card>
        <Card
          hoverable
          style={{ ...styles.static, textAlign: "center", width: "100%" }}
          size="small"
        >
          <Statistic title="Se han completado" value={totalCompleted} />
          <Text type="secondary">Pruebas</Text>
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

export default AverageMeditions;
