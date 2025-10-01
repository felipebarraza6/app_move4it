import React, { useContext } from "react";
import { Row, Flex, Table, Alert, Tag, Card, Spin } from "antd";
import { TrophyFilled } from "@ant-design/icons";

import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
import MyTeam from "../components/webapp/Teams/MyTeam";
import AverageMeditions from "../components/webapp/Teams/AverageMeditions";
import { parseDateYMDLocal, normalizeDateOnly } from "../utils/date";

const Team = () => {
  const { state } = useContext(AppContext);

  // Usar my_team para obtener datos de todos los intervalos
  var teamData =
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

  const active_competence = () => {
    return competitionActive;
  };

  // Filtrar intervalos futuros y crear dataSource
  var dataSource = [];
  if (teamData && teamData.intervals) {
    const today = new Date().toISOString().split("T")[0];
    const validIntervals = teamData.intervals.filter(
      (interval) => interval.start_date <= today
    );

    dataSource = validIntervals.map((interval, index) => ({
      key: index,
      start_date: interval.start_date,
      end_date: interval.end_date,
      puntos: interval.points || 0,
    }));
  }

  const columns = [
    { title: "Fecha Inicio", dataIndex: "start_date" },
    { title: "Fecha Fin", dataIndex: "end_date" },
    {
      title: "Puntos",
      dataIndex: "points",
      render: (text, record, index) => {
        const isCurrentInterval = index === 0; // El primer intervalo es el actual
        return (
          <Flex align="center" gap="small">
            {isCurrentInterval && (
              <Spin size="small" style={{ color: "rgba(15,120,142,0.8)" }} />
            )}
            {text}
          </Flex>
        );
      },
    },
  ];

  let totalPoints = 0;
  if (teamData && teamData.intervals) {
    const today = new Date().toISOString().split("T")[0];
    const validIntervals = teamData.intervals.filter(
      (interval) => interval.start_date <= today
    );
    totalPoints = validIntervals.reduce(
      (sum, interval) => sum + (interval.points || 0),
      0
    );
  }
  return (
    <Row
      justify={window.innerWidth > 900 ? "space-between" : "center"}
      align="middle"
    >
      <Flex
        justify="space-between"
        align="middle"
        gap="large"
        style={{ width: "100%" }}
        vertical
      >
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
            description="Los datos del equipo estarán disponibles cuando comience la competencia."
            type="warning"
            showIcon
            style={{ marginBottom: "16px" }}
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
            style={{ marginBottom: "16px" }}
          />
        )}

        <Flex
          gap="large"
          justify="space-between"
          align="middle"
          vertical={window.innerWidth > 900 ? false : true}
        >
          <MyTeam />
          <AverageMeditions />
        </Flex>
        <Flex>
          {(() => {
            const today = new Date().toISOString().split("T")[0];
            const hasCompletedIntervals = (() => {
              if (
                !teamData ||
                !teamData.intervals ||
                !Array.isArray(teamData.intervals)
              ) {
                return false;
              }

              return teamData.intervals.some((interval) => {
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
                  Los datos estarán disponibles después de que termine el primer
                  intervalo.
                </div>
              );
            }

            return <MyTeamActivity team_data={teamData} />;
          })()}
        </Flex>
        <Card
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(15,120,142,0.8)",
                fontWeight: "600",
              }}
            >
              <TrophyFilled />
              Historial de Puntos
            </div>
          }
          style={{
            background:
              "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
            border: "1px solid rgba(15,120,142,0.2)",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
            marginTop: "16px",
          }}
        >
          {(() => {
            const today = new Date().toISOString().split("T")[0];
            const hasCompletedIntervals = (() => {
              if (
                !teamData ||
                !teamData.intervals ||
                !Array.isArray(teamData.intervals)
              ) {
                return false;
              }

              return teamData.intervals.some((interval) => {
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
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "rgba(15,120,142,0.6)",
                    fontSize: "14px",
                    fontStyle: "italic",
                  }}
                >
                  Los datos estarán disponibles después de que termine el primer
                  intervalo.
                </div>
              );
            }

            return (
              <Table
                style={{
                  width: "100%",
                }}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="middle"
                rowClassName={(record, index) =>
                  index === 0
                    ? "current-interval-row"
                    : "historical-interval-row"
                }
                summary={() => (
                  <Table.Summary.Row
                    style={{
                      backgroundColor: "rgba(15,120,142,0.1)",
                      fontWeight: "600",
                    }}
                  >
                    <Table.Summary.Cell colSpan={2}>
                      <span style={{ color: "rgba(15,120,142,0.8)" }}>
                        Total
                      </span>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <span style={{ color: "rgba(15,120,142,0.8)" }}>
                        {totalPoints}
                      </span>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            );
          })()}
        </Card>
      </Flex>
    </Row>
  );
};

export default Team;
