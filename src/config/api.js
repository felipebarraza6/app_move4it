import axios from "axios";
import React from "react"; // Needed for JSX in notification icon
import { notification } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";

// export const BASE_URL = "http://move4it.cl:8000/api/";
export const BASE_URL = "https://api.move4ia.app/api";

export const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

// Request Interceptor: Attach Token
Axios.interceptors.request.use(
  (config) => {
    try {
      const tokenStr = localStorage.getItem("token");
      if (tokenStr) {
        const token = JSON.parse(tokenStr);
        if (token) {
          config.headers.Authorization = `Token ${token}`;
        }
      }
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Errors
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        console.warn("Unauthorized access - clearing session");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Optionally redirect to login or reload to reset app state
        // window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export const POST_LOGIN = async (endpoint, data) => {
  return await Axios.post(endpoint, data);
};

export const POST = async (endpoint, data, config = {}) => {
  return await Axios.post(endpoint, data, config);
};

export const PATCH = async (endpoint, data, config = {}) => {
  return await Axios.patch(endpoint, data, config);
};

export const GET = async (endpoint, config = {}) => {
  return await Axios.get(endpoint, config);
};

export const DELETE = async (endpoint, config = {}) => {
  return await Axios.delete(endpoint, config);
};

export const DOWNLOAD = async (endpoint, name_file) => {
  const config = {
    responseType: "blob",
  };

  try {
    const response = await Axios.get(endpoint, config);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name_file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notification.open({
      message: `${name_file}`,
      description: `Archivo descargado exitosamente!`,
      placement: "topRight",
      icon: <CloudDownloadOutlined style={{ color: "#69802A" }} />,
    });

    return response;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};

const methods = {
  POST_LOGIN,
  GET,
  DOWNLOAD,
  POST,
  PATCH,
  DELETE,
};

export default methods;
