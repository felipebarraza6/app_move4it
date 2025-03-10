import React, { useContext } from "react";
import { Row, Flex, Table } from "antd";

import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
import MyTeam from "../components/webapp/Teams/MyTeam";
import AverageMeditions from "../components/webapp/Teams/AverageMeditions";

const Team = () => {
  const { state } = useContext(AppContext);

  const teamData =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team;
  var dataSource = [];
  if (dataSource.length > 0) {
    dataSource = teamData.intervals.map((interval, index) => ({
      key: index,
      start_date: interval.start_date,
      end_date: interval.end_date,
      puntos: interval.points,
    }));
  }

  const columns = [
    { title: "Fecha Inicio", dataIndex: "start_date" },
    { title: "Fecha Fin", dataIndex: "end_date" },
    { title: "Puntos", dataIndex: "puntos" },
  ];

  const totalPoints = dataSource.reduce(
    (total, record) => total + record.puntos,
    0
  );

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
        <Flex gap="large" justify="space-between" align="middle">
          <MyTeam />
          <AverageMeditions />
        </Flex>
        <Flex>
          <MyTeamActivity team_data={teamData} />
        </Flex>
        <Table
          title={() => "Historial de Puntos"}
          style={{
            width: window.innerWidth > 900 ? "50%" : "100%",
            margin: "0 auto",
          }}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={2}>Total</Table.Summary.Cell>
              <Table.Summary.Cell>{totalPoints}</Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Flex>
    </Row>
  );
};

export default Team;
