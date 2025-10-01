import React, { useState, useEffect } from "react";
import { Layout, Card, Flex, Affix, Button } from "antd";

import {
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  DatabaseOutlined,
  DashboardFilled,
} from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Nav
import MenuNav from "../components/webapp/MenuNav";
import NavBar from "../components/webapp/NavBar";

// Components Container
import Blog from "./Blog";
import Documentation from "./Documentation";
import ProfileUserCompetition from "./ProfileUserCompetition";
import Team from "./Team";
import ProfileUser from "./ProfileUser";
import Enterprise from "./Enterprise";
import Dashboard from "./Dashboard";
import Challenges from "./Challenges";
import Achievements from "./Achievements";
import GlobalViewer from "./GlobalViewer";

const { Content, Header, Sider } = Layout;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = location;

  return (
    <Layout>
      {window.innerWidth > 768 && (
        <Sider
          style={{
            zIndex: 1000,

            background:
              "linear-gradient(100deg, rgba(15,120,142,1) 100%, rgba(77,180,202,0.2217480742296919) 100%, rgba(60,87,93,1) 100%)",
            boxShadow: "1px 0px 20px 1px black",
          }}
        >
          <Affix>
            <NavBar />
          </Affix>
        </Sider>
      )}

      <Layout>
        <Affix>
          <MenuNav />
        </Affix>
        <Content style={styles.content}>
          {window.innerWidth < 900 && (
            <Affix offsetTop={70}>
              <Flex
                gap={"small"}
                justify="space-around"
                align="center"
                style={{
                  marginBottom: "10px",
                  background: "linear-gradient(169deg, rgba(15,120,142,0.95) 0%, rgba(122,160,168,0.95) 35%, rgba(60,87,93,0.95) 100%)",
                  padding: "10px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Button
                  type={"primary"}
                  icon={
                    <DashboardFilled
                      style={{
                        color: location.pathname !== "/" ? "white" : "#1a1a1a",
                      }}
                    />
                  }
                  shape="round"
                  onClick={() => navigate("/")}
                  style={{
                    background:
                      location.pathname == "/"
                        ? "rgba(230,184,0,0.9)"
                        : "rgba(15,120,142,0.8)",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: location.pathname == "/" ? "#1a1a1a" : "white",
                    boxShadow: location.pathname == "/" ? "0 0 10px rgba(230,184,0,0.5)" : "none",
                  }}
                />
                <Button
                  type={"primary"}
                  icon={
                    <UserOutlined
                      style={{
                        color: location.pathname !== "/profile_competition" ? "white" : "#1a1a1a",
                      }}
                    />
                  }
                  shape="round"
                  onClick={() => navigate("/profile_competition")}
                  style={{
                    background:
                      location.pathname == "/profile_competition"
                        ? "rgba(230,184,0,0.9)"
                        : "rgba(15,120,142,0.8)",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: location.pathname == "/profile_competition" ? "#1a1a1a" : "white",
                    boxShadow: location.pathname == "/profile_competition" ? "0 0 10px rgba(230,184,0,0.5)" : "none",
                  }}
                />
                <Button
                  type={"primary"}
                  icon={
                    <TeamOutlined
                      style={{
                        color: location.pathname !== "/team" ? "white" : "#1a1a1a",
                      }}
                    />
                  }
                  shape="round"
                  onClick={() => navigate("/team")}
                  style={{
                    background:
                      location.pathname == "/team"
                        ? "rgba(230,184,0,0.9)"
                        : "rgba(15,120,142,0.8)",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: location.pathname == "/team" ? "#1a1a1a" : "white",
                    boxShadow: location.pathname == "/team" ? "0 0 10px rgba(230,184,0,0.5)" : "none",
                  }}
                />
                <Button
                  type={"primary"}
                  icon={
                    <TrophyOutlined
                      style={{
                        color: location.pathname !== "/enterprise" ? "white" : "#1a1a1a",
                      }}
                    />
                  }
                  shape="round"
                  onClick={() => navigate("/enterprise")}
                  style={{
                    background:
                      location.pathname == "/enterprise"
                        ? "rgba(230,184,0,0.9)"
                        : "rgba(15,120,142,0.8)",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: location.pathname == "/enterprise" ? "#1a1a1a" : "white",
                    boxShadow: location.pathname == "/enterprise" ? "0 0 10px rgba(230,184,0,0.5)" : "none",
                  }}
                />
              </Flex>
            </Affix>
          )}
          <Flex gap={"small"}>
            <Card
              style={{
                minHeight: "85vh",
                width: "100%",
                background: "white",
                border: "1px solid rgba(15,120,142,0.1)",
                borderRadius: "0px"
              }}
            >
              <Routes>
                <Route path="*" element={<Dashboard />} />
                <Route path="/profile_user" element={<ProfileUser />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/profile_competition"
                  element={<ProfileUserCompetition />}
                />
                <Route path="/team" element={<Team />} />
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/challenges" element={<Challenges />} />

                <Route path="/achievements" element={<Achievements />} />
                <Route path="/global_viewer" element={<GlobalViewer />} />
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
  },
  logo: {
    width: "70px",
  },
};

export default Home;
