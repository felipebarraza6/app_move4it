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
  const { state, dispatch } = useContext(AppContext);
  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState(0);

  // Lazy load stats if not already loaded
  React.useEffect(() => {
    const loadStats = async () => {
      const competence = state.user?.enterprise_competition_overflow?.last_competence;
      
      if (competence && competence.id && (!competence.stats || !competence.ranking)) {
        console.log('Loading stats/ranking for competence in Team:', competence.id);
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

  // Check if ranking and stats are loaded
  const ranking = state.user?.enterprise_competition_overflow?.last_competence?.ranking;
  const stats = state.user?.enterprise_competition_overflow?.last_competence?.stats;

  if (!ranking || !stats) {
    return (
      <Row justify="center" align="middle" style={{ padding: "50px" }}>
        <Spin size="large" tip="Cargando datos del equipo..." />
      </Row>
    );
  }

  // Usar ranking.intervals para el historial de puntos
  var rankingData = ranking.intervals;

  // Usar historical_data para la actividad del equipo
  // Note: stats from backend comes as { stats: { historical_data: ... }, ranking: ... }
  // OR as per new endpoint logic. Usually 'stats' in state has 'historical_data' directly if merged correctly.
  // Let's assume stats behaves as in ProfileUserCompetition: stats.historical_data
  var teamData = stats.historical_data;

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
      return parseDateYMDLocal(a.end_date) - parseDateYMDLocal(b.end_date);
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
        return parseDateYMDLocal(b.end_date) - parseDateYMDLocal(a.end_date);
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
        return parseDateYMDLocal(b.end_date) - parseDateYMDLocal(a.end_date);
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
                color: "rgba(18, 227, 194, 0.9)",
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
                color: "rgba(10, 95, 224, 0.8)",
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
    <div className="stagger-item delay-1">
      <Flex gap={window.innerWidth < 768 ? "small" : "large"} vertical>
        {/* Top Row: MyTeam and AverageMeditions */}
        <Flex
          gap={window.innerWidth < 768 ? "small" : "large"}
          justify="space-between"
          align="stretch"
          vertical={window.innerWidth < 900}
          className="stagger-item delay-2"
        >
          <div style={{ flex: 1, display: 'flex' }}>
            <MyTeam />
          </div>
          <div style={{ flex: 1.5, display: 'flex' }}>
            <AverageMeditions />
          </div>
        </Flex>

        {/* Status Alerts and Activity Data */}
        <div className="stagger-item delay-3">
          {competitionNotStarted ? (
            <Card
              title={
                <span style={{ color: "#0A5FE0", fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                  Actividad del equipo
                </span>
              }
              className="premium-card"
            >
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "20px",
                  color: "rgba(10, 95, 224, 0.6)",
                  fontSize: "14px",
                  fontStyle: "italic",
                }}
              >
                Los datos del equipo estarán disponibles cuando comience la competencia.
              </div>
            </Card>
          ) : (
            <div className="stagger-item delay-4">
              <MyTeamActivity
                team_data={
                  teamData && teamData[selectedIntervalIndex]
                    ? teamData[selectedIntervalIndex]
                    : null
                }
                navigationProps={{
                  completedIntervals: (() => {
                    if (!teamData || !Array.isArray(teamData)) return [];
                    const today = new Date().toISOString().split("T")[0];
                    const completedHistoricalIntervals = teamData.filter(
                      (interval) => interval.end_date < today
                    );
                    return completedHistoricalIntervals.sort((a, b) => {
                      return (
                        parseDateYMDLocal(b.end_date) -
                        parseDateYMDLocal(a.end_date)
                      );
                    });
                  })(),
                  selectedIntervalIndex,
                  setSelectedIntervalIndex,
                }}
              />
            </div>
          )}
        </div>

        {/* End of Competition Alert (Conditional) */}
        {competitionEnded && (
          <div className="stagger-item delay-5">
            <Alert
              message={`La competencia terminó el ${endDate.toLocaleDateString(
                "es-ES",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}`}
              description="Revisa el historial de participación del equipo."
              type="success"
              showIcon
              icon={<CheckCircleFilled style={{ color: "rgba(18, 227, 194,1)" }} />}
              style={{
                backgroundColor: "rgba(10, 95, 224, 0.1)",
                border: "1px solid rgba(10, 95, 224, 0.3)",
                borderRadius: "12px",
              }}
            />
          </div>
        )}

        {/* Bottom Card: Historial de Puntos */}
        <div className="stagger-item delay-5">
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "rgba(10, 95, 224, 0.8)",
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
                "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
              border: "1px solid rgba(10, 95, 224, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
            }}
          >
            {(() => {
              const hasCompletedIntervals = dataSource.length > 0;

              if (!hasCompletedIntervals) {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 20px",
                      color: "rgba(10, 95, 224, 0.6)",
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
                          ? "rgba(10, 95, 224, 0.1)"
                          : "transparent",
                    },
                  })}
                  summary={() => {
                    if (dataSource.length === 0) return null;

                    const totalPuntosIntervalo = dataSource.reduce(
                      (sum, record) => sum + record.puntosIntervalo,
                      0
                    );

                    return (
                      <Table.Summary.Row
                        style={{
                          backgroundColor: "rgba(10, 95, 224, 0.15)",
                          fontWeight: "700",
                          borderTop: "3px solid rgba(10, 95, 224, 0.4)",
                        }}
                      >
                        <Table.Summary.Cell colSpan={3}>
                          <span
                            style={{
                              color: "rgba(10, 95, 224, 0.9)",
                              fontWeight: "700",
                              fontSize: "15px",
                            }}
                          >
                            TOTAL
                          </span>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align="center" />
                        <Table.Summary.Cell align="center">
                          <Flex align="center" gap="small" justify="center">
                            <span
                              style={{
                                color: "rgba(18, 227, 194,1)",
                                fontWeight: "700",
                                fontSize: "16px",
                              }}
                            >
                              +{totalPuntosIntervalo}
                            </span>
                          </Flex>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align="center" />
                      </Table.Summary.Row>
                    );
                  }}
                />
              );
            })()}
          </Card>
        </div>
      </Flex>
    </div>
  );
};

export default Team;
