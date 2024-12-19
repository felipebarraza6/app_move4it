import React, { useState } from "react";
import { Menu, Button, Typography, Row, Col, Affix } from "antd";
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
  const [option, setOption] = useState(1);
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
    } else if (item.key === "achievements") {
      navigate("/achievements");
    } else if (item.key === "challenges") {
      navigate("/challenges");
    }
  };

  const items = [
    getItem("Inicio", "home", <HomeFilled />),
    getItem("Perfil", "profile_competition", <UserOutlined />),
    getItem("Equipo", "team", <TeamOutlined />),
    getItem("Empresa", "enterprise", <TrophyOutlined />),
  ];
  return (
    <Affix offsetTop={10}>
      <div>
        {window.innerWidth > 900 ? (
          <Menu
            onClick={onChangeOption}
            style={styles.menu}
            theme={"dark"}
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
    </Affix>
  );
};

const styles = {
  menu: {
    borderRadius: "10px",
    height: "80vh",
  },
};

export default NavBar;
