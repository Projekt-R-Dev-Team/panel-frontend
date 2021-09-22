import axios from "axios";
import store from "../store/index";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 30000,
  validateStatus(status) {
    return status >= 200 && status < 300 && status !== 204;
  }
});

http.interceptors.request.use((request) => {
  const scopedRequest = request;
  const token = store.getters["Login/token"]["Login/token"];

  if (token) scopedRequest.headers.Authorization = token;
  return scopedRequest;
});

http.interceptors.response.use(
  (resp) => resp,
  (err) => {
    switch (err.response.status) {
      case 401:
        store.dispatch("Alerts/alert", { type: 'error', title: 'Login failed', message: 'Wrong Username or Password' });
        if (store.getters["Login/isLoggedIn"]) {
          store.dispatch("Login/logout");
        }
        break;
      case 400:
        // Wrong username or password
        console.log("Error 400");
        break;
      case 403:
        store.dispatch("Alerts/alert", { type: 'error', title: 'Auth Error', message: 'Please make sure you have the correct access rights' });
        break;
      case 404:
        store.dispatch("Alerts/alert", { type: 'error', title: 'Not found', message: `Cannot ${(err.response.config.method).toLocaleUpperCase()} ${err.request.responseURL}` });
        break;
      case 500:
        // Error
        console.log("Error 500");
        break;
      case undefined:
        console.log("Error undef");
        //undef error
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

export default http;
