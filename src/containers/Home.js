import React from "react";
import { Layout, Row, Col, Card, Button, Flex, Affix } from "antd";

import logo from "../assets/img/logo.png";
import { Route, Routes, Link, useLocation } from "react-router-dom";

// Nav
import MenuNav from "../components/webapp/MenuNav";
import NavBar from "../components/webapp/NavBar";

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
      <Sider
        width={200}
        style={{
          background:
            "linear-gradient(169deg, rgba(15,120,142,1) 0%, rgba(77,180,202,0.2217480742296919) 99%, rgba(60,87,93,1) 100%)",
        }}
      >
        <Affix offsetTop={70}>
          <NavBar />
        </Affix>
      </Sider>

      <Layout>
        <Affix>
          <Header
            style={{
              background:
                "linear-gradient(169deg, rgba(15,120,142,1) 0%, rgba(122,160,168,1) 35%, rgba(60,87,93,1) 100%)",
            }}
          >
            <Flex justify="end" align="center">
              <MenuNav />
            </Flex>
          </Header>
        </Affix>
        <Content style={styles.content}>
          <Flex gap={"small"}>
            <Card style={{ minHeight: "85vh", width: "100%" }}>
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
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  content: {
    minHeight: "90vh",
    marginTop: "10px",
  },
  logo: {
    width: "70px",
  },
};

export default Home;
