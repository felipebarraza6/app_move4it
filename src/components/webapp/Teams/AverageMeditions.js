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

  // Usar datos históricos para estadísticas completas
  const my_team =
    state.user.enterprise_competition_overflow.last_competence.stats
      .historical_data;

  // Calcular estadísticas basadas en intervalos completados
  const allParticipants = new Set();
  let totalScheduled = 0;
  let totalCompleted = 0;

  if (my_team && Array.isArray(my_team)) {
    const today = new Date().toISOString().split("T")[0];
    my_team.forEach((interval) => {
      // Solo intervalos terminados (end_date < today)
      if (interval.end_date < today && interval.data?.my_team?.activities) {
        interval.data.my_team.activities.forEach((activity) => {
          // Contar participantes únicos
          if (activity.user?.email) {
            allParticipants.add(activity.user.email);
          }

          // Contar actividades agendadas
          totalScheduled++;

          // Contar actividades completadas
          if (activity.is_completed) {
            totalCompleted++;
          }
        });
      }
    });
  }

  const userCount = allParticipants.size;

  return (
    <Flex
      gap="large"
      justify="center"
      align="center"
      style={{ width: "100%" }}
      vertical
    >
      <Flex
        style={{ width: "100%" }}
        justify="center"
        align="center"
        vertical={window.innerWidth > 900 ? false : true}
      >
        <Card
          style={{
            background:
              "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
            border: "1px solid rgba(15,120,142,0.2)",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
            textAlign: "center",
            width: "100%",
          }}
          title={
            <Text
              style={{
                fontSize: "17px",
                color: "rgba(15,120,142,0.8)",
                fontWeight: "600",
              }}
            >
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
                title="Peso Inicial"
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

      <Flex
        gap="large"
        style={{ width: "100%" }}
        justify="center"
        align="center"
        vertical={window.innerWidth > 900 ? false : true}
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
          <Statistic title="Se han agendado" value={totalScheduled} />
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
      "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
    border: "1px solid rgba(15,120,142,0.2)",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(15,120,142,0.1)",
    width: "100%",
  },
};

export default AverageMeditions;
