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

  var meditions = state.user.profile.corporal_meditions
    .slice()
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  const [data, setData] = useState(meditions);

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
    if (location.pathname == "/") {
      setData(meditions.slice(0, 1));
    } else if (location.pathname == "/profile_competition") {
      setData(meditions.slice(0, 3));
    }
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <Table
      size="small"
      bordered
      style={{ width: location.pathname !== "/" && "100%" }}
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
        },
        {
          name: "weight",
          title: isMobile ? "peso" : "Peso(kg)",
          dataIndex: "weight",
        },
        {
          name: "height",
          title: isMobile ? "altura" : "Altura(mt)",
          dataIndex: "height",
        },
      ]}
      dataSource={data}
      pagination={sourcePagination()}
    />
  );
};

export default Stats;
