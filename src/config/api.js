import axios from "axios";

import { notification } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
//export const BASE_URL = "http://move4it.cl:8000/api/";
export const BASE_URL = "https://api.move4it.cl/api";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const POST_LOGIN = async (endpoint, data) => {
  const request = await Axios.post(endpoint, data);
  return request;
};

export const POST = async (endpoint, data) => {
  try {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) {
      throw new Error("No token found");
    }

    const token = JSON.parse(tokenStr);
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
      timeout: 30000, // 30 segundos timeout
    };
    const request = await Axios.post(endpoint, data, options);
    return request;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export const PATCH = async (endpoint, data) => {
  try {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) {
      throw new Error("No token found");
    }

    const token = JSON.parse(tokenStr);
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
      timeout: 30000, // 30 segundos timeout
    };
    const request = await Axios.patch(endpoint, data, options);
    return request;
  } catch (error) {
    console.error("PATCH request error:", error);
    throw error;
  }
};

export const GET = async (endpoint) => {
  try {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) {
      throw new Error("No token found");
    }

    const token = JSON.parse(tokenStr);
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
      timeout: 30000, // 30 segundos timeout
    };
    const request = await Axios.get(endpoint, options);
    return request;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const DOWNLOAD = async (endpoint, name_file) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const download = {
    responseType: "blob",
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const request = await Axios.get(endpoint, download).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name_file);
    document.body.appendChild(link);
    link.click();
  });

  notification.open({
    message: `${name_file}`,
    description: `Archivo descargado exitosamente!`,
    placement: "topRight",
    icon: <CloudDownloadOutlined style={{ color: "#69802A" }} />,
  });

  return request;
};

const methods = {
  POST_LOGIN,
  GET,
  DOWNLOAD,
  POST,
  PATCH,
};

export default methods;
