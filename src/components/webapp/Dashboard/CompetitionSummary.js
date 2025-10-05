import React, { useContext } from "react";
import { Card, Statistic, Flex } from "antd";
import { AppContext } from "../../../App";
import {
  FieldNumberOutlined,
  FlagOutlined,
  TeamOutlined,
  TrophyFilled,
  CalendarFilled,
} from "@ant-design/icons";
import { parseDateYMDLocal, normalizeDateOnly } from "../../../utils/date";

const CompetitionSummary = () => {
  const { state } = useContext(AppContext);

  const name_competition =
    state.user.enterprise_competition_overflow.last_competence.name.toUpperCase();

  var name_team = null;

  if (state.user.group_participation.name) {
    name_team = state.user.group_participation.name;
  }

  var points = "S/P";
  var ranking = "S/R";
  const endDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.end_date
  );
  const startDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.start_date
  );

  const today = normalizeDateOnly(new Date());

  // Obtener datos del ranking para mostrar siempre el último intervalo completado
  const rankingData =
    state.user.enterprise_competition_overflow.last_competence.ranking
      .intervals;
  const myTeamId = state.user.group_participation.id;

  console.log("=== DEBUG COMPETITION SUMMARY ===");
  console.log("today:", today);
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);
  console.log("rankingData:", rankingData);
  console.log("myTeamId:", myTeamId);

  // Lógica según el estado de la competencia
  if (today < startDate) {
    // Competencia no ha comenzado
    points = "S/P";
    ranking = "S/R";
    console.log("Competencia no ha comenzado");
  } else {
    // Competencia activa o terminada - buscar último intervalo completado
    if (rankingData && Array.isArray(rankingData)) {
      const todayString = today.toISOString().split("T")[0];

      // Filtrar intervalos completados y ordenar por fecha más reciente
      const completedIntervals = rankingData
        .filter((interval) => interval.end_date < todayString)
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

      console.log("Intervalos completados:", completedIntervals);

      if (completedIntervals.length > 0) {
        // Obtener el último intervalo completado
        const lastInterval = completedIntervals[0];
        const myTeamRanking = lastInterval.ranking?.find(
          (team) => team.team_id === myTeamId
        );

        if (myTeamRanking) {
          points = myTeamRanking.points || "S/P";
          ranking = myTeamRanking.position || "S/R";
          console.log("Último intervalo completado:", {
            interval: lastInterval,
            points,
            ranking,
          });
        } else {
          points = "S/P";
          ranking = "S/R";
          console.log("No se encontró mi equipo en el ranking");
        }
      } else {
        // No hay intervalos completados aún
        points = "S/P";
        ranking = "S/R";
        console.log("No hay intervalos completados aún");
      }
    }
  }
  console.log("Puntos finales:", points, "Ranking final:", ranking);

  return (
    <Card
      title={
        <Flex gap="small">
          <TrophyFilled style={styles.iconThrophy} /> Competencía "
          {name_competition}"
        </Flex>
      }
      style={styles.card}
      size="small"
    >
      <Flex gap="medium" justify="space-between" align="center">
        <Flex vertical gap="small" style={{ minWidth: "120px" }}>
          <Flex align="center" gap="small">
            <TeamOutlined style={{ color: "rgba(15,120,142,0.8)" }} />
            <span style={{ fontSize: "14px", color: "#666" }}>Equipo</span>
          </Flex>
          <span style={{ fontSize: "16px", fontWeight: "500" }}>
            {name_team}
          </span>
        </Flex>

        {today < startDate ? (
          <div
            style={{
              padding: "6px 10px",
              backgroundColor: "rgba(230,184,0,0.1)",
              border: "1px solid rgba(230,184,0,0.3)",
              borderRadius: "8px",
              fontSize: "11px",
              maxWidth: "180px",
              lineHeight: "1.3",
            }}
          >
            <div style={{ color: "rgba(230,184,0,0.9)", fontWeight: "500" }}>
              ⚠️ Comienza el{" "}
              {startDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </div>
            <div
              style={{
                color: "rgba(60,87,93,0.7)",
                fontSize: "10px",
                marginTop: "1px",
              }}
            >
              Prepárate
            </div>
          </div>
        ) : today > endDate ? (
          <Flex gap="medium" vertical align="center">
            <div
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(15,120,142,0.1)",
                border: "1px solid rgba(15,120,142,0.3)",
                borderRadius: "8px",
                fontSize: "10px",
                maxWidth: "160px",
                lineHeight: "1.2",
                marginBottom: "6px",
              }}
            >
              <div style={{ color: "rgba(15,120,142,0.9)", fontWeight: "500" }}>
                <CalendarFilled
                  style={{ marginRight: "4px", color: "rgba(15,120,142,0.9)" }}
                />{" "}
                Terminó el{" "}
                {endDate.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                })}
              </div>
            </div>
            <Flex gap="small" align="center">
              <div style={{ textAlign: "center", minWidth: "60px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#666",
                    marginBottom: "2px",
                  }}
                >
                  Puntos
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "rgba(15,120,142,0.8)",
                  }}
                >
                  <FlagOutlined style={{ marginRight: "4px" }} />
                  {points}
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: "60px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#666",
                    marginBottom: "2px",
                  }}
                >
                  Ranking
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "rgba(15,120,142,0.8)",
                  }}
                >
                  <FieldNumberOutlined style={{ marginRight: "4px" }} />
                  {ranking}
                </div>
              </div>
            </Flex>
          </Flex>
        ) : (
          <Flex gap="large">
            <Statistic
              title="Puntos"
              valueStyle={styles.valueStyle}
              value={points}
              prefix={<FlagOutlined />}
            />

            <Statistic
              title="Ranking"
              valueStyle={styles.valueStyle}
              value={ranking}
              prefix={<FieldNumberOutlined />}
            />
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

const styles = {
  valueStyle: {
    fontSize: "16px",
  },
  card: {
    background:
      "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
    border: "1px solid rgba(15,120,142,0.2)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
  },
  iconThrophy: {
    fontSize: "20px",
    color: "#e6b800",
  },
};

export default CompetitionSummary;
