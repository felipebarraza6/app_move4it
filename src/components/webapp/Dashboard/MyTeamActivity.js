import React, { useContext, useState, useEffect } from "react";
import { Card, Table, Button, Flex, Tag, Spin } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CalendarFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  TrophyFilled,
} from "@ant-design/icons";
import { AppContext } from "../../../App";
import { parseDateYMDLocal, normalizeDateOnly } from "../../../utils/date";
import { useLocation } from "react-router-dom";

const MyTeamActivity = ({ team_data }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const processedData = processTeamData();
    setData(processedData);
  }, [team_data]);

  // Early return if team_data is not available
  if (!team_data) {
    console.log("MyTeamActivity: team_data is undefined");
    return (
      <Card
        title={window.innerWidth > 726 ? "Actividad de mi equipo" : <></>}
        style={{
          ...styles.card,
          marginBottom: "16px",
        }}
      >
        <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          No hay datos de equipo disponibles
        </div>
      </Card>
    );
  }

  const last_competence_end =
    state.user.enterprise_competition_overflow.last_competence.end_date;

  const active_competence = () => {
    const today = new Date().toISOString().split("T")[0];

    if (last_competence_end < today) {
      return false;
    } else {
      return true;
    }
  };

  // Process team_data which is now my_group structure
  // team_data = { "empleado1@gmail.com": [...activities], "empleado2@gmail.com": [...activities] }

  const processTeamData = () => {
    if (!team_data || typeof team_data !== "object") return [];

    // Detectar el tipo de estructura de datos
    if (team_data.data || team_data.intervals) {
      // Estructura de Team.js: historical_data con data.my_team o stats.my_team con intervals
      return processIntervalsStructure(team_data);
    } else {
      // Estructura de Dashboard.js: my_group con emails como claves
      return processMyGroupStructure(team_data);
    }
  };

  const processIntervalsStructure = (teamData) => {
    // Determinar si estamos en Team.js (mostrar intervalos anteriores) o Dashboard.js (mostrar intervalo actual)
    const isTeamPage = location.pathname === "/team";

    if (isTeamPage) {
      // En Team.js: teamData ahora es un intervalo específico seleccionado de historical_data
      if (
        !teamData ||
        !teamData.data ||
        !teamData.data.my_team ||
        !teamData.data.my_team.activities
      ) {
        return [];
      }

      // Agrupar actividades del intervalo seleccionado
      const userActivities = {};
      teamData.data.my_team.activities.forEach((activity) => {
        const email = activity.user?.email;
        if (email) {
          if (!userActivities[email]) {
            userActivities[email] = [];
          }
          userActivities[email].push(activity);
        }
      });

      // Procesar cada usuario
      return Object.keys(userActivities).map((email) => {
        const activities = userActivities[email];
        const completedActivities = activities.filter(
          (act) => act.is_completed
        ).length;
        const totalActivities = activities.length;
        const points = activities.reduce(
          (sum, act) =>
            sum + (act.is_completed ? act.activity?.points || 1 : 0),
          0
        );

        return {
          email,
          completedActivities,
          totalActivities,
          points,
          percentage:
            totalActivities > 0
              ? ((completedActivities / totalActivities) * 100).toFixed(1)
              : 0,
        };
      });
    } else {
      // En Dashboard.js: mostrar intervalo actual
      const currentIntervalData =
        state.user.enterprise_competition_overflow.last_competence.stats
          .current_interval_data;
      let currentInterval = 0; // Fallback al primer intervalo

      if (currentIntervalData && currentIntervalData.id) {
        // Buscar el índice del intervalo actual
        const intervalIndex = teamData.intervals.findIndex(
          (interval) => interval.interval_id === currentIntervalData.id
        );
        if (intervalIndex !== -1) {
          currentInterval = intervalIndex;
        }
      }

      if (
        !teamData.intervals ||
        !teamData.intervals[currentInterval] ||
        !teamData.intervals[currentInterval].my_team
      ) {
        return [];
      }

      const myTeamData = teamData.intervals[currentInterval].my_team;

      if (!myTeamData.activities || !Array.isArray(myTeamData.activities)) {
        return [];
      }

      // Agrupar actividades por usuario
      const userActivities = {};
      myTeamData.activities.forEach((activity) => {
        const email = activity.user?.email;
        if (email) {
          if (!userActivities[email]) {
            userActivities[email] = [];
          }
          userActivities[email].push(activity);
        }
      });

      // Procesar cada usuario
      return Object.keys(userActivities).map((email) => {
        const activities = userActivities[email];
        const completedActivities = activities.filter(
          (act) => act.is_completed
        ).length;
        const totalActivities = activities.length;
        const points = activities.reduce(
          (sum, act) =>
            sum + (act.is_completed ? act.activity?.points || 1 : 0),
          0
        );

        return {
          email,
          completedActivities,
          totalActivities,
          points,
          percentage:
            totalActivities > 0
              ? ((completedActivities / totalActivities) * 100).toFixed(1)
              : 0,
        };
      });
    }
  };

  const processMyGroupStructure = (teamData) => {
    // Estructura my_group: emails como claves
    const teamMembers = Object.keys(teamData);

    // Filtrar solo las claves que parecen emails (contienen @)
    const emailKeys = teamMembers.filter((key) => key.includes("@"));

    return emailKeys.map((email) => {
      const activities = teamData[email] || [];
      const activitiesArray = Array.isArray(activities) ? activities : [];
      const completedActivities = activitiesArray.filter(
        (act) => act.is_completed
      ).length;
      const totalActivities = activitiesArray.length;
      const points = activitiesArray.reduce(
        (sum, act) => sum + (act.is_completed ? act.activity?.points || 1 : 0),
        0
      );

      return {
        email,
        completedActivities,
        totalActivities,
        points,
        percentage:
          totalActivities > 0
            ? ((completedActivities / totalActivities) * 100).toFixed(1)
            : 0,
      };
    });
  };

  // Función para obtener actividades detalladas de un usuario
  const getDetailedActivities = (email) => {
    if (!team_data || !email) return [];

    // Detectar el tipo de estructura de datos
    if (team_data.data || team_data.intervals) {
      // Estructura de Team.js: historical_data con data.my_team o stats.my_team con intervals
      const isTeamPage = location.pathname === "/team";

      if (isTeamPage) {
        // En Team.js: team_data ahora es un intervalo específico seleccionado de historical_data
        if (
          team_data.data &&
          team_data.data.my_team &&
          team_data.data.my_team.activities
        ) {
          const userActivities = team_data.data.my_team.activities.filter(
            (activity) => activity.user?.email === email
          );

          return userActivities.map((activity) => ({
            activity: activity.activity?.name || activity.activity,
            is_completed: activity.is_completed,
            name: activity.activity?.name || activity.activity,
          }));
        }
        return [];
      } else {
        // En Dashboard.js: mostrar actividades del intervalo actual
        const currentIntervalData =
          state.user.enterprise_competition_overflow.last_competence.stats
            .current_interval_data;
        let currentInterval = 0;

        if (currentIntervalData && currentIntervalData.id) {
          const intervalIndex = team_data.intervals.findIndex(
            (interval) => interval.interval_id === currentIntervalData.id
          );
          if (intervalIndex !== -1) {
            currentInterval = intervalIndex;
          }
        }

        if (team_data.intervals[currentInterval]?.my_team?.activities) {
          return team_data.intervals[currentInterval].my_team.activities
            .filter((activity) => activity.user?.email === email)
            .map((activity) => ({
              activity: activity.activity?.name || activity.activity,
              is_completed: activity.is_completed,
              name: activity.activity?.name || activity.activity,
            }));
        }
      }
    } else {
      // Estructura de Dashboard.js: my_group con emails como claves
      const activities = team_data[email];
      if (Array.isArray(activities)) {
        return activities.map((activity) => ({
          activity: activity.activity || activity.name,
          is_completed: activity.is_completed,
          name: activity.activity || activity.name,
        }));
      }
    }

    return [];
  };

  // Enhanced table columns with expandable details
  const columns = [
    {
      title: "Jugador",
      dataIndex: "email",
      key: "email",
      width: "40%",
      render: (email) => {
        const isCurrentUser = email === state.user.email;
        const isTeamPage = location.pathname === "/team";

        return (
          <div
            style={{
              color:
                isCurrentUser && isTeamPage
                  ? "rgba(15,120,142,1)"
                  : "rgba(15,120,142,0.8)",
              fontWeight: isCurrentUser && isTeamPage ? "700" : "600",
              backgroundColor:
                isCurrentUser && isTeamPage
                  ? "rgba(15,120,142,0.1)"
                  : "transparent",
              padding: isCurrentUser && isTeamPage ? "4px 8px" : "0",
              borderRadius: isCurrentUser && isTeamPage ? "4px" : "0",
              border:
                isCurrentUser && isTeamPage
                  ? "1px solid rgba(15,120,142,0.3)"
                  : "none",
              wordBreak: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {window.innerWidth > 726 ? email : email.slice(0, 15)}
            {isCurrentUser && isTeamPage && " (Tú)"}
          </div>
        );
      },
    },
    {
      title: "Completadas",
      dataIndex: "completedActivities",
      key: "completedActivities",
      align: "center",
      width: "20%",
      render: (completed, record) => (
        <span
          style={{
            color:
              completed === record.totalActivities
                ? "rgba(15,120,142,0.8)"
                : "rgba(15,120,142,0.6)",
            fontWeight: "500",
          }}
        >
          {completed}/{record.totalActivities}
        </span>
      ),
    },
    {
      title: "Puntos",
      dataIndex: "points",
      key: "points",
      align: "center",
      width: "20%",
      render: (points) => (
        <span
          style={{
            color: "rgba(15,120,142,0.8)",
            fontWeight: "600",
          }}
        >
          {points}
        </span>
      ),
    },
    {
      title: "Efectividad",
      dataIndex: "percentage",
      key: "percentage",
      align: "center",
      width: "20%",
      render: (percentage) => (
        <span
          style={{
            color:
              parseFloat(percentage) >= 80
                ? "rgba(15,120,142,0.8)"
                : parseFloat(percentage) >= 50
                ? "rgba(230,184,0,0.8)"
                : "rgba(255,77,79,0.8)",
            fontWeight: "600",
          }}
        >
          {percentage}%
        </span>
      ),
    },
  ];

  const extra = () => {
    const isTeamPage = location.pathname === "/team";

    if (isTeamPage) {
      // En Team.js: mostrar fechas del intervalo seleccionado
      if (team_data && team_data.start_date && team_data.end_date) {
        const startDate = parseDateYMDLocal(team_data.start_date);
        const endDate = parseDateYMDLocal(team_data.end_date);

        return (
          <Flex gap="small" align="center">
            <CalendarFilled style={{ color: "rgba(15,120,142,0.8)" }} />
            <span style={{ fontSize: "12px", color: "#666" }}>
              {startDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {endDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </Flex>
        );
      }

      // Si no hay datos del intervalo, no mostrar fechas
      return null;
    } else {
      // En Dashboard.js: mostrar fechas del intervalo actual
      const currentIntervalData =
        state.user.enterprise_competition_overflow.last_competence.stats
          .current_interval_data;

      let startDate, endDate;

      if (
        currentIntervalData &&
        currentIntervalData.start_date &&
        currentIntervalData.end_date
      ) {
        // Usar fechas del intervalo actual
        startDate = parseDateYMDLocal(currentIntervalData.start_date);
        endDate = parseDateYMDLocal(currentIntervalData.end_date);
      } else {
        // Fallback a fechas de la competencia si no hay intervalo actual
        startDate = parseDateYMDLocal(
          state.user.enterprise_competition_overflow.last_competence.start_date
        );
        endDate = parseDateYMDLocal(
          state.user.enterprise_competition_overflow.last_competence.end_date
        );
      }

      return (
        <Flex gap="small" align="center">
          <CalendarFilled style={{ color: "rgba(15,120,142,0.8)" }} />
          <span style={{ fontSize: "12px", color: "#666" }}>
            {startDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            })}{" "}
            -{" "}
            {endDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </Flex>
      );
    }
  };

  const todayString = new Date().toISOString().split("T")[0];

  return (
    <Card
      title={window.innerWidth > 726 ? "Actividad de mi equipo" : <></>}
      style={{
        ...styles.card,
        marginBottom: "16px",
      }}
      extra={extra()}
    >
      {(() => {
        const startDate = parseDateYMDLocal(
          state.user.enterprise_competition_overflow.last_competence.start_date
        );
        const endDate = parseDateYMDLocal(
          state.user.enterprise_competition_overflow.last_competence.end_date
        );
        const today = normalizeDateOnly(new Date());

        if (today < startDate) {
          return (
            <Flex style={{ marginBottom: "8px" }}>
              <Tag color="warning">
                {`La competencia comenzará el ${startDate.toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}`}
              </Tag>
            </Flex>
          );
        } else if (today > endDate) {
          return (
            <Flex style={{ marginBottom: "8px" }}>
              <Tag
                style={{
                  backgroundColor: "rgba(15,120,142,0.1)",
                  color: "rgba(15,120,142,0.8)",
                  border: "1px solid rgba(15,120,142,0.3)",
                }}
              >
                {`La competencia terminó el ${endDate.toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}`}
              </Tag>
            </Flex>
          );
        } else {
          return (
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              rowKey="email"
              size="small"
              scroll={{ x: 600 }}
              tableLayout="fixed"
              rowClassName={(record) => {
                const isCurrentUser = record.email === state.user.email;
                const isTeamPage = location.pathname === "/team";
                return isCurrentUser && isTeamPage ? "current-user-row" : "";
              }}
              summary={() => {
                if (data.length === 0) return null;

                // Calcular totales del equipo
                const totalCompleted = data.reduce(
                  (sum, player) => sum + player.completedActivities,
                  0
                );
                const totalActivities = data.reduce(
                  (sum, player) => sum + player.totalActivities,
                  0
                );
                const totalPoints = data.reduce(
                  (sum, player) => sum + player.points,
                  0
                );
                const averageEffectiveness =
                  totalActivities > 0
                    ? ((totalCompleted / totalActivities) * 100).toFixed(1)
                    : 0;

                return (
                  <Table.Summary.Row
                    style={{
                      backgroundColor: "rgba(15,120,142,0.1)",
                      fontWeight: "600",
                      borderTop: "2px solid rgba(15,120,142,0.3)",
                    }}
                  >
                    <Table.Summary.Cell colSpan={1}>
                      <Flex align="center" gap="small">
                        <span
                          style={{
                            color: "rgba(15,120,142,0.8)",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                        >
                          Rendimiento del Equipo
                        </span>
                      </Flex>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
                    <Table.Summary.Cell align="center">
                      <div style={{ textAlign: "center" }}>
                        <span
                          style={{
                            color: "rgba(15,120,142,0.8)",
                            fontWeight: "600",
                          }}
                        >
                          {totalCompleted}/{totalActivities}
                        </span>
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align="center">
                      <div style={{ textAlign: "center" }}>
                        <span
                          style={{
                            color: "rgba(15,120,142,0.8)",
                            fontWeight: "600",
                          }}
                        >
                          {totalPoints}
                        </span>
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align="center">
                      <div style={{ textAlign: "center" }}>
                        <span
                          style={{
                            color:
                              parseFloat(averageEffectiveness) >= 80
                                ? "rgba(15,120,142,0.8)"
                                : parseFloat(averageEffectiveness) >= 50
                                ? "rgba(230,184,0,0.8)"
                                : "rgba(255,77,79,0.8)",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                        >
                          {averageEffectiveness}%
                        </span>
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
              expandable={{
                expandedRowRender: (record) => {
                  // Obtener actividades detalladas del usuario
                  const userActivities = getDetailedActivities(record.email);

                  return (
                    <div
                      style={{
                        padding: "16px",
                        background: "rgba(15,120,142,0.02)",
                      }}
                    >
                      <h4
                        style={{
                          color: "rgba(15,120,142,0.8)",
                          marginBottom: "12px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Actividades Agendadas
                      </h4>
                      {userActivities.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {userActivities.map((activity, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 12px",
                                background: activity.is_completed
                                  ? "rgba(15,120,142,0.1)"
                                  : "rgba(255,255,255,0.8)",
                                border: `1px solid ${
                                  activity.is_completed
                                    ? "rgba(15,120,142,0.3)"
                                    : "rgba(15,120,142,0.2)"
                                }`,
                                borderRadius: "6px",
                              }}
                            >
                              <span
                                style={{
                                  color: "rgba(15,120,142,0.8)",
                                  fontWeight: "500",
                                }}
                              >
                                {activity.activity ||
                                  activity.name ||
                                  "Actividad"}
                              </span>
                              <span
                                style={{
                                  color: activity.is_completed
                                    ? "rgba(15,120,142,0.8)"
                                    : "rgba(255,77,79,0.8)",
                                  fontWeight: "600",
                                  fontSize: "12px",
                                }}
                              >
                                {activity.is_completed
                                  ? "✓ Completada"
                                  : "✗ Pendiente"}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "rgba(15,120,142,0.6)",
                            fontStyle: "italic",
                            textAlign: "center",
                            padding: "20px",
                          }}
                        >
                          No hay actividades agendadas
                        </div>
                      )}
                    </div>
                  );
                },
                rowExpandable: (record) => record.email !== "Total",
              }}
            />
          );
        }
      })()}
    </Card>
  );
};

const styles = {
  card: {
    background:
      "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
    border: "1px solid rgba(15,120,142,0.2)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
    width: "100%",
  },
};

// Agregar estilos CSS para destacar la fila del usuario actual
const style = document.createElement("style");
style.textContent = `
  .current-user-row {
    background-color: rgba(15,120,142,0.08) !important;
    border-left: 3px solid rgba(15,120,142,0.6) !important;
  }
  .current-user-row:hover {
    background-color: rgba(15,120,142,0.12) !important;
  }
`;
if (!document.head.querySelector("style[data-team-user-highlight]")) {
  style.setAttribute("data-team-user-highlight", "true");
  document.head.appendChild(style);
}

export default MyTeamActivity;
