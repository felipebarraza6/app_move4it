import React, { useContext, useState, useEffect } from "react";
import { Flex, Alert } from "antd";
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
        {(() => {
          const today = new Date().toISOString().split("T")[0];
          const historicalData =
            state.user.enterprise_competition_overflow.last_competence.stats
              .historical_data;
          const hasCompletedIntervals =
            historicalData &&
            Array.isArray(historicalData) &&
            historicalData.some((interval) => interval.end_date < today);

          if (!hasCompletedIntervals) {
            return (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "rgba(10, 95, 224, 0.6)",
                  fontSize: "14px",
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
                  border: "1px solid rgba(10, 95, 224, 0.2)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
                }}
              >
                Los datos estarán disponibles después de que termine el primer
                intervalo.
              </div>
            );
          }

          return (
            <UserChallenge
              challengers={
                state.user.enterprise_competition_overflow.last_competence.stats
                  .historical_data
              }
              pagination={true}
            />
          );
        })()}
      </Flex>
    </Flex>
  );
};

export default ProfileUserCompetition;
