import React, { useContext } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Tag,
  Statistic,
  Table,
  Button,
  Select,
} from "antd";
import {
  PlusCircleFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  TeamOutlined,
  RiseOutlined,
  FallOutlined,
  LineChartOutlined,
  ClockCircleFilled,
  DownCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Area } from "@ant-design/plots";
import MyTeamActivity from "../components/webapp/Dashboard/MyTeamActivity";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";

const { Title, Paragraph } = Typography;

const Team = () => {
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

  return (
    <Row
      justify={window.innerWidth > 900 ? "space-between" : "center"}
      align="middle"
    >
      <Col
        xl={7}
        xs={24}
        style={{ paddingRight: window.innerWidth > 900 && "10px" }}
      >
        <Card style={{ width: "100%", ...styles.card }} hoverable>
          <Title level={2} style={{ color: "white" }}>
            equipo
          </Title>
          <Tag color="blue">Puntaje: -</Tag>
          <Tag color="blue">Ranking: -</Tag>
          <Tag color="geekblue-inverse" style={{ marginTop: "10px" }}>
            empresa
          </Tag>
        </Card>
      </Col>
      <Col xs={24} xl={17}>
        {window.innerWidth > 900 ? (
          <Row justify={"space-between"} align={"middle"}>
            <Col xs={12} xl={5} style={{ paddingRight: "5px" }}>
              <Statistic
                value={0.0}
                precision={2}
                style={styles.static}
                title={
                  <Title
                    style={{ color: "white", marginTop: "-5px" }}
                    level={4}
                  >
                    <RiseOutlined style={{ marginRight: "5px" }} /> Estatura
                  </Title>
                }
                valueStyle={styles.cardS}
                suffix="m"
              />
            </Col>
            <Col xs={12} xl={5}>
              <Statistic
                value={0}
                precision={1}
                style={styles.static}
                title={
                  <Title
                    style={{ color: "white", marginTop: "-5px" }}
                    level={4}
                  >
                    <FallOutlined style={{ marginRight: "5px" }} />% Grasa
                  </Title>
                }
                valueStyle={styles.cardS}
                suffix="%"
              />
            </Col>
            <Col xs={12} xl={5} style={{ paddingRight: "5px" }}>
              <Statistic
                value={0}
                precision={1}
                style={styles.static}
                title={
                  <Title
                    style={{ color: "white", marginTop: "-5px" }}
                    level={4}
                  >
                    <RiseOutlined style={{ marginRight: "5px" }} />
                    Peso
                  </Title>
                }
                valueStyle={styles.cardS}
                suffix="kg"
              />
            </Col>
            <Col xs={12} xl={6}>
              <center>
                <Card style={{ ...styles.cardC, width: "100%" }} hoverable>
                  <UserOutlined
                    style={{
                      color: "white",
                      fontSize: window.innerWidth > 900 ? "100px" : "40px",
                    }}
                  />
                </Card>
              </center>
            </Col>
          </Row>
        ) : (
          <Row justify={"space-between"} align={"middle"}>
            <Col
              xs={12}
              xl={5}
              style={{ paddingRight: window.innerWidth > 900 && "5px" }}
            >
              <Statistic
                value={1.7}
                precision={2}
                style={styles.static}
                title={
                  <Title
                    style={{ color: "white", marginTop: "-5px" }}
                    level={4}
                  >
                    <RiseOutlined style={{ marginRight: "5px" }} />
                    Estatura
                  </Title>
                }
                valueStyle={styles.cardS}
                suffix="m"
              />

              <Statistic
                value={78}
                precision={1}
                style={styles.static}
                title={
                  <Title
                    style={{ color: "white", marginTop: "-5px" }}
                    level={4}
                  >
                    <RiseOutlined style={{ marginRight: "5px" }} />
                    Peso
                  </Title>
                }
                valueStyle={styles.cardS}
                suffix="kg"
              />
              <Statistic
                value={23}
                precision={1}
                style={styles.static}
                title={
                  <Title
                    style={{ color: "white", marginTop: "-5px" }}
                    level={4}
                  >
                    <FallOutlined style={{ marginRight: "5px" }} />% Grasa
                  </Title>
                }
                valueStyle={styles.cardS}
                suffix="%"
              />
            </Col>

            <Col xs={12} xl={5} style={{ paddingLeft: "10px" }}>
              <center>
                <Card style={{ ...styles.cardC, width: "100%" }} hoverable>
                  <UserOutlined
                    style={{
                      color: "white",
                      fontSize: window.innerWidth > 900 ? "100px" : "60px",
                    }}
                  />
                </Card>
              </center>
            </Col>
          </Row>
        )}
      </Col>

      <Col span={24}>
        <MyTeamActivity
          team_data={
            state.user.enterprise_competition_overflow.last_competence.stats
              .current_interval_data
          }
        />
      </Col>
      <Col xl={24} xs={16}></Col>

      <Col span={24}>
        <Title level={2}>
          <LineChartOutlined style={{ marginRight: "10px" }} />
          Evolucion competencia
        </Title>
      </Col>
      <Col xs={24} xl={24}>
        <center>
          <Table
            style={{ width: window.innerWidth > 900 ? "50%" : "100%" }}
            bordered
            dataSource={[
              { nombre: "Semana 1", puntos: 4, metas: 1 },
              { nombre: "Semana 2", puntos: 20, metas: 3 },
              { nombre: "Semana 3", puntos: 60, metas: 0 },
              { nombre: "Semana 4", puntos: 90, metas: 2 },
              { nombre: "Total", puntos: 174, metas: 2 },
            ]}
            columns={[
              { title: "Semana", dataIndex: "nombre" },
              { title: "Puntos", dataIndex: "puntos" },
            ]}
          />
        </center>
      </Col>
    </Row>
  );
};

const styles = {
  circleDanger: buildStyles({
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
    textColor: "grey",
    backgroundColor: "#3e98c7",
  }),
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
    marginTop: "-12px",
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
    padding: "10px",
    color: "#fff",
    fontSize: "15px",
    marginBottom: "10px",
    width: "140px",
    fontWeight: "bold",
  },
  cardS2: {
    backgroundColor: "#001529",

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

export default Team;
