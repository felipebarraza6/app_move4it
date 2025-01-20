import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Flex } from "antd";
import Welcome from "../components/webapp/Dashboard/Welcome";
import Blog from "./Blog";
import { AppContext } from "../App";
import CompetitionSummary from "../components/webapp/Dashboard/CompetitionSummary";
import UserChallenge from "../components/webapp/Dashboard/UserChallenge";
import UserActivity from "../components/webapp/Dashboard/UserActivity";
import Stats from "../components/webapp/ProfileUser/Stats";
import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";

const { Title } = Typography;

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <Flex vertical gap="large">
      <Flex gap="small" justify="space-between">
        <Welcome />
        <Stats />
        <CompetitionSummary />
      </Flex>
      <Flex justify="center" vertical gap="large">
        <UserChallenge
          challengers={
            state.user.enterprise_competition_overflow.last_competence.stats
              .current_interval_data
          }
          pagination={false}
        />
        <MyTeamActivity
          team_data={
            state.user.enterprise_competition_overflow.last_competence.stats
              .current_interval_data
          }
        />
      </Flex>

      <Blog type="novedades" />
    </Flex>
  );
};

export default Dashboard;
