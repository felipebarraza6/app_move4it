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
    return 0;
  };

  const Ranking = () => {
    return 0;
  };

  const SuffixRanking = () => {
    return 0;
  };

  return (
    <Card
      title={
        <Flex gap="small">
          <TrophyOutlined /> Resumen competencía
        </Flex>
      }
      style={styles.card}
      size="small"
    >
      <Flex gap="large">
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
  },
};

export default CompetitionSummary;
