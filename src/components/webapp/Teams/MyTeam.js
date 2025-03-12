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
  const name = state.user.group_participation.name;

  const select_interval =
    state.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data.id;

  const historical_data =
    state.user.enterprise_competition_overflow.last_competence.stats
      .historical_data;

  const historical_data_last = historical_data[historical_data.length - 1];

  var points = "0";

  if (
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
  ) {
    points =
      state.user.enterprise_competition_overflow.last_competence.stats.my_team
        .points;
  }

  var position = "0";
  if (
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
  ) {
    position =
      state.user.enterprise_competition_overflow.last_competence.stats.my_team
        .position;
  }
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
          {select_interval !== historical_data_last.interval_id && (
            <>
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
            </>
          )}
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
