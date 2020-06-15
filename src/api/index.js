import axios from "axios";
import Cookies from "js-cookie";
import { setCookiesExpired } from "../helper";

export const baseUrl = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL
});

baseUrl.interceptors.request.use((config) => {
    config.headers["authorization"] = `Bearer ${Cookies.get("access_jwt")}`;

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = 'multipart/form-data'
      config.headers['Accept'] = 'multipart/form-data'
    } 
    else {
      config.headers["Content-Type"] = 'application/json'
    }

    return config;
});

baseUrl.interceptors.response.use(
  (res) => {
    // console.log("\x1b[33m%s\x1b[0m", `response success`, res)

    return res;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // console.log(error.config);

      let result;

      await unauthorizedHandler(error);
      await callingAgain(error.config.url, error.config.method).then((res) => {
        // console.log(res)
        result = res;
      });

      return result;
    } else {
      if (process.env.REACT_APP_DEBUG) {
        // console.log("\x1b[33m%s\x1b[0m", `${error.response.data.error} / ${error.response.status}`)
      }

      return Promise.reject(error);
    }

    // Promise.reject(error)
  }
);

const unauthorizedHandler = async () => {
  return requestNewToken().then((res) => {
    return Promise.resolve(res);
  });
};

const newToken = axios.create();
const requestNewToken = async () => {
  return new Promise((resolve, reject) => {
    newToken({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}api/info`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("refresh_jwt")}`,
      },
      data: {
        access_jwt: Cookies.get("access_jwt"),
      },
    })
      .then((res) => {
        // console.log(res)
        Cookies.set("access_jwt", res.data.access_jwt, {
          expires: setCookiesExpired(process.env.REACT_APP_ACCESS_TOKEN_EXPIRED),
          domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
        });
        Cookies.set("refresh_jwt", res.data.refresh_jwt, {
          expires: setCookiesExpired(process.env.REACT_APP_REFRESH_TOKEN_EXPIRED),
          domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
        });

        if (process.env.REACT_APP_DEBUG) {
          console.log("\x1b[33m%s\x1b[0m", "New Access Token :", Cookies.get("access_jwt"));
          console.log("\x1b[33m%s\x1b[0m", "New Refresh Token :", Cookies.get("refresh_jwt"));
        }

        resolve(res);
      })
      .catch((error) => {
        if (process.env.REACT_APP_DEBUG) {
          console.log("\x1b[33m%s\x1b[0m", "error requesting new token", error.response);
        }

        reject(error.response);
      });
  });
};

const callingAgain = async (url, method) => {
  return new Promise((resolve, reject) => {
    baseUrl(
      {
        url: url,
        method: method,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_jwt")}`,
        },
      }
    )
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("\x1b[33m%s\x1b[0m", `server return error because of : ${error.response.data.error}`);
          return reject(error);
        } else {
          console.log("\x1b[33m%s\x1b[0m", `server return error because of : ${error.response.data.error} / ${error.response.status}`);
          return reject(error);
        }
      });
  });
};
