import axios from "axios";

//LOGIN
export const logInHandlerService = async (email, pass) => {
  try {
    const res = await axios.post("/api/auth/login", {
      email: email,
      password: pass,
    });

    return res;
  } catch (error) {
    console.log("Invalid email or password", error);
  }
};

//signup
export const signUpHandlerService = async (first, last, email, pass) => {
  try {
    const { data } = await axios.post(`/api/auth/signup`, {
      firstName: first,
      lastName: last,
      email: email,
      password: pass,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
