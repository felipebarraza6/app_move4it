import React, { useContext } from "react";
import { Card, Statistic, Flex } from "antd";
import { AppContext } from "../../../App";
import {
  FieldNumberOutlined,
  FlagOutlined,
  TeamOutlined,
  TrophyFilled,
} from "@ant-design/icons";

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
  const endDate = new Date(
    state.user.enterprise_competition_overflow.last_competence.start_date
  );
  endDate.setDate(endDate.getDate() + quantity.getDate());
  const today = new Date();

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
      <Flex gap="large" justify="space-between">
        <Statistic
          title={"Equipo"}
          valueStyle={styles.valueStyle}
          value={name_team}
          prefix={<TeamOutlined />}
        />
        {points && (
          <>
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
          </>
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
    width: "350px",
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
  },
  iconThrophy: {
    fontSize: "20px",
    color: "#d4b106",
  },
};

export default CompetitionSummary;
