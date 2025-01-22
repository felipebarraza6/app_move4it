import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../App";
import { Descriptions, Button, Card, Flex } from "antd";
import {
  CalendarFilled,
  CalendarOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const IntervalsTable = () => {
  const { state } = useContext(AppContext);
  const intervals =
    state.user.enterprise_competition_overflow.last_competence
      .intervals_to_back;

  const [currentInterval, setCurrentInterval] = useState(0);

  const nextInterval = () => {
    setCurrentInterval((prevInterval) => prevInterval + 1);
  };

  const previousInterval = () => {
    setCurrentInterval((prevInterval) => prevInterval - 1);
  };

  useEffect(() => {
    setCurrentInterval(0);
  }, [intervals]);

  return (
    <Flex vertical style={{ width: "100%" }}>
      {intervals.length > 0 && (
        <Card
          key={intervals[currentInterval].interval_id}
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(185,189,201,1) 81%)",
          }}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item
              label={
                <>
                  <CalendarOutlined style={{ marginRight: 8 }} /> Fecha inicio
                </>
              }
            >
              {intervals[currentInterval].start_date}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <CalendarFilled style={{ marginRight: 8 }} /> Fecha termino
                </>
              }
            >
              {intervals[currentInterval].end_date}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <CalendarFilled style={{ marginRight: 8 }} /> Pruebas
                </>
              }
            >
              <ul>
                {intervals[currentInterval].activities.map(
                  (activity, index) => (
                    <li key={index}>{activity}</li>
                  )
                )}
              </ul>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      <Flex gap="small" justify="center" style={{ marginTop: "10px" }}>
        <Button
          shape="round"
          type="primary"
          onClick={nextInterval}
          disabled={currentInterval >= intervals.length - 1}
        >
          <ArrowLeftOutlined />
          Anterior
        </Button>
        <Button
          shape="round"
          type="primary"
          onClick={previousInterval}
          disabled={currentInterval === 0}
        >
          Siguiente <ArrowRightOutlined />
        </Button>
      </Flex>
    </Flex>
  );
};

export default IntervalsTable;
