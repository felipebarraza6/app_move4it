import React, { useState, useEffect, useContext } from "react";
import { Layout, Card, Flex, Affix, Button, Popconfirm } from "antd";

import {
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  DatabaseOutlined,
  DashboardFilled,
  BookOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

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
  const { state, dispatch } = useContext(AppContext);
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
            background: "linear-gradient(135deg, rgba(10, 95, 224, 0.98) 0%, rgba(10, 140, 207, 0.98) 50%, rgba(18, 227, 194, 0.98) 100%)",
            boxShadow: "2px 0px 20px rgba(10, 95, 224, 0.2)",
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
        <Content style={{ 
          ...styles.content, 
          margin: window.innerWidth < 900 ? "0" : "0 16px",
          padding: window.innerWidth < 900 ? "0 4px 4px 4px" : "0",
        }}>
          {window.innerWidth < 900 && (
            <Affix offsetTop={0}>
              <Flex
                gap="4px"
                justify="space-between"
                align="center"
                style={{
                  background: "linear-gradient(135deg, rgba(18, 227, 194, 1) 0%, rgba(10, 140, 207, 1) 100%)",
                  padding: "4px 12px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  height: "48px",
                }}
              >
                {/* Logo M4IA */}
                <Flex 
                  align="center" 
                  gap="2px" 
                  onClick={() => navigate("/")} 
                  style={{ cursor: "pointer", marginRight: "4px" }}
                  className="futuristic-logo-glow"
                >
                  <span style={{ 
                    color: "white", 
                    fontSize: "15px", 
                    fontWeight: "900", 
                    letterSpacing: "-0.5px",
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    MOVE
                  </span>
                  <div className="m4ia-box" style={{ 
                    color: "#052240", 
                    fontSize: "15px", 
                    fontWeight: "900", 
                    background: "white", 
                    padding: "0 5px", 
                    borderRadius: "4px",
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: "0 0 10px rgba(255,255,255,0.5)"
                  }}>
                    4IA
                  </div>
                </Flex>

                {/* Primary Nav */}
                <Flex gap="4px" style={{ flex: 1, justifyContent: "center" }}>
                  <Button
                    type="primary"
                    icon={<DashboardFilled style={{ fontSize: "16px" }} />}
                    size="small"
                    shape="circle"
                    onClick={() => navigate("/")}
                    style={{
                      background: pathname === "/" ? "rgba(255,255,255,1)" : "transparent",
                      border: "none",
                      color: pathname === "/" ? "#12E3C2" : "white",
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<UserOutlined style={{ fontSize: "16px" }} />}
                    size="small"
                    shape="circle"
                    onClick={() => navigate("/profile_competition")}
                    style={{
                      background: pathname === "/profile_competition" ? "rgba(255,255,255,1)" : "transparent",
                      border: "none",
                      color: pathname === "/profile_competition" ? "#12E3C2" : "white",
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<TeamOutlined style={{ fontSize: "16px" }} />}
                    size="small"
                    shape="circle"
                    onClick={() => navigate("/team")}
                    style={{
                      background: pathname === "/team" ? "rgba(255,255,255,1)" : "transparent",
                      border: "none",
                      color: pathname === "/team" ? "#12E3C2" : "white",
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<TrophyOutlined style={{ fontSize: "16px" }} />}
                    size="small"
                    shape="circle"
                    onClick={() => navigate("/enterprise")}
                    style={{
                      background: pathname === "/enterprise" ? "rgba(255,255,255,1)" : "transparent",
                      border: "none",
                      color: pathname === "/enterprise" ? "#12E3C2" : "white",
                      width: "32px",
                      height: "32px",
                    }}
                  />
                </Flex>

                {/* Secondary Actions */}
                <Flex gap="2px">
                  <Button
                    type="text"
                    icon={<BookOutlined style={{ color: "white", fontSize: "15px" }} />}
                    size="small"
                    onClick={() => navigate("/documentation")}
                    style={{ border: "none" }}
                  />
                  <Button
                    type="text"
                    icon={<SnippetsOutlined style={{ color: "white", fontSize: "15px" }} />}
                    size="small"
                    onClick={() => navigate("/blog")}
                    style={{ border: "none" }}
                  />
                  <Popconfirm
                    title="Cerrar sesión"
                    onConfirm={() => {
                      dispatch({ type: "LOGOUT" });
                      navigate("/");
                    }}
                    okText="Sí"
                    cancelText="No"
                    placement="bottomRight"
                  >
                    <Button
                      type="text"
                      icon={<LogoutOutlined style={{ color: "rgba(255, 100, 100, 1)", fontSize: "15px" }} />}
                      size="small"
                      style={{ border: "none" }}
                    />
                  </Popconfirm>
                </Flex>
              </Flex>
            </Affix>
          )}
          <div key={location.pathname} className="page-transition-enter">
            <Flex gap={"small"}>
              <Card
                styles={{
                  body: { 
                    padding: window.innerWidth < 900 ? "8px" : "24px" 
                  }
                }}
                style={{
                  minHeight: "85vh",
                  width: "100%",
                  background: "white",
                  border: "1px solid rgba(10, 95, 224, 0.1)",
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
          </div>
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
