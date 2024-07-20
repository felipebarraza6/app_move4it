import React, { useContext } from "react";
import { Table } from "antd";
import { AppContext } from "../../../App";

const Stats = () => {
  const { state } = useContext(AppContext);

  var meditions = state.user.profile.corporal_meditions;

  return (
    <Table
      size="small"
      bordered
      title={() => (
        <h3 style={{ marginLeft: "10px" }}>Mediciones Corporales</h3>
      )}
      columns={[
        {
          name: "created",
          title: "Fecha",
          dataIndex: "created",
          render: (d) => `${d.slice(0, 10)} / ${d.slice(11, 16)} hrs. `,
        },
        { name: "fat", title: "% Grasa", dataIndex: "fat" },
        { name: "weight", title: "Peso", dataIndex: "weight" },
        { name: "height", title: "Altura", dataIndex: "height" },
      ]}
      dataSource={meditions}
    />
  );
};

export default Stats;
