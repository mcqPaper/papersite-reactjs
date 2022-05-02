import axios from "axios";
import { BASE_URL } from "../environment/environment";

const customAxios = axios.create({ baseURL: BASE_URL });
/**
* Intercept the request
*/
customAxios.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token", '');

    if (token) {
      req.headers["Authorization"] = token;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Intercept the response
 */
customAxios.interceptors.response.use(
  res => {
    return res

  },
  async (err) => {

    if (err.request.status === 401) {

      const originalReq = err.config;

      try {

        let output = await axios.post(`${BASE_URL}/api/users/refreshToken`, {
          token: localStorage.getItem("refreshToken", '')
        }).then(response => {

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);


          customAxios.defaults.headers.common["Authorization"] = response.data.token;

          return customAxios(originalReq);


        })
          .catch(err => {
            return {
              isLogout: true
            }

          })

        return output;

      } catch (err) {

      }
    }
    else {

      return Promise.resolve(err)
    }

  }
);

export default customAxios;
