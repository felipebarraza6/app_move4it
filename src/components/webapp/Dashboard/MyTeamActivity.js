import React from "react";
import { Card, Table, Spin } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const MyTeamActivity = ({ team_data }) => {
  const data = Object.entries(team_data.my_group).map(([email, activities]) => {
    const activityStatus = activities.reduce((acc, activity) => {
      console.log(activity);
      if (activity.is_load) {
        acc[activity.activity] = <Spin size="small" />;
      } else {
        acc[activity.activity] = activity.is_completed ? (
          <CheckCircleFilled style={{ color: "green" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red" }} />
        );
      }
      return acc;
    }, {});
    return { email, ...activityStatus };
  });

  const activityNames = Array.from(
    new Set(
      Object.values(team_data.my_group)
        .flat()
        .map((activity) => activity.activity)
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
    })),
  ];

  return (
    <Card
      title="Actividad de mi equipo"
      style={styles.card}
      extra={`${team_data.start_date} / ${team_data.end_date}`}
    >
      <Table bordered dataSource={data} columns={columns} pagination={false} />
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
