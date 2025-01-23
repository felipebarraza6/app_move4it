import React, { useContext } from "react";
import { List, Typography, Tag, Card, Flex } from "antd";
import { TrophyFilled } from "@ant-design/icons";
import { AppContext } from "../../../App";

const { Text } = Typography;

const Ranking = () => {
  const { state } = useContext(AppContext);
  const name_my_team =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team
      .name;
  console.log(name_my_team);
  const teams =
    state.user.enterprise_competition_overflow.last_competence.stats.teams;

  const data = teams.map((team, index) => ({
    key: index,
    position: index + 1,
    name: team.name,
    points: team.points,
  }));

  return (
    <Card
      size="small"
      style={{
        background:
          "linear-gradient(0deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
      }}
    >
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ textAlign: "left" }}>
            <Flex justify="start" style={{ width: "100%" }}>
              <Tag color={item.name === name_my_team ? "blue-inverse" : "blue"}>
                {item.position}
              </Tag>
              <Tag color={item.name === name_my_team ? "blue-inverse" : "blue"}>
                {item.name}
              </Tag>
              <Tag color={item.name === name_my_team ? "blue-inverse" : "blue"}>
                {item.points}
              </Tag>
            </Flex>
          </List.Item>
        )}
        header={
          <Text style={{ fontSize: "20px", color: "white" }}>
            {" "}
            <TrophyFilled
              style={{ color: "#d4b106", marginRight: "10px" }}
            />{" "}
            Ranking
          </Text>
        }
      />
    </Card>
  );
};

export default Ranking;
