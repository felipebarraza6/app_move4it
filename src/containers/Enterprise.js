import React, { useContext } from "react";
import { Row, Col, Flex, Table, Alert } from "antd";
import { CalendarOutlined, CalendarTwoTone } from "@ant-design/icons";
import Ranking from "../components/webapp/Competence/Ranking";
import AvgAllGroups from "../components/webapp/Competence/AvgAllGroups";
import IntervalsTable from "../components/webapp/Competence/IntervalsTable";
import { AppContext } from "../App";
import { parseDateYMDLocal, normalizeDateOnly } from "../utils/date";

const Enterpise = () => {
  const { state } = useContext(AppContext);
  const sourceValidate =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team;

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
                        color: "rgba(15,120,142,0.6)",
                        fontSize: "14px",
                        fontStyle: "italic",
                        background:
                          "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
                        border: "1px solid rgba(15,120,142,0.2)",
                        borderRadius: "16px",
                        boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
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
                          <CalendarTwoTone twoToneColor="rgba(15,120,142,0.8)" />{" "}
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
                  message={`La competencia terminó el ${endDate.toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                  description="Revisa el resumen y resultados finales disponibles."
                  type="info"
                  showIcon
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
