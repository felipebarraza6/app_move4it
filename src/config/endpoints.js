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

const blog_list = async (type, competition) => {
  if (type === undefined) type = "";
  const request = await methods.GET(
    `blogs/?type=${type}&competence=${competition}`
  );
  return request.data;
};

const list_register_activities = async () => {
  const request = await methods.GET("register-activities/");
  return request.data;
};

const create_register_activity = async (data) => {
  const request = await methods.POST("register-activities/", data);
  return request.data;
};

const update_register_activity = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "file" && data[key][0] && data[key][0].originFileObj) {
      formData.append(key, data[key][0].originFileObj);
    } else {
      formData.append(key, data[key]);
    }
  }

  const request = await methods.PATCH(
    `register-activities/${data.id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return request.data;
};

const delete_register_activity = async (data) => {
  const request = await methods.DELETE(`register-activities/${data.id}/`);
  return request.data;
};

const retrieve_register_activity = async (interval, interval_exact, user) => {
  const request = await methods.GET(
    `register-activities/?interval=${interval}&interval_exact=${interval_exact}&user=${user}`
  );
  return request.data;
};

// Nuevas funciones para competence
const list_competences = async () => {
  const request = await methods.GET("competences/");
  return request.data;
};

const retrieve_competence = async (id) => {
  const request = await methods.GET(`competences/${id}/`);
  return request.data;
};

const retrieve_competence_stats = async (id) => {
  const request = await methods.GET(`competences/${id}/stats/`);
  return request.data;
};

export const endpoints = {
  auth: {
    login: login,
    profile: get_profile,
    update_user: update_user,
    reset_password: update_password,
  },
  register_activities: {
    list: list_register_activities,
    create: create_register_activity,
    update: update_register_activity,
    delete: delete_register_activity,
    retrieve: retrieve_register_activity,
  },
  blog: {
    list: blog_list,
  },
  // Añadir endpoints para competence
  competence: {
    list: list_competences,
    retrieve: retrieve_competence,
    retrieveStats: retrieve_competence_stats, // NEW: For lazy loading stats
  },
};
