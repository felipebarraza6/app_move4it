import React, { useContext, useState, useEffect } from "react";
import { Table, Flex, Button } from "antd";
import { AppContext } from "../../../App";
import { LineChartOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Stats = () => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const sourcePagination = () => {
    if (location.pathname === "/profile_user") {
      return true;
    } else if (location.pathname === "/profile_competition") {
      return false;
    } else {
      return false;
    }
  };

  const navigateButton = () => {
    if (location.pathname === "/profile_user") {
      return navigate("profile_user");
    } else if (location.pathname === "/") {
      return navigate("profile_user");
    } else {
      return navigate("/profile_user");
    }
  };

  useEffect(() => {
    const meditions = state.user.profile.corporal_meditions
      .slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created));

    if (location.pathname === "/") {
      setData(meditions.slice(0, 1));
    } else if (location.pathname === "/profile_competition") {
      setData(meditions.slice(0, 3));
    } else {
      setData(meditions);
    }

    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [location.pathname, state.user.profile.corporal_meditions]);

  return (
    <div className="premium-card" style={{ width: "100%", height: "100%" }}>
      <Table
        size="small"
        bordered={false}
        style={{ width: "100%" }}
      title={() => (
        <Flex gap="small" justify="space-between" align="center">
          <Flex gap="small" align="center">
            <LineChartOutlined style={{ color: "#12E3C2" }} />
            <span style={{ fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>Mediciones Corporales</span>
          </Flex>
          <Button
            size="small"
            type="text"
            onClick={navigateButton}
            disabled={location.pathname === "/profile_user"}
            style={{ 
              fontSize: "11px", 
              background: "rgba(18, 227, 194, 0.1)",
              color: "#12E3C2",
              fontWeight: "600",
              height: "24px",
              padding: "0 8px"
            }}
          >
            {state.user.profile.corporal_meditions.length} mediciones
          </Button>
        </Flex>
      )}
      columns={[
        {
          name: "created",
          title: <span style={{ whiteSpace: "nowrap", fontSize: "11px", fontWeight: "600", color: "#666" }}>Fecha / Hora</span>,
          dataIndex: "created",
          width: "35%",
          render: (d) => (
            <div style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: "500", color: "#333" }}>{d.slice(0, 10)}</span>
              <span style={{ 
                marginLeft: "8px", 
                fontSize: "10px", 
                opacity: 0.7,
                fontWeight: 400,
                color: "#666"
              }}>
                {d.slice(11, 16)} hrs.
              </span>
            </div>
          ),
        },
        {
          name: "fat",
          title: <span style={{ whiteSpace: "nowrap", fontSize: "11px", fontWeight: "600", color: "#666" }}>{isMobile ? "grasa" : "% Grasa"}</span>,
          dataIndex: "fat",
          width: "20%",
          align: "center",
          render: (value) => (
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#12E3C2" }}>
              {value ? parseFloat(value).toFixed(1) : value}
            </span>
          ),
        },
        {
          name: "weight",
          title: <span style={{ whiteSpace: "nowrap", fontSize: "11px", fontWeight: "600", color: "#666" }}>{isMobile ? "peso" : "Peso(kg)"}</span>,
          dataIndex: "weight",
          width: "20%",
          align: "center",
          render: (value) => (
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#0A8CCF" }}>
              {value ? parseFloat(value).toFixed(1) : value}
            </span>
          ),
        },
        {
          name: "height",
          title: <span style={{ whiteSpace: "nowrap", fontSize: "11px", fontWeight: "600", color: "#666" }}>{isMobile ? "altura" : "Altura(mt)"}</span>,
          dataIndex: "height",
          width: "25%",
          align: "center",
          render: (value) => (
            <span style={{ fontSize: "12px", fontWeight: "500", color: "#666" }}>
              {value ? parseFloat(value).toFixed(2) : value}
            </span>
          ),
        },
      ]}
      dataSource={data}
      pagination={sourcePagination()}
    />
    </div>
  );
};

export default Stats;
