import axios from "axios";
import methods from "./api";

const login = async (data) => {
  const request = await methods.POST_LOGIN("auth/users/login/", {
    email: data.email,
    password: data.password,
  });

  return request.data;
};

const get_profile = async () => {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const request = await methods.GET(`auth/users/${user.username}/`);
  return request.data;
};

const update_user = async (data) => {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const request = await methods.PATCH(`auth/users/${user.username}/`, data);
  return request.data;
};

const update_password = async (new_password) => {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const request = await methods.POST("auth/users/reset_password/", {
    user: user.email,
    new_password: new_password,
  });
  return request.data;
};

const blog_list = async (type) => {
  if (type === undefined) type = "";
  const request = await methods.GET(`blogs/?type=${type}`);
  return request.data;
};

export const endpoints = {
  auth: {
    login: login,
    profile: get_profile,
    update_user: update_user,
    reset_password: update_password,
  },
  blog: {
    list: blog_list,
  },
};
