import axios from "../config/axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onRegister = (name, age, email, password) => {
  return dispatch => {
    axios
      .post("/users", {
        name,
        age,
        email,
        password
      })
      .then(res => {
        console.log("YEaaaayyy");
      })
      .catch(e => {
        console.log(e.response.data.replace("User validation failed: ", ""));
      });
  };
};

export const onLogin = (email, password) => {
  return async dispatch => {
    try {
      const res = await axios.post("/users/login", { email, password });
      console.log(res);

      cookie.set("masihLogin", res.data.name, { path: "/" });
      cookie.set("idLogin", res.data._id, { path: "/" });
      cookie.set("ageLogin", res.data.age, { path: "/" });
      cookie.set("emailLogin", res.data.email, { path: "/" });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: res.data._id,
          name: res.data.name,
          age: res.data.age,
          email: res.data.email
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const logout = () => {
  cookie.remove("masihLogin");
  cookie.remove("idLogin");
  cookie.remove("ageLogin");
  cookie.remove("emailLogin");
  return {
    type: "LOGOUT"
  };
};

export const onEdit = (name, age, /*email,*/ userId) => {
  return async dispatch => {
    try {
      const res = await axios.patch(`/users/${userId}`, {
        name,
        age
        //email
      });
      cookie.set("masihLogin", res.data.name, { path: "/" });
      cookie.set("idLogin", res.data._id, { path: "/" });
      //cookie.set("emailLogin", res.data.email, { path: "/" });
      cookie.set("ageLogin", res.data.age, { path: "/" });
      dispatch({
        type: "EDIT_SUCCESS",
        payload: {
          id: res.data._id,
          name: res.data.name,
          // email: res.data.email,
          age: res.data.age
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const keepLogin = (name, id, age, email) => {
  if (name === undefined || id === undefined) {
    return {
      type: "KEEP_LOGIN",
      payload: {
        id: "",
        name: "",
        email: "",
        age: 0
      }
    };
  }

  return {
    type: "KEEP_LOGIN",
    payload: {
      id,
      name,
      email,
      age
    }
  };
};
