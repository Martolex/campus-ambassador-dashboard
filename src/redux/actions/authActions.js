import { loginApi } from "../../utils/EndPoints";
import { post } from "../../utils/requests";
import { startLoading, finishLoading } from "./LoadingActions";

export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const MAKE_SELLER = "MAKE_SELLER";

const login = (data) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({ type: LOGOUT });

const invalidLogin = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(startLoading("auth"));
  try {
    const [user] = await post(loginApi, false, { email, password });
    dispatch(login(user));
    dispatch(finishLoading("auth"));
  } catch (err) {
    if (typeof err === "string") {
      dispatch(invalidLogin(err));
    } else {
      dispatch(invalidLogin("Something went wrong. Please Try again Later"));
    }
  }
};
