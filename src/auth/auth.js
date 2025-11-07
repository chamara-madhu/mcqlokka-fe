import { USER_ROLES } from "../constants/base";

export const auth_token = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("auth_token")) {
      return localStorage.getItem("auth_token");
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const isAdmin = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("user_data") &&
      JSON.parse(localStorage.getItem("user_data")).role === USER_ROLES.ADMIN
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const isStudent = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("user_data") &&
      JSON.parse(localStorage.getItem("user_data")).role === USER_ROLES.STUDENT
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
