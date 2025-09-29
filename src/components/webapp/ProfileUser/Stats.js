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
    <Table
      size="small"
      bordered
      style={{
        width: isMobile ? "100%" : location.pathname !== "/" ? "100%" : "40%",
      }}
      title={() => (
        <Flex gap="small" justify="space-between">
          <Flex gap="small">
            <LineChartOutlined />
            <strong>Mediciones Corporales</strong>
          </Flex>
          <Button
            size="small"
            type="dashed"
            onClick={navigateButton}
            disabled={location.pathname === "/profile_user"}
          >
            {state.user.profile.corporal_meditions.length} mediciones
          </Button>
        </Flex>
      )}
      columns={[
        {
          name: "created",
          title: "Fecha",
          dataIndex: "created",
          width: "25%",
          render: (d) => (
            <Flex gap="small" vertical>
              <div> {d.slice(0, 10)}</div>
              <div>
                {" "}
                <b>{d.slice(11, 16)} hrs.</b>
              </div>
            </Flex>
          ),
        },
        {
          name: "fat",
          title: isMobile ? "grasa" : "% Grasa",
          dataIndex: "fat",
          width: "25%",
          align: "center",
          render: (value) => (value ? parseFloat(value).toFixed(2) : value),
        },
        {
          name: "weight",
          title: isMobile ? "peso" : "Peso(kg)",
          dataIndex: "weight",
          width: "25%",
          align: "center",
          render: (value) => (value ? parseFloat(value).toFixed(2) : value),
        },
        {
          name: "height",
          title: isMobile ? "altura" : "Altura(mt)",
          dataIndex: "height",
          width: "25%",
          align: "center",
          render: (value) => (value ? parseFloat(value).toFixed(2) : value),
        },
      ]}
      dataSource={data}
      pagination={sourcePagination()}
    />
  );
};

export default Stats;
