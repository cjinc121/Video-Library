import axios from "axios";

export const createNewPlaylistService = async (playlistData, token) => {
  try {
    const res = await axios.post(
      "/api/user/playlists",
      { playlist: playlistData },
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
export const deletePlaylistService = async (id, token) => {
  try {
    const res = await axios.delete(`/api/user/playlists/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const addVideoToPlaylistService = async (playlistId, video, token) => {
  try {
    const res = await axios.post(
      `/api/user/playlists/${playlistId}`,
      { video },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err.message);
  }
};
export const removeVideoFromPlaylistService = async (
  playlistId,
  videoId,
  token
) => {
  try {
    const res = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
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
