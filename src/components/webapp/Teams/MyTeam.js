import React, { useContext } from "react";

import { Flex, Card, Descriptions } from "antd";
import { AppContext } from "../../../App";
import {
  TrophyFilled,
  OrderedListOutlined,
  BuildTwoTone,
} from "@ant-design/icons";

const MyTeam = () => {
  const { state } = useContext(AppContext);
  const name =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .name;
  const points =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .points;
  const position =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .position;
  console.log(state.user.enterprise_competition_overflow.name);
  const enterprise = state.user.enterprise_competition_overflow.name;
  return (
    <Flex>
      <Card
        title={name}
        style={{
          width: 300,
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(185,189,201,1) 81%)",
        }}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item
            label={
              <>
                <OrderedListOutlined style={{ color: "green" }} /> Puntos
              </>
            }
          >
            {points}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <TrophyFilled style={{ color: "#d4b106" }} /> Ranking
              </>
            }
          >
            #{position}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <BuildTwoTone style={{ color: "#d4b106" }} /> Empresa
              </>
            }
          >
            {enterprise.toUpperCase()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Flex>
  );
};

export default MyTeam;
