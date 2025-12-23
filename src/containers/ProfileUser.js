import React, { useContext } from "react";
import { Row, Col, Typography, Flex, Card, Alert } from "antd";
import {
  UserOutlined,
  LineChartOutlined,
  LockOutlined,
} from "@ant-design/icons";
import FormData from "../components/webapp/ProfileUser/FormData";
import Stats from "../components/webapp/ProfileUser/Stats";
import UpdatePassword from "../components/webapp/ProfileUser/UpdatePassword";
import { AppContext } from "../App";

const { Title } = Typography;

const ProfileUser = () => {
  const { state } = useContext(AppContext);

  // Obtener datos de intervalos del usuario
  const userData =
    state.user.enterprise_competition_overflow?.last_competence?.stats?.my_team;

  // Validar si hay intervalos terminados
  const hasCompletedIntervals = (() => {
    console.log("=== DEBUG PROFILEUSER ===");
    console.log("userData:", userData);
    console.log("userData.intervals:", userData?.intervals);

    if (
      !userData ||
      !userData.intervals ||
      !Array.isArray(userData.intervals)
    ) {
      console.log("No hay datos de intervalos válidos");
      return false;
    }

    const today = new Date().toISOString().split("T")[0];
    console.log("Fecha actual:", today);

    // Verificar cada intervalo primero
    userData.intervals.forEach((interval, index) => {
      console.log(`Intervalo ${index}:`, interval);
      if (interval && interval.end_date) {
        const intervalEndDate = interval.end_date.split("T")[0];
        console.log(`  - start_date: ${interval.start_date}`);
        console.log(
          `  - end_date: ${interval.end_date} -> normalizado: ${intervalEndDate}`
        );
        console.log(
          `  - ¿Terminado? ${intervalEndDate} < ${today} = ${
            intervalEndDate < today
          }`
        );
      }
    });

    const result = userData.intervals.some((interval, index) => {
      if (!interval || !interval.end_date) {
        console.log(`Intervalo ${index}: sin end_date`);
        return false;
      }

      // Normalizar fechas para comparación
      const intervalEndDate = interval.end_date.split("T")[0]; // Asegurar formato YYYY-MM-DD
      const isCompleted = intervalEndDate < today;
      console.log(
        `Intervalo ${index}: ${intervalEndDate} < ${today} = ${isCompleted}`
      );
      return isCompleted;
    });

    console.log("hasCompletedIntervals result:", result);
    console.log("=== FIN DEBUG PROFILEUSER ===");
    return result;
  })();

  return (
    <Flex gap={"large"} align="top" justify="space-around" vertical>
      <Flex
        gap={"large"}
        align="top"
        vertical={window.innerWidth > 900 ? false : true}
      >
        <Flex align="top" style={{ width: "100%" }}>
          <FormData />
        </Flex>
        <Flex vertical justify="center" style={{ width: "100%" }} gap="large">
          <UpdatePassword />
          {!hasCompletedIntervals ? (
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
          ) : (
            <Stats />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileUser;
