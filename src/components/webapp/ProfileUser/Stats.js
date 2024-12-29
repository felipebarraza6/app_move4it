import React, { useContext } from "react";
import { Table, Flex } from "antd";
import { AppContext } from "../../../App";
import { LineChartOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const Stats = () => {
  const { state } = useContext(AppContext);
  const location = useLocation();
  console.log(location.pathname);

  var meditions = state.user.profile.corporal_meditions
    .slice()
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  return (
    <Table
      size="small"
      bordered
      title={() => (
        <Flex gap="small">
          <LineChartOutlined />
          <strong>Mediciones Corporales</strong>
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
      dataSource={meditions}
      pagination={location.pathname === "/" ? false : true}
    />
  );
};

export default Stats;
