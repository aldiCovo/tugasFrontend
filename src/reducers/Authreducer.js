const init = {
  id: "",
  name: "",
  email: "",
  age: ""
};

export default (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        age: action.payload.age
      };

    case "EDIT_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        age: action.payload.age
      };

    case "LOGOUT":
      return {
        ...state,
        id: "",
        name: "",
        email: "",
        age: 0
      };

    default:
      return state;
  }
};
