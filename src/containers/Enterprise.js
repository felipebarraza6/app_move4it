import React, { useContext } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Tag,
  Statistic,
  Flex,
  Table,
  Button,
  Select,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
  const dataSource = [
    { numero: 1, equipo: "Equipo1", puntos: "100005" },
    { numero: 2, equipo: "Equipo2", puntos: "100004" },
    { numero: 3, equipo: "Equipo3", puntos: "100003" },
    { numero: 4, equipo: "Equipo4", puntos: "100002" },
    { numero: 5, equipo: "Equipo5", puntos: "100001", star: true },
    { numero: 6, equipo: "Equipo6", puntos: "10000" },
    { numero: 7, equipo: "Equipo7", puntos: "1000" },
    { numero: 8, equipo: "Equipo8", puntos: "100" },
    { numero: 9, equipo: "Equipo9", puntos: "10" },
    { numero: 10, equipo: "Equipo10", puntos: "1" },
  ];

  const { state } = useContext(AppContext);

  return (
    <Row justify={"space-between"} align="top">
      <Col xs={24} xl={24} style={{ paddingRight: "10px" }}>
        <Flex gap={"large"} align="top" justify="space-between" vertical>
          <Flex style={{ width: "100%" }} gap={"large"} align="top">
            <Flex align="top" style={{ width: "400px" }}>
              <Ranking />
            </Flex>
            <Flex vertical style={{ width: "100%" }} gap="large">
              <AvgAllGroups />
              <IntervalsTable />
            </Flex>
          </Flex>
          <Flex gap={"large"} align="top" justify="center">
            <Table
              bordered
              style={{ width: window.innerWidth > 900 ? "50%" : "100%" }}
              pagination={false}
              dataSource={[
                {
                  nombre:
                    state.user.enterprise_competition_overflow.last_competence
                      .days_remaining_interval,
                  puntos:
                    state.user.enterprise_competition_overflow.last_competence
                      .days_remaining_competence,
                  metas: 1,
                },
              ]}
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
                    <span style={{ fontSize: "15px" }}>{text} Días</span>
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
                    <span style={{ fontSize: "15px" }}>{text} Días</span>
                  ),
                },
              ]}
            />
          </Flex>
        </Flex>
      </Col>

      <Col span={24}>
        <center></center>
      </Col>
    </Row>
  );
};

const styles = {
  circlePro: buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "butt",

    // Text size
    textSize: "16px",

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `#001529`,
    textColor: "#001529",
    backgroundColor: "#3e98c7",
  }),
  card: {
    marginBottom: "10px",
    backgroundColor: "#001529",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  cardS: {
    backgroundColor: "#001529",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  static: {
    backgroundColor: "#001529",
    borderRadius: "10px",
    width: "140px",
    padding: "10px",
    marginBottom: "10px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  cardS2: {
    backgroundColor: "#001529",

    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  card2: {
    marginBottom: "10px",
    backgroundColor: "#001529",
    paddingBottom: "20px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  cardC: {
    backgroundColor: "#001529",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Enterpise;
