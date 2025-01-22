import React, { useContext } from "react";
import { Table, Typography } from "antd";
import { AppContext } from "../../../App";
const { Text } = Typography;

const Ranking = () => {
  const { state } = useContext(AppContext);
  const teams =
    state.user.enterprise_competition_overflow.last_competence.stats.teams;
  const columns = [
    {
      title: "#",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Equipo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Puntos",
      dataIndex: "points",
      key: "points",
    },
  ];

  const data = teams.map((team, index) => ({
    key: index,
    position: index + 1,
    name: team.name,
    points: team.points,
  }));

  return (
    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={data}
      pagination={false}
      title={() => <Text style={{ fontSize: "20px" }}>Ranking</Text>}
      scroll={{ x: "100%" }}
      style={{ width: "100%", top: "0" }}
    />
  );
};

export default Ranking;
