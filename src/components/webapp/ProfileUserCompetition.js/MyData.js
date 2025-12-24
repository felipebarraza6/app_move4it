import React, { useContext, useState, useEffect } from "react";
import { parseDateYMDLocal } from "../../../utils/date";
import { Card, Descriptions } from "antd";
import { AppContext } from "../../../App";

const MyData = () => {
  const { state } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  const title = `${state.user.first_name
    .charAt(0)
    .toUpperCase()}${state.user.first_name.slice(1)} ${state.user.last_name
    .charAt(0)
    .toUpperCase()}${state.user.last_name.slice(1)}`;

  const date_of_birth = state.user.date_of_birth || "1990-01-01";
  const date = new Date();

  const age = Math.floor(
    (date - parseDateYMDLocal(date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <Card
      title={title}
      size="small"
      extra={`@${state.user.username}`}
      style={{
        width: isMobile ? "100%" : "50%",
        background:
          "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
      }}
    >
      <Descriptions bordered size="small">
        <Descriptions.Item label="Edad" span={3}>
          {age} Años
        </Descriptions.Item>
        <Descriptions.Item label="Empresa" span={3}>
          {state.user.enterprise_competition_overflow.name.toUpperCase()}
        </Descriptions.Item>
        <Descriptions.Item label="Equipo" span={3}>
          {state.user.group_participation.name.toUpperCase()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default MyData;
