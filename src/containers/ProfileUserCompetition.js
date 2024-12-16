import React, { useContext } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Tag,
  Statistic,
  Button,
  Table,
} from "antd";
import {
  RiseOutlined,
  FallOutlined,
  ArrowRightOutlined,
  CloudUploadOutlined,
  EuroCircleFilled,
  UserOutlined,
  LeftOutlined,
  BuildFilled,
  RightOutlined,
} from "@ant-design/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../App";
const { Title } = Typography;

const ProfileUserCompetition = () => {
  const { state } = useContext(AppContext);
  const date_of_birth = state.user.profile.date_of_birth || "1990-01-01";
  const date = new Date();
  const age = date.getFullYear() - parseInt(date_of_birth.split("-")[0]);

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
  return (
    <Row
      justify={window.innerWidth > 900 ? "space-between" : "center"}
      align={"middle"}
    >
      <Col xl={8} xs={24}>
        <Title level={2}>
          {state.user.first_name.toUpperCase()}{" "}
          {state.user.last_name.toUpperCase()}
        </Title>
        <Card
          style={{
            width: window.innerWidth > 900 ? "90%" : "100%",
            ...styles.card,
          }}
          hoverable
        >
          <Tag color="blue">{age} Años</Tag>
          <Tag
            color="geekblue-inverse"
            style={{ marginTop: window.innerWidth < 900 && "10px" }}
          >
            {state.user.team.enterprise.name}
          </Tag>
          <Tag
            color="blue-inverse"
            style={{ marginTop: window.innerWidth < 900 ? "10px" : "10px" }}
          >
            {state.user.team.name}
          </Tag>
        </Card>
      </Col>
      <Col xl={8} xs={12} style={{ paddingRight: "0px" }}>
        <Row justify={"start"}>
          <Col style={{ paddingRight: "5px", paddingBottom: "10px" }}>
            <Statistic
              value={state.user.profile.corporal_meditions[0].height}
              precision={2}
              style={styles.static}
              title={
                <Title style={{ color: "white", marginTop: "-5px" }} level={4}>
                  <RiseOutlined style={{ marginRight: "5px" }} /> Estatura
                </Title>
              }
              valueStyle={styles.cardS}
              suffix="m"
            />
          </Col>
          <Col style={{ paddingRight: "5px", paddingBottom: "10px" }}>
            <Statistic
              value={state.user.profile.corporal_meditions[0].weight}
              precision={1}
              style={styles.static}
              title={
                <Title style={{ color: "white", marginTop: "-5px" }} level={4}>
                  <FallOutlined style={{ marginRight: "5px" }} /> Peso
                </Title>
              }
              valueStyle={styles.cardS}
              suffix="kg"
            />
          </Col>
          <Col style={{ paddingRight: "5px", paddingBottom: "10px" }}>
            <Statistic
              value={state.user.profile.corporal_meditions[0].fat}
              precision={1}
              style={styles.static}
              title={
                <Title style={{ color: "white", marginTop: "-5px" }} level={4}>
                  <RiseOutlined style={{ marginRight: "5px" }} /> % Grasa
                </Title>
              }
              valueStyle={styles.cardS}
              suffix="%"
            />
          </Col>
        </Row>
      </Col>
      <Col xl={8} xs={12}>
        <center>
          <Card
            style={{ width: "100%", ...styles.cardC, borderRadius: "10px" }}
            hoverable
          >
            <Row justify={"center"}>
              <Col span={24}>
                <UserOutlined
                  style={{
                    color: "white",
                    fontSize: "80px",
                    marginBottom: "0px",
                  }}
                />
              </Col>
              <Col>
                <Title
                  level={4}
                  style={{
                    ...styles.title,
                    color: "white",
                  }}
                >
                  @ {state.user.username}
                </Title>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  size={window.innerWidth > 900 ? "large" : "small"}
                >
                  {state.user.points} <BuildFilled />
                </Button>
              </Col>
            </Row>
          </Card>
        </center>
      </Col>
      <Col span={24}>
        <Title level={window.innerWidth > 900 ? 2 : 3}>
          Desempeño individual
        </Title>
      </Col>

      <Col span={24} style={{ marginBottom: "20px" }}>
        <Title level={4}>
          Semana #1
          <Button
            style={{ marginLeft: "5px" }}
            size="small"
            type="primary"
            icon={<ArrowRightOutlined />}
          />
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
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            style={{ marginBottom: window.innerWidth < 900 && "10px" }}
          >
            Cargar{" "}
          </Button>
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
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            style={{ marginBottom: window.innerWidth < 900 && "10px" }}
          >
            Cargar{" "}
          </Button>
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
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            style={{ marginBottom: window.innerWidth < 900 && "10px" }}
          >
            Cargar{" "}
          </Button>
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
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            style={{ marginBottom: window.innerWidth < 900 && "10px" }}
          >
            Cargar{" "}
          </Button>
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
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            style={{ marginBottom: window.innerWidth < 900 && "10px" }}
          >
            Cargar{" "}
          </Button>
        </center>
      </Col>
      <Col span={24} style={{ marginTop: "20px" }}>
        <Title level={2}>Actividad personal</Title>
      </Col>
      <Col span={24}>
        <Row justify={"space-between"}>
          <Col xl={11} xs={24}>
            <Table
              bordered
              rowClassName={"backtable"}
              size="small"
              style={{ marginBottom: "10px" }}
              columns={[
                { title: "Historico", dataIndex: "glosa" },
                { title: "Cantidad", dataIndex: "cantidad" },
              ]}
              pagination={false}
              dataSource={[
                { glosa: "Pruebas logradas", cantidad: 12 },
                { glosa: "Pasos", cantidad: "10.000" },
                { glosa: "Minutos ejercitados", cantidad: "120" },
                { glosa: "Kcal quemadas", cantidad: "800" },
              ]}
            />
          </Col>
          <Col xl={11} xs={24}>
            <Table
              bordered
              style={{ marginBottom: "10px" }}
              rowClassName={"backtable"}
              size="small"
              pagination={false}
              columns={[
                {
                  title: (
                    <>
                      <Button
                        size="small"
                        icon={<LeftOutlined />}
                        type="primary"
                        style={{ marginRight: "10px" }}
                      ></Button>
                      Intervalo #1{" "}
                      <Button
                        size="small"
                        icon={<RightOutlined />}
                        style={{ marginLeft: "10px" }}
                        type="primary"
                      ></Button>
                    </>
                  ),
                  dataIndex: "glosa",
                },
                { title: "Cantidad", dataIndex: "cantidad" },
              ]}
              dataSource={[
                { glosa: "Pruebas logradas", cantidad: 12 },
                { glosa: "Pasos", cantidad: "10.000" },
                { glosa: "Minutos ejercitados", cantidad: "120" },
                { glosa: "Kcal quemadas", cantidad: "800" },
              ]}
            />
          </Col>
        </Row>
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
    width: window.innerWidth > 900 ? "150px" : "130px",
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
  cardC: {
    backgroundColor: "#001529",
    color: "#fff",
    borderRadius: "10%",
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default ProfileUserCompetition;
