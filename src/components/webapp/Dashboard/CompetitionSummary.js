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

  const name_competition =
    state.user.enterprise_competition_overflow.last_competence.name.toUpperCase();

  const team_player =
    state.user.enterprise_competition_overflow.last_competence.stats.teams
      .length;

  const name_team =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .name;

  const points =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .points;

  const ranking =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .position;

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
          suffix={`/${team_player}`}
        />
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
