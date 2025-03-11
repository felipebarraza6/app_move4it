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
import { useLocation } from "react-router-dom";

const MyTeamActivity = ({ team_data }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  const [data, setData] = useState([]);

  const current_interval =
    state.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data.id;
  console.log(current_interval);
  console.log(team_data);
  const currentIntervalF = team_data.intervals.findIndex(
    (challenger) => challenger.interval_id === current_interval
  );

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
        (totalPercentage / dataWithPercentage.length).toFixed(0)
      ),
      ...Object.fromEntries(
        Object.entries(activityCompletionPercentages).map(([key, value]) => [
          key,
          Number(value.toFixed(0)),
        ])
      ),
    };

    setData([...dataWithPercentage, totalsRow]);
  };
  useEffect(() => {
    dataSource();
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    ...activityNames.map((activity) => ({
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
            return <Spin />;
          }
        }
        return typeof completed === "number" ? (
          `${completed.toFixed(0)}%`
        ) : completed ? (
          <CheckCircleFilled style={{ color: "green" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red" }} />
        );
      },
    })),
    {
      title: "Puntos",
      dataIndex: "points",
      key: "points",
      align: "center",
    },
    {
      title: "Efectividad",
      dataIndex: "percentage",
      key: "percentage",
      align: "center",
      render: (percentage) => `${Number(percentage).toFixed(0)}%`,
    },
  ];

  const extra = () => {
    const nextInterval = () => {
      setCurrentInterval((prevInterval) => prevInterval - 1);
    };

    const previousInterval = () => {
      setCurrentInterval((prevInterval) => prevInterval + 1);
    };

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
            disabled={currentInterval >= team_data.intervals.length - 1}
          >
            <ArrowLeftOutlined />
            <div style={{ fontSize: "10px", marginLeft: "5px" }}>
              {currentInterval < team_data.intervals.length - 1 ? (
                <>
                  <CalendarOutlined />{" "}
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
                  <CalendarFilled />{" "}
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
            disabled={currentInterval === team_data.intervals.length - 1}
          >
            <ArrowRightOutlined />
            <div style={{ fontSize: "10px", marginLeft: "5px" }}>
              {currentInterval > 0 ? (
                <>
                  <CalendarOutlined />{" "}
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
                  <CalendarFilled />{" "}
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

  return (
    <Card title="Actividad de mi equipo" style={styles.card} extra={extra()}>
      <Table bordered columns={columns} pagination={false} dataSource={data} />
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
