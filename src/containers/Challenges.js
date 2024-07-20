import React from "react";
import { Typography, Row, Col, Card, Button, Tag, Table } from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  ArrowLeftOutlined,
  ClockCircleFilled,
  ArrowRightOutlined,
  NumberOutlined,
  PlusCircleFilled,
  BuildFilled,
  LeftOutlined,
  EuroCircleFilled,
  RightOutlined,
} from "@ant-design/icons";
import "react-circular-progressbar/dist/styles.css";
import Blog from "./Blog";

const { Title, Paragraph } = Typography;

const Challenges = () => {
  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col>
        <Title level={1}> Desafios</Title>{" "}
      </Col>
      <Col xs={24} xl={4}>
        <Card style={styles.cardC} hoverable>
          <Title
            level={3}
            style={{
              ...styles.title,
              marginTop: "-10px",
              marginBottom: "-10px",
            }}
          >
            <NumberOutlined /> Rookie
          </Title>
          <br />
          <hr />
          <br />
          <Button type="primary" size="large">
            9.632 <BuildFilled />
          </Button>
        </Card>
      </Col>

      <Col span={24} style={{ marginTop: "10px" }}>
        <Row justify={window.innerWidth > 900 ? "space-between" : "center"}>
          <Col>
            <Card
              hoverable
              style={{ width: "250px", ...styles.card }}
              cover={
                <img
                  alt="example"
                  src="https://th.bing.com/th/id/OIP.JJWPRAlipUYxz4FCoBrm6wHaFj?pid=ImgDet&rs=1"
                />
              }
            >
              <Card.Meta
                title={
                  <Title level={4} style={{ color: "white" }}>
                    Desafio 1
                  </Title>
                }
                description={
                  <Paragraph level={4} style={{ color: "white" }}>
                    <ClockCircleFilled style={{ marginRight: "10px" }} />{" "}
                    Finaliza en 3 dias
                  </Paragraph>
                }
              />
              <Button icon={<PlusCircleFilled />} style={{ float: "right" }}>
                Unirme
              </Button>
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: "250px", ...styles.card }}
              cover={
                <img
                  alt="example"
                  src="https://th.bing.com/th/id/OIP.JJWPRAlipUYxz4FCoBrm6wHaFj?pid=ImgDet&rs=1"
                />
              }
            >
              <Card.Meta
                title={
                  <Title level={4} style={{ color: "white" }}>
                    Desafio 1
                  </Title>
                }
                description={
                  <Paragraph level={4} style={{ color: "white" }}>
                    <ClockCircleFilled style={{ marginRight: "10px" }} />{" "}
                    Finaliza en 3 dias
                  </Paragraph>
                }
              />
              <Button icon={<PlusCircleFilled />} style={{ float: "right" }}>
                Unirme
              </Button>
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: "250px", ...styles.card }}
              cover={
                <img
                  alt="example"
                  src="https://th.bing.com/th/id/OIP.JJWPRAlipUYxz4FCoBrm6wHaFj?pid=ImgDet&rs=1"
                />
              }
            >
              <Card.Meta
                title={
                  <Title level={4} style={{ color: "white" }}>
                    Desafio 1
                  </Title>
                }
                description={
                  <Paragraph level={4} style={{ color: "white" }}>
                    <ClockCircleFilled style={{ marginRight: "10px" }} />{" "}
                    Finaliza en 3 dias
                  </Paragraph>
                }
              />
              <Button icon={<PlusCircleFilled />} style={{ float: "right" }}>
                Unirme
              </Button>
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: "250px", ...styles.card }}
              cover={
                <img
                  alt="example"
                  src="https://th.bing.com/th/id/OIP.JJWPRAlipUYxz4FCoBrm6wHaFj?pid=ImgDet&rs=1"
                />
              }
            >
              <Card.Meta
                title={
                  <Title level={4} style={{ color: "white" }}>
                    Desafio 1
                  </Title>
                }
                description={
                  <Paragraph level={4} style={{ color: "white" }}>
                    <ClockCircleFilled style={{ marginRight: "10px" }} />{" "}
                    Finaliza en 3 dias
                  </Paragraph>
                }
              />
              <Button icon={<PlusCircleFilled />} style={{ float: "right" }}>
                Unirme
              </Button>
            </Card>
          </Col>
          <Col span={2} offset={window.innerWidth > 900 ? 22 : 12}>
            <Button
              type="primary"
              icon={<RightOutlined />}
              style={{ marginLeft: "-20px" }}
            >
              Siguiente
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginTop: "20px" }}>
        <Row
          align="middle"
          justify={"space-between"}
          style={{ marginTop: "0px" }}
        >
          <Col>
            <Title level={2}>Top Player</Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {" "}
        <Card style={{ ...styles.card, paddingBottom: "70px" }} hoverable>
          <Title level={4} style={{ color: "white" }}>
            RANKING
          </Title>
          <center>
            <Tag color="blue" style={{ margin: "10px" }}>
              1 - Jugador 1: 1800pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              2 - Jugador 2: 1700pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              3 - Jugador 3: 1600pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              4 - Jugador 3: 1600pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              5 - Jugador 5: 1500pts
            </Tag>
            <br />
            <Tag color="blue" style={{ margin: "10px" }}>
              6 - Jugador 6: 1400pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              7 - Jugador 7: 1300pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              8 - Jugador 8: 1200pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              9 - Jugador 9: 1100pts
            </Tag>
            <Tag color="blue" style={{ margin: "10px" }}>
              10 - Jugador 10: 1000pts
            </Tag>
          </center>
        </Card>
      </Col>
    </Row>
  );
};

const styles = {
  title: {
    color: "#fff",
  },
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
  cardC: {
    backgroundColor: "#001529",
    color: "#fff",
    borderRadius: "10px",
    width: window.innerWidth > 900 ? "100%" : "100%",
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
  cardContainsRow: {
    backgroundColor: "#001529",
    width: "60%",
    color: "#fff",
    padding: "10px",
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Challenges;
