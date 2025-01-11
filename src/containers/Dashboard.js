import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Button, Table, Descriptions } from "antd";
import { CircularProgressbar } from "react-circular-progressbar";
import { ArrowRightOutlined } from "@ant-design/icons";
import Welcome from "../components/webapp/Dashboard/Welcome";
import Blog from "./Blog";
import { AppContext } from "../App";
import CompetitionSummary from "../components/webapp/Dashboard/CompetitionSummary";
import UserChallenge from "../components/webapp/Dashboard/UserChallenge";
import { Link } from "react-router-dom";
import UserActivity from "../components/webapp/Dashboard/UserActivity";

const { Title } = Typography;

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const [stats_personal, setStatsPersonal] = useState([]);

  useEffect(() => {}, []);

  return (
    <Row justify={"space-between"} align={"top"}>
      <Col span={15}>
        <Welcome />
      </Col>
      <Col span={6}>
        <CompetitionSummary />
      </Col>
      <Col span={18}></Col>
      <Col span={24}></Col>

      <Col span={24}>
        <Blog type="novedades" />
      </Col>
    </Row>
  );
};

export default Dashboard;
