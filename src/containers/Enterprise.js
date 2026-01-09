import React, { useContext } from "react";
import { Row, Col, Flex, Table, Alert } from "antd";
import {
  CalendarOutlined,
  CalendarTwoTone,
  CheckCircleFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Ranking from "../components/webapp/Competence/Ranking";
import AvgAllGroups from "../components/webapp/Competence/AvgAllGroups";
import IntervalsTable from "../components/webapp/Competence/IntervalsTable";
import { AppContext } from "../App";
import { parseDateYMDLocal, normalizeDateOnly } from "../utils/date";

const Enterpise = () => {
  const { state, dispatch } = useContext(AppContext);

  // Lazy load stats if not already loaded
  React.useEffect(() => {
    const loadStats = async () => {
      const competence = state.user?.enterprise_competition_overflow?.last_competence;
      
      if (competence && competence.id && (!competence.stats || !competence.ranking)) {
        console.log('Loading stats/ranking for competence in Enterprise:', competence.id);
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

  const stats = state.user?.enterprise_competition_overflow?.last_competence?.stats;
  const sourceValidate = stats?.my_team;

  // Verificar estado de la competencia
  const startDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.start_date
  );
  const endDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.end_date
  );
  const today = normalizeDateOnly(new Date());

  const competitionNotStarted = today < startDate;
  const competitionEnded = today > endDate;
  const competitionActive = today >= startDate && today <= endDate;

  // Show loading spinner if stats are missing
  if (!stats) {
    return (
      <Row justify="center" align="middle" style={{ padding: "50px" }}>
        <Flex vertical align="center" gap="middle">
          <Alert
            message="Cargando estadísticas de empresa..."
            type="info"
            showIcon
          />
        </Flex>
      </Row>
    );
  }

  return (
    <Row justify={"space-between"} align="top">
      <Col xs={24} xl={24} style={{ paddingRight: "10px" }}>
        <Flex gap={"large"} align="top" justify="space-between" vertical>
          <Flex
            style={{ width: "100%" }}
            gap={"large"}
            align="top"
            vertical={window.innerWidth > 900 ? false : true}
          >
            <Flex align="top" style={{ width: "100%" }}>
              {(() => {
                const today = new Date().toISOString().split("T")[0];
                const hasCompletedIntervals = (() => {
                  if (
                    !sourceValidate ||
                    !sourceValidate.intervals ||
                    !Array.isArray(sourceValidate.intervals)
                  ) {
                    return false;
                  }

                  return sourceValidate.intervals.some((interval) => {
                    if (!interval || !interval.end_date) return false;

                    // Normalizar fechas para comparación
                    const intervalEndDate = interval.end_date.split("T")[0]; // Asegurar formato YYYY-MM-DD
                    return intervalEndDate < today;
                  });
                })();

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
                      Los datos estarán disponibles después de que termine el
                      primer intervalo.
                    </div>
                  );
                }

                return <Ranking />;
              })()}
            </Flex>
            <Flex
              vertical
              justify="center"
              style={{ width: "100%" }}
              gap="large"
            >
              <AvgAllGroups />
              <IntervalsTable />

              {/* Mostrar mensaje si la competencia no ha comenzado */}
              {competitionNotStarted && (
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
              )}

              {/* Mostrar tabla solo si la competencia está activa */}
              {competitionActive && (
                <Table
                  bordered
                  pagination={false}
                  dataSource={
                    sourceValidate && [
                      {
                        nombre:
                          state.user.enterprise_competition_overflow
                            .last_competence.days_remaining_interval,
                        puntos:
                          state.user.enterprise_competition_overflow
                            .last_competence.days_remaining_competence,
                        metas: 1,
                      },
                    ]
                  }
                  columns={[
                    {
                      title: (
                        <span style={{ fontSize: "12px" }}>
                          El intervalo actual finaliza en
                        </span>
                      ),
                      dataIndex: "nombre",
                      width: "50%",
                      render: (text) => (
                        <span style={{ fontSize: "15px" }}>
                          <CalendarOutlined /> {text} Días
                        </span>
                      ),
                    },
                    {
                      title: (
                        <span style={{ fontSize: "12px" }}>
                          La competencía finaliza en
                        </span>
                      ),
                      dataIndex: "puntos",
                      width: "50%",
                      render: (text) => (
                        <span style={{ fontSize: "15px" }}>
                          <CalendarTwoTone twoToneColor="rgba(10, 95, 224, 0.8)" />{" "}
                          {text} Días
                        </span>
                      ),
                    },
                  ]}
                />
              )}

              {/* Mostrar mensaje si la competencia ha terminado */}
              {competitionEnded && (
                <Alert
                  style={{
                    backgroundColor: "rgba(10, 95, 224, 0.1)",
                    border: "1px solid rgba(10, 95, 224, 0.3)",
                  }}
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
              )}
            </Flex>
          </Flex>
          <Flex gap={"large"} align="top" justify="center"></Flex>
        </Flex>
      </Col>

      <Col span={24}></Col>
    </Row>
  );
};
export default Enterpise;
