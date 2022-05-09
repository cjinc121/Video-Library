import axios from "axios";

export const getWatchLaterServices = async (token) => {
  try {
    const res = await axios.get("/api/user/watchlater", {
      headers: {
        authorization: token,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addVideoToWatchLaterServices = async (video, token) => {
  try {
    const res = await axios.post(
      "/api/user/watchlater",
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

export const removeVideoFromWatchLaterService = async (id, token) => {
  try {
    const res = await axios.delete(`/api/user/watchlater/${id}`, {
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
