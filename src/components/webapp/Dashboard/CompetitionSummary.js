import React, { useContext } from "react";
import { Card, Statistic, Flex, Alert } from "antd";
import { AppContext } from "../../../App";
import {
  FieldNumberOutlined,
  FlagOutlined,
  TeamOutlined,
  TrophyFilled,
} from "@ant-design/icons";
import { parseDateYMDLocal, normalizeDateOnly } from "../../../utils/date";

const CompetitionSummary = () => {
  const { state } = useContext(AppContext);
  const select_interval =
    state.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data?.id;

  const historical_data =
    state.user.enterprise_competition_overflow.last_competence.stats
      .historical_data;

  const historical_data_last = historical_data[historical_data.length - 1];

  const name_competition =
    state.user.enterprise_competition_overflow.last_competence.name.toUpperCase();

  var name_team = null;

  if (state.user.group_participation.name) {
    name_team = state.user.group_participation.name;
  }

  var points = "S/P";
  var ranking = "S/R";
  const quantity = new Date(
    state.user.enterprise_competition_overflow.last_competence.days_for_interval
  );
  const endDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.end_date
  );
  const startDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.start_date
  );

  const today = normalizeDateOnly(new Date());

  if (endDate > today) {
    if (state.user.enterprise_competition_overflow.last_competence.ranking) {
      var _ob =
        state.user.enterprise_competition_overflow.last_competence.ranking
          .teams;
      var get_points = _ob.find((team) => team.team_name === name_team);
      points = get_points?.points;
      ranking = get_points?.position;
    }
  }
  console.log(points);

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
              backgroundColor: "#fff7e6",
              border: "1px solid #ffd591",
              borderRadius: "4px",
              fontSize: "11px",
              maxWidth: "180px",
              lineHeight: "1.3",
            }}
          >
            <div style={{ color: "#d46b08", fontWeight: "500" }}>
              ⚠️ Comienza el{" "}
              {startDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </div>
            <div
              style={{ color: "#8c8c8c", fontSize: "10px", marginTop: "1px" }}
            >
              Prepárate
            </div>
          </div>
        ) : today > endDate ? (
          <div
            style={{
              padding: "6px 10px",
              backgroundColor: "#e6f7ff",
              border: "1px solid #91d5ff",
              borderRadius: "4px",
              fontSize: "11px",
              maxWidth: "180px",
              lineHeight: "1.3",
            }}
          >
            <div style={{ color: "#0958d9", fontWeight: "500" }}>
              ℹ️ Terminó el{" "}
              {endDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </div>
            <div
              style={{ color: "#8c8c8c", fontSize: "10px", marginTop: "1px" }}
            >
              Ver resultados
            </div>
          </div>
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
    background: "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
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
