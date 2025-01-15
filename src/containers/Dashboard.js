import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, Flex } from "antd";
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
    <Flex vertical>
      <Flex gap="small" justify="space-between">
        <Welcome />
        <CompetitionSummary />
      </Flex>

      <Blog type="novedades" />
    </Flex>
  );
};

export default Dashboard;
