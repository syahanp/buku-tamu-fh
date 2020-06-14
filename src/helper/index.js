/* eslint-disable array-callback-return */
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../api";
import ErrorToast from "./component/ErrorToast";

import "./component/helper.scss";

export const formatNumber = (num) => {
    if (typeof num === 'string' || typeof num === 'number')  {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    else {
      return num
    }
};

export const setCookiesExpired = (minutes) => {
	let date = new Date();
	date.setTime(date.getTime() + minutes * 60 * 1000);

	return date;
};

export const handleFormErrorResponse = (data) => {
    if (Array.isArray(data) && data.length > 1) {
        let store = []
        data.map((x, i) => {
            store = [...store, <li key={i}>{x.message}</li>]
        })

        return <div className='error_response_box'>{store}</div> 
    }

    return <center className='error_response_box'>{data[0].message}</center>
}

export const setLastVisit = () => {
	if (window.location.pathname === "/") {
		Cookies.remove("lastVisit");
	} 
	else {
		Cookies.set(
			"lastVisit",
			{
				origin: window.origin,
				pathname: window.location.pathname,
				search: window.location.search,
				fullpath: `${window.origin}${window.location.pathname}${window.location.search}`,
			},
			{
				expires: setCookiesExpired(30),
				domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
			}
		);
	}
};

export const removeLastVisit = () => {
  	Cookies.remove("lastVisit");
};

export const toastError = () => {
	toast.error(<ErrorToast />, {
		className: "connection_error_toast",
		autoClose: false,
		hideProgressBar: true,
		position: "bottom-center",
	});
};

export const toastInfo = (msg, autoClose) => {
	toast.info(msg, {
		autoClose: autoClose,
		hideProgressBar: true,
	});
};

export const toastSuccess = (msg, autoClose) => {
	toast.success(msg, {
		autoClose: autoClose,
		hideProgressBar: true,
	});
};

export const htmlDecode = (input) => {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

// request client info by JWT
export const requestUserInfo = () => {
  baseUrl
    .post(`oauth/info`)
    .then((res) => {
      Cookies.set("client", res.data.profile, {
        domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const requestNewToken = async () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/oauth/request-jwt`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("refresh_jwt")}`,
      },
      data: {
        access_jwt: Cookies.get("access_jwt"),
      },
    })
      .then((res) => {
        Cookies.set("access_jwt", res.data.access_jwt, {
          expires: setCookiesExpired(process.env.REACT_APP_ACCESS_TOKEN_EXPIRED),
          domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
        });
        Cookies.set("refresh_jwt", res.data.refresh_jwt, {
          expires: setCookiesExpired(process.env.REACT_APP_REFRESH_TOKEN_EXPIRED),
          domain: `${process.env.REACT_APP_COOKIES_DOMAIN}`,
        });

        if (process.env.REACT_APP_DEBUG) {
          console.log("\x1b[33m%s\x1b[0m", "New Access Token from Private Route :", Cookies.get("access_jwt"));
          console.log("\x1b[33m%s\x1b[0m", "New Refresh Token from Private Route :", Cookies.get("refresh_jwt"));
        }

        Promise.resolve();
      })
      .catch((error) => {
        if (process.env.REACT_APP_DEBUG) {
          console.log("\x1b[33m%s\x1b[0m", "error requesting new token", error.response);
        }
        Promise.reject();
      });
  });
};

// check if JWT is still valid to request
export const isTokenStillValid = async () => {
  new Promise(() => {
    let tokenIsValid;

    baseUrl
      .get(`/oauth/valid-session`)
      .then((res) => {
        tokenIsValid = res.data.session;
        if (tokenIsValid) {
          Promise.resolve(true);
        } else {
          requestNewToken()
            .then(() => Promise.resolve(true))
            .catch(() => Promise.reject(false));
        }
      })
      .catch((err) => {
        // console.log(err.response);
        Promise.reject(false);
      });
  });
};

export const validateToken = async () => {
  return isTokenStillValid()
    .then(() => {
      Promise.resolve(true);
    })
    .catch(() => {
      Promise.reject(false);
    });
};
