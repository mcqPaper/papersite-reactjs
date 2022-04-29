import axios from "axios";
import { BASE_URL } from "../environment/environment";
import FriendStatus from "./alter";
const customAxios = axios.create({ baseURL: BASE_URL });

/**
* Intercept the request
*/
customAxios.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token", '');
    console.log(`add token`);

    if (token) {
      req.headers["x-access-token"] = token;
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
    const originalReq = err.config;
    console.log(`err`, err.request)

    if (err.request.status === 401) {

      const originalReq = err.config;
      console.log(`request`, originalReq);


      try {
        let output = await axios.post(`${BASE_URL}/api/users/refreshToken`, {
          token: localStorage.getItem("refreshToken", '')
        }).
          then(response => {

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            console.log('new token', response.data.token);
            customAxios.defaults.headers.common["x-access-token"] = response.data.token;
            return customAxios(originalReq);


          })
          .catch(err => {
            console.log(`log out`)
            return FriendStatus()

            // return useFriendStatus()

          })

        return output

      } catch (err) {

        // FriendStatus()
        // let navigate = useNavigate();
        // return navigate("/", { replace: true });
      }
    }
    else {

      return Promise.resolve(err)
    }

  }
);


export default customAxios;
