import React, { useContext, useState } from "react";
import { Row, Flex, Table, Alert, Tag, Card, Spin, Button } from "antd";
import {
  TrophyFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CalendarFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";

import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
import MyTeam from "../components/webapp/Teams/MyTeam";
import AverageMeditions from "../components/webapp/Teams/AverageMeditions";
import { parseDateYMDLocal, normalizeDateOnly } from "../utils/date";

const Team = () => {
  const { state } = useContext(AppContext);
  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState(0);

  // Usar ranking.intervals para el historial de puntos
  var rankingData =
    state.user.enterprise_competition_overflow.last_competence.ranking
      .intervals;

  // Usar historical_data para la actividad del equipo
  var teamData =
    state.user.enterprise_competition_overflow.last_competence.stats
      .historical_data;

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

  // Filtrar intervalos terminados y crear dataSource usando ranking.intervals
  var dataSource = [];
  var completedIntervals = [];
  if (rankingData && Array.isArray(rankingData)) {
    const today = new Date().toISOString().split("T")[0];
    // Solo mostrar intervalos que han terminado (end_date < today)
    completedIntervals = rankingData.filter(
      (interval) => interval.end_date < today
    );

    // Primero ordenar los intervalos completados por fecha (del más antiguo al más reciente)
    // para poder calcular correctamente las diferencias
    const sortedByDate = completedIntervals.sort((a, b) => {
      return new Date(a.end_date) - new Date(b.end_date);
    });

    // Mapear y calcular puntos por intervalo
    dataSource = sortedByDate
      .map((interval, index) => {
        // Buscar mi equipo en el ranking del intervalo
        const myTeamId = state.user.group_participation.id;
        const myTeamRanking = interval.ranking?.find(
          (team) => team.team_id === myTeamId
        );

        const puntosAcumulados = myTeamRanking?.points || 0;

        // Calcular puntos del intervalo (diferencia con el intervalo anterior)
        let puntosIntervalo = 0;
        if (index === 0) {
          // Primer intervalo: los puntos del intervalo son los puntos acumulados
          puntosIntervalo = puntosAcumulados;
        } else {
          // Intervalos siguientes: restar los puntos del intervalo anterior
          const previousTeamRanking = sortedByDate[index - 1].ranking?.find(
            (team) => team.team_id === myTeamId
          );
          const puntosAcumuladosAnterior = previousTeamRanking?.points || 0;
          puntosIntervalo = puntosAcumulados - puntosAcumuladosAnterior;
        }

        // Calcular posición en el ranking del intervalo
        const posicion = interval.ranking
          ? interval.ranking.findIndex((team) => team.team_id === myTeamId) + 1
          : 0;

        // Calcular posición anterior para comparar
        let posicionAnterior = null;
        if (index > 0 && sortedByDate[index - 1].ranking) {
          posicionAnterior =
            sortedByDate[index - 1].ranking.findIndex(
              (team) => team.team_id === myTeamId
            ) + 1;
        }

        // Determinar tendencia (subió, bajó, se mantuvo)
        let tendencia = "igual"; // 'subio', 'bajo', 'igual'
        if (posicionAnterior !== null) {
          if (posicion < posicionAnterior) {
            tendencia = "subio"; // Menor posición = mejor ranking
          } else if (posicion > posicionAnterior) {
            tendencia = "bajo";
          }
        }

        return {
          key: index,
          start_date: interval.start_date,
          end_date: interval.end_date,
          puntosIntervalo: puntosIntervalo,
          puntosAcumulados: puntosAcumulados,
          posicion: posicion,
          tendencia: tendencia,
        };
      })
      .sort((a, b) => {
        // Ordenar por fecha de fin (más reciente primero) para la visualización
        return new Date(b.end_date) - new Date(a.end_date);
      });
  }

  // Función para obtener datos del intervalo seleccionado para MyTeamActivity
  const getSelectedIntervalData = () => {
    if (!teamData || !Array.isArray(teamData)) return null;

    const today = new Date().toISOString().split("T")[0];
    const completedHistoricalIntervals = teamData.filter(
      (interval) => interval.end_date < today
    );

    if (completedHistoricalIntervals.length === 0) return null;

    // Ordenar historical_data de la misma manera que rankingData
    const sortedHistoricalIntervals = completedHistoricalIntervals.sort(
      (a, b) => {
        return new Date(b.end_date) - new Date(a.end_date);
      }
    );

    return (
      sortedHistoricalIntervals[selectedIntervalIndex] ||
      sortedHistoricalIntervals[0]
    );
  };

  const columns = [
    {
      title: "Intervalo",
      dataIndex: "key",
      render: (text) => `#${text + 1}`,
    },
    {
      title: "Fecha Inicio",
      dataIndex: "start_date",
      width: "20%",
    },
    {
      title: "Fecha Fin",
      dataIndex: "end_date",
      width: "20%",
    },
    {
      title: "Posición",
      dataIndex: "posicion",
      width: "15%",
      align: "center",
      render: (posicion, record) => {
        // Determinar color según tendencia
        let color = "rgba(0,0,0,0.8)"; // Negro por defecto (se mantuvo)
        let icon = null; // No mostrar ícono por defecto

        if (record.tendencia === "subio") {
          color = "rgba(82,196,26,0.9)"; // Verde si subió
          icon = <ArrowUpOutlined />;
        } else if (record.tendencia === "bajo") {
          color = "rgba(255,77,79,0.9)"; // Rojo si bajó
          icon = <ArrowDownOutlined />;
        }

        return (
          <Flex align="center" gap="small" justify="center">
            <span
              style={{
                color: color,
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              {posicion}°
            </span>
            {icon && (
              <span style={{ color: color, fontSize: "12px" }}>{icon}</span>
            )}
          </Flex>
        );
      },
    },
    {
      title: "Puntos Intervalo",
      dataIndex: "puntosIntervalo",
      width: "20%",
      align: "center",
      render: (text, record, index) => {
        return (
          <Flex align="center" gap="small" justify="center">
            <span
              style={{
                color: "rgba(230,184,0,0.9)",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              +{text}
            </span>
          </Flex>
        );
      },
    },
    {
      title: "Total Acumulado",
      dataIndex: "puntosAcumulados",
      width: "20%",
      align: "center",
      render: (text, record, index) => {
        return (
          <Flex align="center" gap="small" justify="center">
            <span
              style={{
                color: "rgba(15,120,142,0.8)",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              {text}
            </span>
          </Flex>
        );
      },
    },
  ];

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
            icon={<ClockCircleOutlined />}
            style={{
              marginBottom: "16px",
              backgroundColor: "rgba(230,184,0,0.1)",
              border: "1px solid rgba(230,184,0,0.3)",
            }}
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
            type="success"
            showIcon
            icon={
              <CheckCircleFilled
                style={{
                  background:
                    "linear-gradient(100deg, rgb(15, 120, 142) 0%, rgba(77, 180, 202, 0.8) 50%, rgb(60, 87, 93) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "18px",
                }}
              />
            }
            style={{
              marginBottom: "16px",
              backgroundColor: "rgba(15,120,142,0.1)",
              border: "1px solid rgba(15,120,142,0.3)",
            }}
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
            // Mostrar datos siempre, pero con navegación solo si hay intervalos completados
            if (competitionNotStarted) {
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
                  Los datos del equipo estarán disponibles cuando comience la
                  competencia.
                </div>
              );
            }

            // Si hay intervalos completados, mostrar con navegación
            if (
              completedIntervals.length > 0 &&
              teamData &&
              Array.isArray(teamData)
            ) {
              const today = new Date().toISOString().split("T")[0];
              const hasHistoricalData = teamData.some(
                (interval) => interval.end_date < today
              );

              console.log("hasHistoricalData:", hasHistoricalData);
              console.log(
                "getSelectedIntervalData():",
                getSelectedIntervalData()
              );

              if (!hasHistoricalData) {
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
                    Los datos de actividad estarán disponibles después de que
                    termine el primer intervalo.
                  </div>
                );
              }

              return (
                <div style={{ width: "100%" }}>
                  <MyTeamActivity
                    team_data={getSelectedIntervalData()}
                    navigationProps={{
                      completedIntervals: (() => {
                        if (!teamData || !Array.isArray(teamData)) return [];
                        const today = new Date().toISOString().split("T")[0];
                        const completedHistoricalIntervals = teamData.filter(
                          (interval) => interval.end_date < today
                        );
                        // Ordenar descendente: el más reciente primero (índice 0)
                        return completedHistoricalIntervals.sort((a, b) => {
                          return new Date(b.end_date) - new Date(a.end_date);
                        });
                      })(),
                      selectedIntervalIndex,
                      setSelectedIntervalIndex,
                    }}
                  />
                </div>
              );
            }

            // Si no hay intervalos completados pero la competencia está activa o terminada
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
          })()}
        </Flex>
        <Card
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "rgba(15,120,142,0.8)",
                fontWeight: "600",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TrophyFilled />
                Historial de Puntos
              </div>
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
              if (!teamData || !Array.isArray(teamData)) {
                return false;
              }

              return teamData.some((interval) => {
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
                  index === selectedIntervalIndex
                    ? "selected-interval-row"
                    : "historical-interval-row"
                }
                onRow={(record, index) => ({
                  onClick: () => setSelectedIntervalIndex(index),
                  style: {
                    cursor: "pointer",
                    backgroundColor:
                      index === selectedIntervalIndex
                        ? "rgba(15,120,142,0.1)"
                        : "transparent",
                  },
                })}
                summary={() => {
                  if (dataSource.length === 0) return null;

                  // Calcular la suma de todos los puntos por intervalo
                  const totalPuntosIntervalo = dataSource.reduce(
                    (sum, record) => sum + record.puntosIntervalo,
                    0
                  );

                  // El total acumulado es el valor más alto (último intervalo cronológicamente)
                  const totalAcumuladoFinal = Math.max(
                    ...dataSource.map((record) => record.puntosAcumulados)
                  );

                  return (
                    <Table.Summary.Row
                      style={{
                        backgroundColor: "rgba(15,120,142,0.15)",
                        fontWeight: "700",
                        borderTop: "3px solid rgba(15,120,142,0.4)",
                      }}
                    >
                      <Table.Summary.Cell colSpan={3}>
                        <span
                          style={{
                            color: "rgba(15,120,142,0.9)",
                            fontWeight: "700",
                            fontSize: "15px",
                          }}
                        >
                          TOTAL
                        </span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center">
                        {/* Celda vacía para la columna de Posición */}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center">
                        <Flex align="center" gap="small" justify="center">
                          <span
                            style={{
                              color: "rgba(230,184,0,1)",
                              fontWeight: "700",
                              fontSize: "16px",
                            }}
                          >
                            +{totalPuntosIntervalo}
                          </span>
                        </Flex>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center">
                        {/* Celda vacía para la columna de Total Acumulado */}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            );
          })()}
        </Card>
      </Flex>
    </Row>
  );
};

export default Team;
