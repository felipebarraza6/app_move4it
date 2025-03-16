import React, { useContext, useState, useEffect } from "react";
import { Flex } from "antd";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
import MyData from "../components/webapp/ProfileUserCompetition.js/MyData";
import Stats from "../components/webapp/ProfileUser/Stats";
import UserChallenge from "../components/webapp/Dashboard/UserChallenge";
import UserActivity from "../components/webapp/Dashboard/UserActivity";

const ProfileUserCompetition = () => {
  const { state } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <Flex align={"middle"} vertical gap={"large"}>
      <Flex justify="center" align="middle" gap={"large"} vertical={isMobile}>
        <MyData />
        <Stats />
      </Flex>
      <Flex gap={"small"} justify="space-around" align="top">
        <UserChallenge
          challengers={
            state.user.enterprise_competition_overflow.last_competence.stats
              .historical_data
          }
          pagination={true}
        />
      </Flex>
    </Flex>
  );
};

export default ProfileUserCompetition;
