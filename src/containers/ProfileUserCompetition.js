import React, { useContext, useState, useEffect } from "react";
import { Flex, Alert, Card } from "antd";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
import MyData from "../components/webapp/ProfileUserCompetition.js/MyData";
import Stats from "../components/webapp/ProfileUser/Stats";
import UserChallenge from "../components/webapp/Dashboard/UserChallenge";
import UserActivity from "../components/webapp/Dashboard/UserActivity";
import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";

const ProfileUserCompetition = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      const competence = state.user?.enterprise_competition_overflow?.last_competence;
      
      if (competence && competence.id && !competence.stats) {
        console.log('Loading stats for competence in ProfileUserCompetition:', competence.id);
        try {
          const { endpoints } = await import('../config/endpoints');
          const statsData = await endpoints.competence.retrieveStats(competence.id);
          
          dispatch({
            type: 'UPDATE_COMPETENCE_STATS',
            payload: statsData,
          });
        } catch (error) {
          console.error('Error loading stats:', error);
        }
      }
    };

    loadStats();
  }, [state.user?.enterprise_competition_overflow?.last_competence?.id, dispatch]);

  return (
    <Flex align={"middle"} vertical gap={"large"} style={{ width: "100%" }}>
      <Flex justify="center" align="middle" gap={"large"} vertical={isMobile} style={{ width: "100%" }}>
        <MyData />
        <Stats />
      </Flex>
      
      <div className="stagger-item delay-3" style={{ width: "100%" }}>
        {(() => {
          const stats = state.user?.enterprise_competition_overflow?.last_competence?.stats;
          
          if (!stats) {
            return (
              <Card
                className="premium-card"
                loading={true}
                title={<span style={{ color: "#0A5FE0", fontWeight: 600 }}>Cargando actividad...</span>}
              >
                Cargando estadísticas de competencia...
              </Card>
            );
          }

          const today = new Date().toISOString().split("T")[0];
          const historicalData = stats.historical_data;
          const currentIntervalData = stats.current_interval_data;
          
          const hasCompletedIntervals =
            historicalData &&
            Array.isArray(historicalData) &&
            historicalData.some((interval) => interval.end_date < today);

          return (
            <Flex vertical gap="large" style={{ width: "100%" }}>
              {/* Individual Challenges */}
              <div className="stagger-item delay-4">
                <UserChallenge
                  challengers={historicalData || currentIntervalData}
                  pagination={true}
                />
              </div>

              {/* Team Activity - THIS IS WHAT THE USER SPECIFICALLY ASKED FOR */}
              <div className="stagger-item delay-5">
                <MyTeamActivity
                  team_data={currentIntervalData?.my_group}
                />
              </div>

              {!hasCompletedIntervals && (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "20px",
                    color: "rgba(10, 95, 224, 0.6)",
                    fontSize: "14px",
                    fontStyle: "italic",
                    background: "rgba(10, 95, 224, 0.05)",
                    border: "1px solid rgba(10, 95, 224, 0.1)",
                    borderRadius: "12px",
                  }}
                >
                  Los datos detallados estarán disponibles después de que termine el primer intervalo.
                </div>
              )}
            </Flex>
          );
        })()}
      </div>
    </Flex>
  );
};

export default ProfileUserCompetition;
