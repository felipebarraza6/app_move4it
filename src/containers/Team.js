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
            {state.user.team.name}
          </Title>
          <Tag color="blue">Puntaje: -</Tag>
          <Tag color="blue">Ranking: -</Tag>
          <Tag color="geekblue-inverse" style={{ marginTop: "10px" }}>
            {state.user.team.enterprise.name}
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
        <Title>
          {window.innerWidth > 900 && (
            <TeamOutlined style={{ marginRight: "10px" }} />
          )}
          Desempeño grupal
        </Title>
      </Col>
      <Col xl={24} xs={16}>
        <Title level={4}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            size="small"
            style={{ marginRight: "10px" }}
          ></Button>
          Semana #5
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            size="small"
            style={{ marginLeft: "10px" }}
          ></Button>
        </Title>
      </Col>
      <Col>
        <div style={{ width: 150, height: 140 }}>
          <CircularProgressbar
            value={80}
            maxValue={100}
            text={`80%`}
            styles={styles.circlePro}
          />
        </div>
        <center>
          <Title level={4}>10.000 Pasos</Title>
        </center>
      </Col>
      <Col>
        <div style={{ width: 150, height: 140 }}>
          <CircularProgressbar
            value={50}
            maxValue={100}
            text={`50%`}
            styles={styles.circlePro}
          />
        </div>
        <center>
          <Title level={4}>5km Trote</Title>
        </center>
      </Col>

      <Col>
        <div style={{ width: 150, height: 140 }}>
          <CircularProgressbar
            value={100}
            maxValue={100}
            text={`100%`}
            styles={styles.circlePro}
          />
        </div>
        <center>
          <Title level={4}>10km Bicicleta</Title>
        </center>
      </Col>
      <Col>
        <div style={{ width: 150, height: 140 }}>
          <CircularProgressbar
            value={0}
            maxValue={100}
            text={`0%`}
            styles={styles.circleDanger}
          />
        </div>
        <center>
          <Title level={4}>Almuerzo</Title>
        </center>
      </Col>
      <Col>
        <div style={{ width: 150, height: 140 }}>
          <CircularProgressbar
            value={90}
            maxValue={100}
            text={`90%`}
            styles={styles.circlePro}
          />
        </div>
        <center>
          <Title level={4}>1 Trekking</Title>
        </center>
      </Col>
      <Col span={24} style={{ marginTop: "20px" }}>
        <Title level={2}>Miembros</Title>
        <Paragraph>
          <Button
            type="primary"
            size="small"
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: "5px" }}
          />
          Semana #1
          <Button
            type="primary"
            size="small"
            icon={<ArrowRightOutlined />}
            style={{ marginLeft: "5px" }}
          />
        </Paragraph>
      </Col>
      <Col span={24}>
        {window.innerWidth > 900 ? (
          <Table
            bordered
            dataSource={[
              {
                nombre: "Juan",
                ts: 100,
                tt: 1000,
                d1: <CheckCircleFilled />,
                d2: <CheckCircleFilled />,
                d3: <></>,
                d4: <></>,
                d5: <></>,
              },
              {
                nombre: "Juan2",
                ts: 100,
                tt: 1000,
                d1: <></>,
                d2: <CheckCircleFilled />,
                d3: <></>,
                d4: <></>,
                d5: <></>,
              },
              {
                nombre: "Juan3",
                ts: 100,
                tt: 1000,
                d1: <></>,
                d2: <CheckCircleFilled />,
                d3: <></>,
                d4: <CheckCircleFilled />,
                d5: <CheckCircleFilled />,
              },
              {
                nombre: "Juan4",
                ts: 100,
                tt: 1000,
                d1: <CheckCircleFilled />,
                d2: <CheckCircleFilled />,
                d3: <CheckCircleFilled />,
                d4: <CheckCircleFilled />,
                d5: <CheckCircleFilled />,
              },
            ]}
            columns={[
              { title: "Nombre", dataIndex: "nombre" },
              { title: "Prueba #1", dataIndex: "d1" },
              { title: "Prueba #2", dataIndex: "d2" },
              { title: "Prueba #3", dataIndex: "d3" },
              { title: "Prueba #4", dataIndex: "d4" },
              { title: "Prueba #5", dataIndex: "d5" },
              { title: "Puntos semana #1", dataIndex: "ts" },
              { title: "Puntos acumulados", dataIndex: "tt" },
            ]}
          />
        ) : (
          <>
            <Select
              placeholder={"Usuario..."}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <Select.Option>Juan1</Select.Option>
              <Select.Option>Juan2</Select.Option>
              <Select.Option>Juan3</Select.Option>
              <Select.Option>Juan4</Select.Option>
              <Select.Option>Juan5</Select.Option>
            </Select>
            <Table
              bordered
              dataSource={[
                {
                  nombre: "Prueba1",
                  ts: 100,
                  tt: 1000,
                  d1: <CheckCircleFilled />,
                  d2: <CheckCircleFilled />,
                  d3: <></>,
                  d4: <></>,
                  d5: <></>,
                },
                {
                  nombre: "Prueba2",
                  ts: 100,
                  tt: 1000,
                  d1: <></>,
                  d2: <CheckCircleFilled />,
                  d3: <></>,
                  d4: <></>,
                  d5: <></>,
                },
                {
                  nombre: "Prueba3",
                  ts: 100,
                  tt: 1000,
                  d1: <></>,
                  d2: <CheckCircleFilled />,
                  d3: <></>,
                  d4: <CheckCircleFilled />,
                  d5: <CheckCircleFilled />,
                },
                {
                  nombre: "Prueba4",
                  ts: 100,
                  tt: 1000,
                  d1: <CheckCircleFilled />,
                  d2: <CheckCircleFilled />,
                  d3: <CheckCircleFilled />,
                  d4: <CheckCircleFilled />,
                  d5: <CheckCircleFilled />,
                },
              ]}
              columns={[
                { title: "Prueba", dataIndex: "nombre" },

                { title: "Estado", dataIndex: "d1" },
                { title: "Puntos", dataIndex: "ts" },
              ]}
            />
          </>
        )}
      </Col>
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
