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

  var points = "S/P";

  const enterprise = state.user.enterprise_competition_overflow.name;
  var name_team = null;

  if (state.user.group_participation.name) {
    name_team = state.user.group_participation.name;
  }

  var position = "S/R";
  if (state.user.enterprise_competition_overflow.last_competence.ranking) {
    var _ob =
      state.user.enterprise_competition_overflow.last_competence.ranking.teams;
    var get_points = _ob.find((team) => team.team_name === name_team);
    points = get_points?.points;
    position = get_points?.position;
  }

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
          {position && (
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
