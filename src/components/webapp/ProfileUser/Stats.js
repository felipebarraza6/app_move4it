import React, { useContext, useState, useEffect } from "react";
import { Table, Flex, Button } from "antd";
import { AppContext } from "../../../App";
import { LineChartOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Stats = () => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  var meditions = state.user.profile.corporal_meditions
    .slice()
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  const [data, setData] = useState(meditions);

  const sourcePagination = () => {
    if (location.pathname === "/profile_user") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (location.pathname !== "/profile_user") {
      setData(meditions.slice(0, 1));
    }
  }, []);

  return (
    <Table
      size="small"
      bordered
      
      title={() => (
        <Flex gap="small" justify="space-between">
          <Flex gap="small">
            <LineChartOutlined />
            <strong>Mediciones Corporales</strong>
          </Flex>
          <Button
            size="small"
            type="dashed"
            onClick={() => navigate("profile_user")}
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
          render: (d) => `${d.slice(0, 10)} / ${d.slice(11, 16)} hrs. `,
        },
        { name: "fat", title: "% Grasa", dataIndex: "fat" },
        { name: "weight", title: "Peso(kg)", dataIndex: "weight" },
        { name: "height", title: "Altura(mt)", dataIndex: "height" },
      ]}
      dataSource={data}
      pagination={sourcePagination()}
    />
  );
};

export default Stats;
