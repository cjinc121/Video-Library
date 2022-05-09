import axios from "axios";

export const getLikesServices = async (token) => {
  try {
    const res = await axios.get("/api/user/likes", {
      headers: {
        authorization: token,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addVideoToLikesServices = async (video, token) => {
  try {
    const res = await axios.post(
      "/api/user/likes",
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

export const removeVideoFromLikesService = async (id, token) => {
  try {
    const res = await axios.delete(`/api/user/likes/${id}`, {
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
