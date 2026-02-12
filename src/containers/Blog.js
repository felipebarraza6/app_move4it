import React, { useState, useEffect, useContext } from "react";
import { Card, Drawer, Button, Flex } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
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
        background: "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
        border: "1px solid rgba(10, 95, 224, 0.2)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
      }}
      extra={
        <Button
          icon={<PaperClipOutlined />}
          type="primary"
          onClick={() => navigate("/blog")}
          style={{
            background: "#0A5FE0",
            border: "1px solid rgba(18, 227, 194, 0.4)",
            borderRadius: "6px"
          }}
        >
          Blog
        </Button>
      }
    >
      <Flex
        justify={window.innerWidth < 768 ? "center" : "start"}
        gap="large"
        wrap="wrap"
      >
        {blogs.map((blog, index) => (
          <Card
            key={index}
            className={`stagger-item delay-${(index % 5) + 1}`}
            style={styles.card}
            onClick={() => showDrawer(blog)}
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
              title={<span style={{ color: '#052240', fontWeight: '700' }}>{blog.title}</span>}
              description={
                <span style={{ fontSize: '12px', color: 'rgba(5, 34, 64, 0.7)' }}>
                  {blog.description1.substring(0, 100) + "..."}
                </span>
              }
            />
          </Card>
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
          style={{ borderRadius: "8px" }}
          alt="img"
        />

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
    background: "linear-gradient(135deg, rgba(10, 95, 224, 0.3) 0%, rgba(18, 227, 194, 0.2) 100%)",
    border: "1px solid rgba(10, 95, 224, 0.15)",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(10, 95, 224, 0.8)",
  },
  img: {
    width: "100%",
  },
};

export default Blog;
