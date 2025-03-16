import React, { useContext } from "react";
import { Row, Col, Typography, Flex } from "antd";
import FormData from "../components/webapp/ProfileUser/FormData";
import Stats from "../components/webapp/ProfileUser/Stats";
import UpdatePassword from "../components/webapp/ProfileUser/UpdatePassword";
import { AppContext } from "../App";

const { Title } = Typography;

const ProfileUser = () => {
  const { state } = useContext(AppContext);
  return (
    <Flex
      justify="space-around"
      vertical={window.innerWidth > 900 ? false : true}
    >
      <Col>
        <FormData />
        <UpdatePassword />
      </Col>
      <Col style={{ marginTop: "10px" }}>
        <Stats />
      </Col>
    </Flex>
  );
};

const styles = {
  col: {
    padding: "20px 10px 0px 0",
  },
};

export default ProfileUser;
