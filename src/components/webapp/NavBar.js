import React, { useState, useEffect } from "react";
import { Menu, Typography, Row, Col, Affix } from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  HomeFilled,
  FireOutlined,
  StarFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const NavBar = () => {
  const [option, setOption] = useState("home");
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      label,
      children,
      type,
    };
  }

  const onChangeOption = (item) => {
    if (item.key === "profile_competition") {
      navigate("/profile_competition");
    } else if (item.key === "team") {
      navigate("/team");
    } else if (item.key === "enterprise") {
      navigate("/enterprise");
    } else if (item.key === "home") {
      navigate("/");
    }
  };

  const items = [
    getItem("Inicio", "home", <HomeFilled />),
    getItem("Perfil", "profile_competition", <UserOutlined />),
    getItem("Equipo", "team", <TeamOutlined />),
    getItem("Competencía", "enterprise", <TrophyOutlined />),
  ];

  useEffect(() => {
    if (window.location.pathname === "/profile_competition") {
      setOption("profile_competition");
    } else if (window.location.pathname === "/team") {
      setOption("team");
    } else if (window.location.pathname === "/enterprise") {
      setOption("enterprise");
    } else if (window.location.pathname === "/") {
      setOption("home");
    }
  }, [option, onChangeOption]);
  return (
    <div style={{ paddingLeft: "5px" }}>
      {window.innerWidth > 900 ? (
        <Menu
          onClick={onChangeOption}
          style={styles.menu}
          theme={"dark"}
          selectedKeys={[option]}
          items={items}
        ></Menu>
      ) : (
        <Row
          justify={"center"}
          align={"middle"}
          style={{
            borderRadius: "20px",
            padding: "10px",
            border: "2px solid #001529",
          }}
        >
          <Col span={24}>
            <Link to="/">
              <HomeOutlined
                style={{
                  fontSize: "25px",
                  marginBottom: "20px",
                  color: "rgb(0, 21, 41)",
                }}
              />
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/profile_competition">
              <UserOutlined
                style={{
                  fontSize: "25px",
                  marginBottom: "20px",
                  color: "rgb(0, 21, 41)",
                }}
              />
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/team">
              <TeamOutlined
                style={{
                  fontSize: "25px",
                  marginBottom: "20px",
                  color: "rgb(0, 21, 41)",
                }}
              />
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/enterprise">
              <TrophyOutlined
                style={{
                  fontSize: "25px",
                  marginBottom: "20px",
                  color: "rgb(0, 21, 41)",
                }}
              />
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/challenges">
              <FireOutlined
                style={{
                  fontSize: "25px",
                  marginBottom: "20px",
                  color: "rgb(0, 21, 41)",
                }}
              />
            </Link>
          </Col>
          <Col span={24}>
            <Link to="/achievements">
              <StarFilled
                style={{
                  fontSize: "25px",
                  marginBottom: "20px",
                  color: "rgb(0, 21, 41)",
                }}
              />
            </Link>
          </Col>
        </Row>
      )}
    </div>
  );
};

const styles = {
  menu: {
    borderRadius: "10px",
    height: "90vh",
  },
};

export default NavBar;
