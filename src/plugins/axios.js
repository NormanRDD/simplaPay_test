import axios from "axios";

const baseURL =
  process.env.BASE_API_URL || "https://api.sitemap-generator.ru/test-api";

// Aplication
const headers = {
  Accept: "applicatoin/json",
};
const adminHeaders = {
  "X-Application-Token": "wefiEFv_dwDEvf-12Veda_feadvkJbBgh831",
};
const token = localStorage.getItem("token");

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}
// X-Application-Token: wefiEFv_dwDEvf-12Veda_feadvkJbBgh831
const instance = axios.create({
  baseURL,
  headers,
});
const adminInstance = axios.create({
  baseURL: baseURL,
  headers: adminHeaders,
});
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Stripe

adminInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "X-Application-Token": "wefiEFv_dwDEvf-12Veda_feadvkJbBgh831",
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

adminInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(
      error.response.data.message +
        " " +
        "status:" +
        " " +
        error.response.data.statusCode
    );
  }
);

// export { instance };

export { adminInstance as default, instance }
