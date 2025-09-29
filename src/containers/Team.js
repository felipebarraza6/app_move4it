import React, { useContext } from "react";
import { Row, Flex, Table, Alert, Tag } from "antd";

import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
import MyTeam from "../components/webapp/Teams/MyTeam";
import AverageMeditions from "../components/webapp/Teams/AverageMeditions";
import { parseDateYMDLocal, normalizeDateOnly } from "../utils/date";

const Team = () => {
  const { state } = useContext(AppContext);

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

  if (teamData && teamData.intervals) {
    teamData.intervals = teamData.intervals.filter(
      (interval) => new Date(interval.start_date) <= today
    );
  }
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
    { title: "Puntos", dataIndex: "points" },
  ];

  let totalPoints = 0;
  if (teamData && teamData.intervals) {
    teamData.intervals.slice(1).forEach((interval) => {
      totalPoints += interval.points;
    });
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
          <MyTeamActivity team_data={teamData} />
        </Flex>
        <Table
          title={() => "Historial de Puntos"}
          style={{
            width: window.innerWidth > 900 ? "100%" : "100%",
            margin: "0 auto",
          }}
          bordered
          dataSource={
            teamData
              ? active_competence()
                ? teamData.intervals.slice(1)
                : teamData.intervals
              : []
          }
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
