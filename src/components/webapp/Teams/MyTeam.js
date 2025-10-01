import React, { useContext } from "react";

import { Flex, Card, Descriptions } from "antd";
import { AppContext } from "../../../App";
import { TrophyFilled, OrderedListOutlined } from "@ant-design/icons";

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
        title={
          <div
            style={{
              color: "rgba(15,120,142,0.8)",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            {name}
          </div>
        }
        style={{
          width: window.innerWidth > 726 ? "300px" : "100%",
          background:
            "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
          border: "1px solid rgba(15,120,142,0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
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
          <Descriptions.Item label="Empresa">
            {enterprise.toUpperCase()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Flex>
  );
};

export default MyTeam;
