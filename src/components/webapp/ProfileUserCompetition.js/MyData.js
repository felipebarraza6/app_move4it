import React, { useContext, useState, useEffect } from "react";
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
    (date - new Date(date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <Card
      title={title}
      size="small"
      extra={`@${state.user.username}`}
      style={{
        width: isMobile ? "100%" : "50%",
        background:
          "linear-gradient(31deg, rgba(177,206,223,1) 0%, rgba(147,156,162,0.2805716036414566) 100%)",
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
