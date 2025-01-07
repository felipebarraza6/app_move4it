import React from "react";
import { Layout, Row, Col, Card, Button, Flex, Affix } from "antd";

import logo from "../assets/img/logo.png";
import { Route, Routes, Link, useLocation } from "react-router-dom";

// Nav
import MenuNav from "../components/webapp/MenuNav";
import NavBar from "../components/webapp/NavBar";
import {
  HomeFilled,
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  FireFilled,
  StarFilled,
} from "@ant-design/icons";

// Components Container
import Blog from "./Blog";
import ProfileUserCompetition from "./ProfileUserCompetition";
import Team from "./Team";
import ProfileUser from "./ProfileUser";
import Enterprise from "./Enterprise";
import Dashboard from "./Dashboard";
import Challenges from "./Challenges";
import Achievements from "./Achievements";

const { Content, Header, Sider } = Layout;

const Home = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Layout>
      <Affix>
        <Header>
          <Flex justify="space-between" align="center">
            <img src={logo} alt="logo" style={styles.logo} />
            <MenuNav />
          </Flex>
        </Header>
      </Affix>
      <Content style={styles.content}>
        <Row justify={"space-between"}>
          {window.innerWidth > 900 ? (
            <Col span={3}>
              <NavBar />
            </Col>
          ) : (
            <Col span={24}>
              <Row
                justify={"space-between"}
                style={{ marginBottom: "10px", marginTop: "-10px" }}
              >
                <Col>
                  <Link to="/">
                    <Button
                      type={pathname === "/" ? "primary" : "default"}
                      shape="circle"
                      icon={<HomeFilled />}
                    />
                  </Link>
                </Col>
                <Col>
                  <Link to="/profile_competition">
                    <Button
                      type={
                        pathname === "/profile_competition"
                          ? "primary"
                          : "default"
                      }
                      shape="circle"
                      icon={<UserOutlined />}
                    />
                  </Link>
                </Col>
                <Col>
                  <Link to="/team">
                    <Button
                      type={pathname === "/team" ? "primary" : "default"}
                      shape="circle"
                      icon={<TeamOutlined />}
                    />
                  </Link>
                </Col>
                <Col>
                  <Link to="/enterprise">
                    <Button
                      type={pathname === "/enterprise" ? "primary" : "default"}
                      shape="circle"
                      icon={<TrophyOutlined />}
                    />
                  </Link>
                </Col>
                <Col>
                  <Link to="/challenges">
                    <Button
                      type={pathname === "/challenges" ? "primary" : "default"}
                      shape="circle"
                      icon={<FireFilled />}
                    />
                  </Link>
                </Col>
                <Col>
                  <Link to="/achievements">
                    <Button
                      type={
                        pathname === "/achievements" ? "primary" : "default"
                      }
                      shape="circle"
                      icon={<StarFilled />}
                    />
                  </Link>
                </Col>
              </Row>
            </Col>
          )}

          <Col
            span={window.innerWidth > 900 ? 20 : 24}
            offset={window.innerWidth > 900 && 1}
          >
            <Card>
              <Routes>
                <Route path="*" element={<Dashboard />} />
                <Route path="/profile_user" element={<ProfileUser />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/profile_competition"
                  element={<ProfileUserCompetition />}
                />
                <Route path="/team" element={<Team />} />
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/challenges" element={<Challenges />} />

                <Route path="/achievements" element={<Achievements />} />
              </Routes>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const styles = {
  content: {
    padding: "25px",
  },
  logo: {
    width: "70px",
  },
};

export default Home;
