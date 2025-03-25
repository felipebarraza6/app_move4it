import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Tooltip, Drawer, Button, Flex } from "antd";
import { EyeFilled, PaperClipOutlined } from "@ant-design/icons";
import { endpoints } from "../config/endpoints";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
const Blog = ({ type }) => {
  const [visible, setVisible] = useState(false); // initialize state for Drawer visibility
  const [blogSingle, setBlogSingle] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const showDrawer = (blog) => {
    setBlogSingle({ ...blog });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const getBlogs = async () => {
    const request = await endpoints.blog
      .list(type, state.user.enterprise_competition_overflow.last_competence.id)
      .then((x) => {
        setBlogs(x.results);
      });
    return request;
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Card
      title={type ? type.toUpperCase() : "Noticias"}
      style={{
        marginTop: "20px",
        background:
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,21,32,0.5438550420168067) 100%)",
      }}
      extra={
        <Button
          icon={<PaperClipOutlined />}
          type="primary"
          onClick={() => navigate("/blog")}
        >
          Blog
        </Button>
      }
    >
      <Flex
        justify={window.innerWidth < 768 ? "center" : "start"}
        gap="large"
        wrap={window.innerWidth < 768 ? "wrap" : "nowrap"}
      >
        {blogs.map((blog, index) => (
          <Col key={index}>
            <Card
              style={styles.card}
              actions={[
                <Tooltip title="Ver noticia">
                  <EyeFilled
                    key="setting"
                    onClick={() => {
                      showDrawer(blog);
                    }}
                  />
                </Tooltip>,
              ]}
              hoverable
              cover={
                blog.principal_img && (
                  <img
                    alt="example"
                    src={blog.principal_img}
                    style={styles.img}
                  />
                )
              }
            >
              <Card.Meta
                title={blog.title}
                description={blog.description1.substring(0, 100) + "..."}
              />
            </Card>
          </Col>
        ))}
      </Flex>
      <Drawer
        title={blogSingle && blogSingle.title}
        placement="right"
        closable={true}
        width={500}
        onClose={onClose}
        open={visible}
      >
        <img
          width={"100%"}
          src={blogSingle && blogSingle.principal_img}
          style={{ borderRadius: "15px" }}
          alt="img"
        />
        <h5>
          {blogSingle && blogSingle.created.slice(0, 10)}{" "}
          {blogSingle && blogSingle.created.slice(11, 16)} hrs.
        </h5>
        <p>{blogSingle && blogSingle.description1}</p>
        <p>{blogSingle && blogSingle.description2}</p>
        <p>{blogSingle && blogSingle.description3}</p>
        <p>{blogSingle && blogSingle.description4}</p>
        <p>{blogSingle && blogSingle.description5}</p>
      </Drawer>
    </Card>
  );
};

const styles = {
  card: {
    width: "250px",
    marginBottom: "20px",
  },
  img: {
    width: "100%",
  },
};

export default Blog;
