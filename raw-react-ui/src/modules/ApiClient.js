import axios from "axios";
import appConfig from "../config/app";
import { normalizeUrl } from "../utils";
import { UserTokenStorage } from "../storage";

export default class Client {
  headers = {};
  baseUrl = "";

  constructor(properties = {}) {
    const { headers = {}, baseUrl = "/" } = properties;
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  extendRequest(requestSettings) {
    requestSettings.baseUrl = this.baseUrl;
    requestSettings.headers = {
      ...this.headers,
      ...requestSettings.headers
    };
  }

  request(requestSettings) {
    this.extendRequest(requestSettings);
    return Client.request(requestSettings);
  }

  get(url = "", params = {}, options = {}) {
    return this.request({
      method: "get",
      url,
      params,
      ...options
    });
  }

  post(url = "", data = {}, options = {}) {
    return this.request({
      method: "post",
      url,
      data,
      ...options
    });
  }

  put(url = "", data = {}, options = {}) {
    return this.request({
      method: "put",
      url,
      data,
      ...options
    });
  }

  delete(url = "", options = {}) {
    return this.request({
      method: "delete",
      url,
      ...options
    });
  }

  static request(requestSettings) {
    return new Promise((resolve, reject) => {
      requestSettings.method = requestSettings.method || "get";
      requestSettings.url = normalizeUrl(
        appConfig.API_ENDPOINT,
        requestSettings.baseUrl || "",
        requestSettings.url || ""
      );
      requestSettings.headers = {
        ...Client.getSessionHeaders(),
        ...requestSettings.headers
      };
      axios(requestSettings)
        .then(response => {
          if (appConfig.DEBUG) {
            // eslint-disable-next-line no-console
            console.log(
              "Request Settings: ",
              requestSettings,
              "Response Data",
              response.data
            );
          }
          resolve(response.data);
        })
        .catch(error => {
          const errorResponse = error.response ? error.response : {};
          const responseData = errorResponse.data;
          console.log(responseData);
          return reject(responseData);
        });
    });
  }

  static get(url = "", params = {}, options = {}) {
    return Client.request({
      method: "get",
      url,
      params,
      ...options
    });
  }

  static post(url = "", data = {}, options = {}) {
    return Client.request({
      method: "post",
      url,
      data,
      ...options
    });
  }

  static put(url = "", data = {}, options = {}) {
    return Client.request({
      method: "put",
      url,
      data,
      ...options
    });
  }

  static delete(url = "", options = {}) {
    return Client.request({
      method: "delete",
      url,
      ...options
    });
  }

  static getSessionHeaders() {
    const headers = {};
    const userToken = UserTokenStorage.get();
    if (userToken) {
      headers["user-token"] = `${userToken}`;
    }
    return headers;
  }
}
