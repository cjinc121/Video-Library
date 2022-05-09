import axios from "axios";

export const getHistoryServices = async (token) => {
  try {
    const res = await axios.get("/api/user/history", {
      headers: {
        authorization: token,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addVideoToHistoryServices = async (video, token) => {
  try {
    const res = await axios.post(
      "/api/user/history",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const removeVideoFromHistoryService = async (id, token) => {
  try {
    const res = await axios.delete(`/api/user/history/${id}`, {
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const removeAllVideoFromHistoryService = async (token) => {
  try {
    const res = await axios.delete("/api/user/history/all", {
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
