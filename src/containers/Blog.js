import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tooltip, Drawer } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { endpoints } from "../config/endpoints";

const Blog = ({ type }) => {
  const [visible, setVisible] = useState(false); // initialize state for Drawer visibility
  const [blogSingle, setBlogSingle] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const showDrawer = (blog) => {
    setBlogSingle({ ...blog });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
const getBlogs = async () => {
      const request = await endpoints.blog.list(type).then((x) => {
        setBlogs(x.results);
      });
    };


  useEffect(() => {
        getBlogs();
  }, []);


  return (
    <div>
      <Row justify={"space-around"}>
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
      </Row>
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
    </div>
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