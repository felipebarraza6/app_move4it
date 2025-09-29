import React, { useContext, useState, useEffect } from "react";
import { Card, Table, Button, Flex, Tag, Spin } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CalendarFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { AppContext } from "../../../App";
import { parseDateYMDLocal, normalizeDateOnly } from "../../../utils/date";
import { useLocation } from "react-router-dom";
import { render } from "@testing-library/react";

const MyTeamActivity = ({ team_data }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  const [data, setData] = useState([]);

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

  var current_interval =
    state.user.enterprise_competition_overflow.last_competence.stats
      ?.current_interval_data?.id;

  let currentIntervalF = [];

  if (current_interval) {
    currentIntervalF = team_data.intervals.findIndex(
      (challenger) => challenger.interval_id === current_interval
    );
  } else {
    if (!active_competence()) {
      console.log("=== DEBUG MYTEAMACTIVITY ===");
      console.log("team_data:", team_data);
      console.log("team_data type:", typeof team_data);
      console.log("team_data.intervals:", team_data?.intervals);
      console.log("=== FIN DEBUG MYTEAMACTIVITY ===");
      currentIntervalF = 0;
      current_interval = 0;
    }
  }

  const [currentInterval, setCurrentInterval] = useState(currentIntervalF);
  const dataSource = () => {
    if (
      !team_data ||
      !team_data.intervals ||
      !team_data.intervals[currentInterval] ||
      !team_data.intervals[currentInterval].activities ||
      !team_data.intervals[currentInterval].activities.length
    ) {
      setData([]);
      return;
    }

    // Filtrar intervalos futuros
    const todayString = new Date().toISOString().split("T")[0];
    const validIntervals = team_data.intervals.filter(
      (interval) => interval.start_date <= todayString
    );

    if (currentInterval >= validIntervals.length) {
      setData([]);
      return;
    }

    const participants = team_data.intervals[currentInterval].activities.reduce(
      (acc, activity) => {
        const user = activity.user.email;
        if (!acc[user]) {
          acc[user] = {
            email: user,
            points: 0,
            completedActivities: 0,
            totalActivities: 0,
          };
        }
        acc[user][activity.activity.name] = activity.is_completed;
        acc[user].points += activity.is_completed
          ? activity.activity.points
          : 0;
        acc[user].completedActivities += activity.is_completed ? 1 : 0;
        acc[user].totalActivities += 1;
        return acc;
      },
      {}
    );

    const participantsCount =
      team_data.intervals[currentInterval].participants_count;
    const dataWithPercentage = Object.values(participants).map(
      (participant) => ({
        ...participant,
        points: participant.points / participantsCount,
        percentage:
          (participant.completedActivities / participant.totalActivities) * 100,
      })
    );

    // Calculate totals
    const totalPoints = dataWithPercentage.reduce(
      (sum, participant) => sum + participant.points,
      0
    );
    const totalPercentage = dataWithPercentage.reduce(
      (sum, participant) => sum + participant.percentage,
      0
    );

    // Calculate activity completion percentages
    const activityCompletionPercentages = activityNames.reduce(
      (acc, activity) => {
        const completedCount = team_data.intervals[
          currentInterval
        ]?.activities?.filter(
          (act) => act.activity.name === activity && act.is_completed
        ).length;
        const totalCount = team_data.intervals[
          currentInterval
        ]?.activities?.filter((act) => act.activity.name === activity).length;
        acc[activity] = (completedCount / totalCount) * 100;
        return acc;
      },
      {}
    );

    // Add totals row
    const totalsRow = {
      email: "Total",
      points: totalPoints,
      percentage: Number(
        (totalPercentage / dataWithPercentage.length).toFixed(2)
      ),
      ...Object.fromEntries(
        Object.entries(activityCompletionPercentages).map(([key, value]) => [
          key,
          Number(value.toFixed(2)),
        ])
      ),
    };

    setData([...dataWithPercentage, totalsRow]);
  };
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  useEffect(() => {
    dataSource();

    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [team_data, currentInterval]);

  if (!team_data || !team_data.intervals || team_data.intervals.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  const activityNames = Array.from(
    new Set(
      team_data.intervals[currentInterval]?.activities?.map(
        (activity) => activity.activity.name
      ) || []
    )
  );

  const columns = [
    {
      title: "Jugador",
      key: "email",
      align: "center",
      render: (record) => (
        <div>
          {record.email === "Total" ? (
            <strong>{record.email}</strong>
          ) : record.email.length > 12 ? (
            record.email.slice(0, 12) + "..."
          ) : (
            record.email.slice(0, 12)
          )}
        </div>
      ),
    },
    ...activityNames.map((activity) => ({
      hidden: window.innerWidth < 726 && true,
      title: activity,
      dataIndex: activity,
      key: activity,
      align: "center",
      render: (completed, record) => {
        const activityData = team_data.intervals[
          currentInterval
        ]?.activities?.find(
          (act) =>
            act.user.email === record.email && act.activity.name === activity
        );
        if (activityData) {
          if (!activityData.is_completed && activityData.is_load) {
            if (activityData.interval.end_date < todayString) {
              return <CloseCircleFilled style={{ color: "red" }} />;
            }
            return <Spin />;
          }
        }
        return typeof completed === "number" ? (
          `${completed.toFixed(2)}%`
        ) : completed ? (
          <CheckCircleFilled style={{ color: "green" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red" }} />
        );
      },
    })),
    {
      title: !isMobile ? "Puntos" : "Pts",
      dataIndex: "points",
      key: "points",
      align: "center",
      render: (points) => points.toFixed(2),
    },
    {
      title: !isMobile && "Efectividad",
      dataIndex: "percentage",
      key: "percentage",
      align: "center",

      render: (percentage) => `${Number(percentage).toFixed(2)}%`,
    },
  ];

  const extra = () => {
    const nextInterval = () => {
      setCurrentInterval((prevInterval) => prevInterval - 1);
    };

    const previousInterval = () => {
      setCurrentInterval((prevInterval) => prevInterval + 1);
    };

    const todayString = new Date().toISOString().split("T")[0];

    return (
      <Flex
        gap="small"
        align="end"
        style={{
          marginTop: "5px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "15px",
        }}
      >
        {location.pathname === "/team" && (
          <Button
            shape="round"
            type="default"
            onClick={previousInterval}
            disabled={
              currentInterval >=
              team_data.intervals.filter(
                (interval) => interval.start_date <= todayString
              ).length -
                1
            }
          >
            <ArrowLeftOutlined />
            <div style={{ fontSize: "10px", marginLeft: "5px" }}>
              {currentInterval < team_data.intervals.length - 1 ? (
                <>
                  {new Date(
                    new Date(
                      team_data.intervals[currentInterval + 1]?.start_date
                    ).setDate(
                      new Date(
                        team_data.intervals[currentInterval + 1]?.start_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}
                  <br />
                  {new Date(
                    new Date(
                      team_data.intervals[currentInterval + 1]?.end_date
                    ).setDate(
                      new Date(
                        team_data.intervals[currentInterval + 1]?.end_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}
                </>
              ) : (
                <>
                  dd-m
                  <br />
                  dd-m
                </>
              )}
            </div>
          </Button>
        )}

        <div
          size="small"
          style={{
            fontSize: "12px",
            backgroundColor: "#1677ff",
            padding: "5px",
            borderRadius: "15px",
            color: "white",
            fontWeight: "500",
          }}
        >
          <center>
            <CalendarOutlined style={{ textAlign: "center" }} />
          </center>
          {new Date(
            new Date(team_data.intervals[currentInterval]?.start_date).setDate(
              new Date(
                team_data.intervals[currentInterval]?.start_date
              ).getDate() + 1
            )
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          })}
          <br />
          {new Date(
            new Date(team_data.intervals[currentInterval]?.end_date).setDate(
              new Date(
                team_data.intervals[currentInterval]?.end_date
              ).getDate() + 1
            )
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          })}
        </div>

        {location.pathname === "/team" && (
          <Button
            shape="round"
            type="default"
            onClick={nextInterval}
            disabled={currentInterval === 0}
          >
            <ArrowRightOutlined />
            <div style={{ fontSize: "10px", marginLeft: "5px" }}>
              {currentInterval > 0 ? (
                <>
                  {new Date(
                    new Date(
                      team_data.intervals[currentInterval - 1]?.start_date
                    ).setDate(
                      new Date(
                        team_data.intervals[currentInterval - 1]?.start_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}
                  <br />
                  {new Date(
                    new Date(
                      team_data.intervals[currentInterval - 1]?.end_date
                    ).setDate(
                      new Date(
                        team_data.intervals[currentInterval - 1]?.end_date
                      ).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })}
                </>
              ) : (
                <>
                  dd-m
                  <br />
                  dd-m
                </>
              )}
            </div>
          </Button>
        )}
      </Flex>
    );
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
              <Tag color="orange">
                {`La competencia comenzará el ${startDate.toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}`}
              </Tag>
            </Flex>
          );
        } else if (today > endDate) {
          return (
            <Flex style={{ marginBottom: "8px" }}>
              <Tag color="blue">
                {`La competencia terminó el ${endDate.toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}`}
              </Tag>
            </Flex>
          );
        }
        return null;
      })()}
      <Table
        size="small"
        bordered
        columns={columns}
        expandable={
          isMobile
            ? {
                expandedRowKeys: expandedRows,
                onExpandedRowsChange: (newExpandedRows) => {
                  setExpandedRows(newExpandedRows);
                },
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>
                    {activityNames.map((activity) => (
                      <div key={activity} style={{ marginBottom: "10px" }}>
                        <strong>{activity}: </strong>
                        {(() => {
                          const activityData = team_data.intervals[
                            currentInterval
                          ]?.activities?.find(
                            (act) =>
                              act.user.email === record.email &&
                              act.activity.name === activity
                          );

                          if (activityData) {
                            if (
                              !activityData.is_completed &&
                              activityData.is_load
                            ) {
                              console.log(activityData);
                              if (
                                activityData.interval.end_date < todayString
                              ) {
                                return (
                                  <CloseCircleFilled style={{ color: "red" }} />
                                );
                              }
                              return <Spin />;
                            }
                            return activityData.is_completed ? (
                              <CheckCircleFilled style={{ color: "green" }} />
                            ) : (
                              <CloseCircleFilled style={{ color: "red" }} />
                            );
                          }
                          return null;
                        })()}
                      </div>
                    ))}
                    {console.log(record)}
                  </p>
                ),
                rowExpandable: (record) => record.email !== "Total",
              }
            : false
        }
        pagination={false}
        rowKey={(record) => record.email}
        dataSource={data}
      />
    </Card>
  );
};

const styles = {
  card: {
    background:
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
    width: "100%",
  },
};

export default MyTeamActivity;
