import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Flex, Alert } from "antd";
import { CheckCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import Welcome from "../components/webapp/Dashboard/Welcome";
import Blog from "./Blog";
import { AppContext } from "../App";
import CompetitionSummary from "../components/webapp/Dashboard/CompetitionSummary";
import UserChallenge from "../components/webapp/Dashboard/UserChallenge";
import UserActivity from "../components/webapp/Dashboard/UserActivity";
import Stats from "../components/webapp/ProfileUser/Stats";
import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";
import { parseDateYMDLocal, normalizeDateOnly } from "../utils/date";

const { Title } = Typography;

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);

  // Debug: Log the data structure
  console.log("=== DEBUG DASHBOARD ===");
  console.log(
    "state.user.enterprise_competition_overflow:",
    state.user.enterprise_competition_overflow
  );
  console.log(
    "last_competence:",
    state.user.enterprise_competition_overflow?.last_competence
  );
  console.log(
    "stats:",
    state.user.enterprise_competition_overflow?.last_competence?.stats
  );
  console.log(
    "my_team:",
    state.user.enterprise_competition_overflow?.last_competence?.stats?.my_team
  );
  console.log(
    "intervals:",
    state.user.enterprise_competition_overflow?.last_competence?.stats?.my_team
      ?.intervals
  );

  // Log each interval in detail
  const intervals =
    state.user.enterprise_competition_overflow?.last_competence?.stats?.my_team
      ?.intervals;
  if (intervals && Array.isArray(intervals)) {
    console.log(`Total de intervalos encontrados: ${intervals.length}`);
    intervals.forEach((interval, index) => {
      console.log(`=== INTERVALO ${index} ===`);
      console.log(`Intervalo completo:`, interval);
      console.log(`  - start_date: ${interval.start_date}`);
      console.log(`  - end_date: ${interval.end_date}`);
      console.log(`  - points: ${interval.points}`);
      console.log(`  - medition_avg:`, interval.medition_avg);

      // Verificar si el intervalo está terminado
      if (interval.end_date) {
        const today = new Date().toISOString().split("T")[0];
        const intervalEndDate = interval.end_date.split("T")[0];
        const isCompleted = intervalEndDate < today;
        console.log(
          `  - ¿Terminado? ${intervalEndDate} < ${today} = ${isCompleted}`
        );
      }
      console.log(`=== FIN INTERVALO ${index} ===`);
    });
  } else {
    console.log("No se encontraron intervalos o no es un array");
  }

  console.log("=== FIN DEBUG DASHBOARD ===");

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
    state.user?.enterprise_competition_overflow?.last_competence?.end_date;

  const active_competence = () => {
    if (!last_competence_end) {
      return false;
    }
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
        {active_competence() && state.user?.enterprise_competition_overflow?.last_competence ? (
          <>
            <UserChallenge
              challengers={
                state.user.enterprise_competition_overflow.last_competence.stats
                  ?.current_interval_data
              }
              pagination={false}
            />
            <MyTeamActivity
              team_data={
                state.user.enterprise_competition_overflow.last_competence.stats
                  ?.current_interval_data?.my_group
              }
            />
          </>
        ) : last_competence_end ? (
          (() => {
            const startDate = parseDateYMDLocal(
              state.user.enterprise_competition_overflow?.last_competence
                ?.start_date
            );
            const endDate = parseDateYMDLocal(last_competence_end);
            const today = normalizeDateOnly(new Date());

            if (today < startDate) {
              return (
                <Alert
                  message={`La competencia comenzará el ${startDate.toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                  description="Prepárate para la competencia."
                  type="warning"
                  showIcon
                  icon={<ClockCircleOutlined />}
                />
              );
            } else {
              return (
                <Alert
                  message={`La competencia terminó el ${endDate.toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                  description="Revisa el resumen y resultados finales disponibles."
                  type="success"
                  showIcon
                  icon={
                    <CheckCircleFilled
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(10, 95, 224, 0.95) 0%, rgba(10, 140, 207, 0.9) 50%, rgba(18, 227, 194, 0.95) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontSize: "18px",
                      }}
                    />
                  }
                />
              );
            }
          })()
        ) : (
          <Alert
            message="No hay competencia activa"
            description="No se encontró información de competencia disponible."
            type="info"
            showIcon
          />
        )}
      </Flex>

      <Blog type="novedades" />
    </Flex>
  );
};

export default Dashboard;
