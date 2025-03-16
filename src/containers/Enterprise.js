import React, { useContext } from "react";
import { Typography, Row, Col, Flex, Table } from "antd";
import { CalendarOutlined, CalendarTwoTone } from "@ant-design/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Area } from "@ant-design/plots";
import Ranking from "../components/webapp/Competence/Ranking";
import AvgAllGroups from "../components/webapp/Competence/AvgAllGroups";
import IntervalsTable from "../components/webapp/Competence/IntervalsTable";
import { AppContext } from "../App";
import "react-circular-progressbar/dist/styles.css";

const { Title } = Typography;

const Enterpise = () => {
  const config = {
    data: [
      { Date: "2020-01-01", scales: 2 },
      { Date: "2020-01-02", scales: 5 },
      { Date: "2020-01-03", scales: 8 },
      { Date: "2020-01-04", scales: 12 },
      { Date: "2020-01-05", scales: 3 },
      { Date: "2020-01-06", scales: 7 },
      { Date: "2020-01-07", scales: 2 },
      { Date: "2020-01-08", scales: 5 },
      { Date: "2020-01-09", scales: 8 },
      { Date: "2020-01-10", scales: 12 },
      { Date: "2020-01-11", scales: 3 },
      { Date: "2020-01-12", scales: 7 },
    ],
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
    },
    animation: false,
    slider: {
      start: 0.1,
      end: 30,
      trendCfg: {
        isArea: true,
      },
    },
  };

  const { state } = useContext(AppContext);
  const sourceValidate =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team;

  return (
    <Row justify={"space-between"} align="top">
      <Col xs={24} xl={24} style={{ paddingRight: "10px" }}>
        <Flex gap={"large"} align="top" justify="space-between" vertical>
          <Flex
            style={{ width: "100%" }}
            gap={"large"}
            align="top"
            vertical={window.innerWidth > 900 ? false : true}
          >
            <Flex align="top" style={{ width: "400px" }}>
              <Ranking />
            </Flex>
            <Flex
              vertical
              justify="center"
              style={{ width: "100%" }}
              gap="large"
            >
              <AvgAllGroups />
              <IntervalsTable />

              <Table
                bordered
                pagination={false}
                dataSource={
                  sourceValidate && [
                    {
                      nombre:
                        state.user.enterprise_competition_overflow
                          .last_competence.days_remaining_interval,
                      puntos:
                        state.user.enterprise_competition_overflow
                          .last_competence.days_remaining_competence,
                      metas: 1,
                    },
                  ]
                }
                columns={[
                  {
                    title: (
                      <span style={{ fontSize: "12px" }}>
                        El intervalo actual finaliza en
                      </span>
                    ),
                    dataIndex: "nombre",
                    width: "50%",
                    render: (text) => (
                      <span style={{ fontSize: "15px" }}>
                        <CalendarOutlined /> {text} Días
                      </span>
                    ),
                  },
                  {
                    title: (
                      <span style={{ fontSize: "12px" }}>
                        La competencía finaliza en
                      </span>
                    ),
                    dataIndex: "puntos",
                    width: "50%",
                    render: (text) => (
                      <span style={{ fontSize: "15px" }}>
                        <CalendarTwoTone /> {text} Días
                      </span>
                    ),
                  },
                ]}
              />
            </Flex>
          </Flex>
          <Flex gap={"large"} align="top" justify="center"></Flex>
        </Flex>
      </Col>

      <Col span={24}></Col>
    </Row>
  );
};
export default Enterpise;
