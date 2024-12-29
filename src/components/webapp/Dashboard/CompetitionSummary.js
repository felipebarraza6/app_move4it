import React, { useContext } from "react";
import { Card, Statistic, Flex } from "antd";
import { AppContext } from "../../../App";
import {
  FieldNumberOutlined,
  FlagOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const CompetitionSummary = () => {
  const { state } = useContext(AppContext);

  const teamPoints = () => {
    const participants = state.user.team.participants;
    const totalPoints = participants.reduce(
      (total, user) => total + user.points,
      0
    );
    return totalPoints;
  };

  const Ranking = () => {
    var myRanking =
      state.user.profile.groups
        .sort((a, b) => b.points - a.points)
        .findIndex((item) => item.id === state.user.team.id) + 1;

    return myRanking;
  };

  const SuffixRanking = () => {
    var count_teams = state.user.profile.groups.length;
    return <span style={styles.span}>/{count_teams} equipos</span>;
  };

  return (
    <Card
      title={
        <Flex gap="small">
          <TrophyOutlined /> Resumen competencía
        </Flex>
      }
      style={styles.card}
      hoverable
      size="small"
    >
      <Flex gap="large" vertical>
        <Statistic
          title={state.user.team.enterprise.name}
          value={state.user.team.name}
          prefix={<TeamOutlined />}
        />
        <Statistic
          title="Puntaje Equipo"
          value={teamPoints()}
          suffix="pts."
          prefix={<FlagOutlined />}
        />

        <Statistic
          title="Ranking"
          value={Ranking()}
          prefix={<FieldNumberOutlined />}
          suffix={<SuffixRanking />}
        />
      </Flex>
    </Card>
  );
};

const styles = {
  span: {
    fontSize: 20,
  },
  card: {
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
    border: "1px solid white",
  },
};

export default CompetitionSummary;
