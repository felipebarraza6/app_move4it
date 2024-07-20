import React from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Tag,
  Statistic,
  Pagination,
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

  return (
    <Row justify={"space-between"} align="top">
      <Col xs={24} xl={7} style={{ paddingRight: "10px" }}>
        <Card
          style={{ ...styles.card, paddingBottom: "0px", minHeight: "75vh" }}
          hoverable
        >
          <Title level={3} style={{ color: "white" }}>
            NOMBRE EMPRESA
          </Title>
          <Title level={4} style={{ color: "white" }}>
            RANKING
          </Title>
          <Row justify={"start"}>
            <Col span={24}>
              <hr />
            </Col>
            <Col span={4}>#</Col>
            <Col span={10}>Equipo</Col>
            <Col span={10}>Puntos</Col>
            <Col span={24}>
              <hr />
            </Col>
            {dataSource.map((e) => (
              <>
                <Col span={4} style={{ marginBottom: "10px" }}>
                  {e.star ? (
                    <Tag color={"geekblue-inverse"}>{e.numero}</Tag>
                  ) : (
                    <Tag color={"geekblue"}>{e.numero}</Tag>
                  )}
                </Col>
                <Col span={10}>
                  {e.star ? (
                    <Tag color={"geekblue-inverse"}>{e.equipo}</Tag>
                  ) : (
                    <Tag color={"geekblue"}>{e.equipo}</Tag>
                  )}
                </Col>
                <Col span={10}>
                  {e.star ? (
                    <Tag color={"geekblue-inverse"}>{e.puntos}</Tag>
                  ) : (
                    <Tag color={"geekblue"}>{e.puntos}</Tag>
                  )}
                </Col>
              </>
            ))}
            <Col style={{ marginTop: "10px" }}>
              <Button
                style={{ marginRight: "10px" }}
                icon={<ArrowLeftOutlined />}
                type="primary"
              ></Button>
            </Col>
            <Col style={{ marginTop: "10px" }}>
              <Button type="primary" icon={<ArrowRightOutlined />}></Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} xl={17}>
        {window.innerWidth > 900 ? (
          <Row justify={"space-between"} align={"middle"}>
            <Col xs={12} xl={5} style={{ paddingRight: "5px" }}>
              <Statistic
                value={1.7}
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
            <Col xs={12} xl={5} style={{ paddingRight: "5px" }}>
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
            <Col xs={12} xl={5} style={{ paddingRight: "5px" }}>
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

            <Col xs={12} xl={6}>
              <center>
                <Card style={{ ...styles.cardC, width: "100%" }} hoverable>
                  <UserOutlined
                    style={{
                      color: "white",
                      fontSize: window.innerWidth > 900 ? "100px" : "70px",
                    }}
                  />
                </Card>
              </center>
            </Col>
          </Row>
        )}

        <Row
          justify={"space-evenly"}
          style={{ paddingLeft: "0px", marginTop: "-20px" }}
        >
          <Col span={24}>
            <Title>Pruebas</Title>
            <Title level={4}>
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginRight: "5px" }}
              />
              Semana #5
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                size="small"
                style={{ marginLeft: "5px" }}
              />
            </Title>
          </Col>
          <Col span={24}>
            {window.innerWidth > 900 ? (
              <Table
                bordered
                pagination={false}
                dataSource={[
                  { nombre: "5k Trote", puntos: "x", metas: "", metodo: "App" },
                  {
                    nombre: "10km Bicicleta",
                    puntos: "x",
                    metas: "",
                    metodo: "App",
                  },
                  {
                    nombre: "1 Trekking",
                    puntos: "x",
                    metas: "",
                    metodo: "Foto",
                  },
                  {
                    nombre: "10.000 pasos",
                    puntos: "",
                    metas: "x",
                    metodo: "App",
                  },
                  { nombre: "Almuerzo", puntos: "", metas: "x", metodo: "App" },
                ]}
                columns={[
                  { title: "Prueba", dataIndex: "nombre" },
                  { title: "Individual", dataIndex: "puntos" },
                  { title: "Equipo", dataIndex: "metas" },
                  { title: "Metodo medicion", dataIndex: "metodo" },
                ]}
              />
            ) : (
              <Table
                bordered
                size={"small"}
                pagination={false}
                dataSource={[
                  {
                    nombre: "5k Trote",
                    puntos: "Individual",
                    metas: "",
                    metodo: "App",
                  },
                  {
                    nombre: "10km Bicicleta",
                    puntos: "Grupal",
                    metas: "",
                    metodo: "App",
                  },
                  {
                    nombre: "1 Trekking",
                    puntos: "Individual",
                    metas: "",
                    metodo: "Foto",
                  },
                  {
                    nombre: "10.000 pasos",
                    puntos: "Grupal",
                    metas: "x",
                    metodo: "App",
                  },
                  {
                    nombre: "Almuerzo",
                    puntos: "Grupal",
                    metas: "x",
                    metodo: "App",
                  },
                ]}
                columns={[
                  { title: "Prueba", dataIndex: "nombre" },
                  { title: "Individual/Grupal", dataIndex: "puntos" },
                  { title: "Medicion", dataIndex: "metodo" },
                ]}
              />
            )}
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Title level={4}>Duracion competencia</Title>
      </Col>
      <Col span={24}>
        <center>
          <Table
            bordered
            style={{ width: window.innerWidth > 900 ? "50%" : "100%" }}
            pagination={false}
            dataSource={[
              {
                nombre: "1 día 19 horas",
                puntos: "60 días 15 horas",
                metas: 1,
              },
            ]}
            columns={[
              { title: "Semanal", dataIndex: "nombre", width: "57%" },
              { title: "Total", dataIndex: "puntos", width: "43%" },
            ]}
          />
        </center>
      </Col>
      <Col span={24}>
        <Title level={4}>Pruebas Empresa</Title>
      </Col>
      <Col span={24}>
        <center>
          <Table
            bordered
            style={{ width: window.innerWidth > 900 ? "50%" : "100%" }}
            dataSource={[
              {
                nombre: "Pasos",
                objetivo: "1.000.000 pasos",
              },
              { nombre: "Trote", objetivo: "100 km" },
              { nombre: "Almuerzo en equipo", objetivo: "50 almuerzo" },
              { nombre: "Calorias", objetivo: "100.000 kcal" },
              { nombre: "Minutos entrenamiento", objetivo: "50 horas" },
            ]}
            columns={[
              { title: "Prueba", dataIndex: "nombre", width: "57%" },
              { title: "Objetivo", dataIndex: "objetivo", width: "43%" },
            ]}
          />
        </center>
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
