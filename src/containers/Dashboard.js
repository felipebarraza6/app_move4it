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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Remove resizeTo dependency as it's not needed

  const last_competence_end =
    state.user.enterprise_competition_overflow.last_competence.end_date;

  const active_competence = () => {
    const today = new Date().toISOString().split("T")[0];
    if (last_competence_end < today) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Flex gap="large" vertical>
      <Flex
        gap="small"
        justify="space-between"
        vertical={window.innerWidth < 768 ? true : false}
      >
        <Welcome />
        <Stats />
        <CompetitionSummary />
      </Flex>
      <Flex justify="center" vertical gap="large">
        {active_competence() && (
          <>
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
                  .my_team
              }
            />
          </>
        )}
      </Flex>

      <Blog type="novedades" />
    </Flex>
  );
};

export default Dashboard;
