import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  logInHandlerService,
  signUpHandlerService,
} from "../../services/authCalls";
import {
  addVideoToHistoryServices,
  getHistoryServices,
  removeAllVideoFromHistoryService,
  removeVideoFromHistoryService,
} from "../../services/historyCalls";
import {
  addVideoToLikesServices,
  getLikesServices,
  removeVideoFromLikesService,
} from "../../services/likesCalls";
import {
  addVideoToPlaylistService,
  createNewPlaylistService,
  deletePlaylistService,
  getPlaylistService,
  getVideoInPlaylistService,
  removeVideoFromPlaylistService,
} from "../../services/playlistCalls";
import {
  addVideoToWatchLaterServices,
  getWatchLaterServices,
  removeVideoFromWatchLaterService,
} from "../../services/watchlaterCalls";
const token = localStorage.getItem("token");

const initialState = {
  isUserLoggedIn: token ? true : false,
  tokenVal: token,
  user: {},
  playlists: [],
  watchlater: [],
  history: [],
  likes: [],
};

export const createNewPlaylist = createAsyncThunk(
  "/auth/createNewPlaylist",
  async ({ playlistData, tokenVal }) => {
    try {
      const { data } = await createNewPlaylistService(playlistData, tokenVal);
      return data.playlists;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const deletePlaylist = createAsyncThunk(
  "/auth/deletePlaylist",
  async ({ id, tokenVal }) => {
    try {
      const { data } = await deletePlaylistService(id, tokenVal);
      return data.playlists;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const addVideoToPlaylist = createAsyncThunk(
  "/auth/addVideoToPlaylist",
  async ({ id, video, tokenVal }) => {
    try {
      const { data } = await addVideoToPlaylistService(id, video, tokenVal);
      return data.playlist;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const deleteVideoFromPlaylist = createAsyncThunk(
  "/auth/deleteVideoFromPlaylist",
  async ({ id, videoId, tokenVal }) => {
    try {
      const { data } = await removeVideoFromPlaylistService(
        id,
        videoId,
        tokenVal
      );
      return data.playlist;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const addVideoToWatchLater = createAsyncThunk(
  "/auth/addVideoToWatchLater",
  async ({ video, tokenVal }) => {
    try {
      const { data } = await addVideoToWatchLaterServices(video, tokenVal);
      return data.watchlater;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const removeVideoFromHistory = createAsyncThunk(
  "/auth/removeVideoFromHistory",
  async ({ id, tokenVal }) => {
    try {
      const { data } = await removeVideoFromHistoryService(id, tokenVal);
      return data.history;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const removeVideoFromWatchLater = createAsyncThunk(
  "/auth/removeVideoFromWatchLater",
  async ({ id, tokenVal }) => {
    try {
      const { data } = await removeVideoFromWatchLaterService(id, tokenVal);
      return data.watchlater;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const addVideoToHistory = createAsyncThunk(
  "/auth/addVideoToHistory",
  async ({ video, tokenVal }) => {
    try {
      const { data } = await addVideoToHistoryServices(video, tokenVal);
      return data.history;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const removeAllVideoFromHistory = createAsyncThunk(
  "/auth/removeAllVideoFromHistory",
  async ({ tokenVal }) => {
    try {
      const { data } = await removeAllVideoFromHistoryService(tokenVal);
      return data.history;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const removeVideoFromLikes = createAsyncThunk(
  "/auth/removeVideoFromLikes",
  async ({ id, tokenVal }) => {
    try {
      const { data } = await removeVideoFromLikesService(id, tokenVal);
      return data.likes;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const addVideoToLikes = createAsyncThunk(
  "/auth/addVideoToLikes",
  async ({ video, tokenVal }) => {
    try {
      const { data } = await addVideoToLikesServices(video, tokenVal);
      return data.likes;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const getLikes = createAsyncThunk(
  "/auth/getLikes",
  async ({ tokenVal }) => {
    try {
      const { data } = await getLikesServices(tokenVal);
      return data.likes;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const getVideoInPlaylist = createAsyncThunk(
  "/auth/getVideoInPlaylist",
  async ({ id, tokenVal }) => {
    try {
      const { data } = await getVideoInPlaylistService(id, tokenVal);
      return data.playlist;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const getPlaylist = createAsyncThunk(
  "/auth/getPlaylist",
  async ({ tokenVal }) => {
    try {
      const res = await getPlaylistService(tokenVal);
      return res.data.playlists;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const getWatchLater = createAsyncThunk(
  "/auth/getWatchLater",
  async ({ tokenVal }) => {
    try {
      const res = await getWatchLaterServices(tokenVal);
      return res.data.watchlater;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const getHistory = createAsyncThunk(
  "/auth/getHistory",
  async ({ tokenVal }) => {
    try {
      const res = await getHistoryServices(tokenVal);
      return res.data.history;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const logIn = createAsyncThunk(
  "/auth/logIn",
  async ({ email, password }) => {
    try {
      const res = await logInHandlerService(email, password);
      localStorage.setItem("token", res.data.encodedToken);

      return res.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const signUp = createAsyncThunk(
  "/auth/signUp",
  async ({ first, last, email, password }) => {
    try {
      const data = await signUpHandlerService(first, last, email, password);
      localStorage.setItem("token", data.encodedToken);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    endSession: (state) => {
      return {
        ...state,
        isUserLoggedIn: false,
        user: {},
        playlists: [],
        watchlsater: [],
        history: [],
        likes: [],
      };
    },
  },
  extraReducers: {
    [createNewPlaylist.fulfilled]: (state, action) => {
      state.playlists = action.payload;
    },
    [deletePlaylist.fulfilled]: (state, action) => {
      state.playlists = action.payload;
    },
    [addVideoToPlaylist.fulfilled]: (state, action) => {
      state.playlists = state.playlists.map((playlist) =>
        playlist._id === action.payload._id
          ? { ...playlist, videos: action.payload.videos }
          : playlist
      );
    },
    [deleteVideoFromPlaylist.fulfilled]: (state, action) => {
      state.playlists = state.playlists.map((playlist) =>
        playlist._id === action.payload._id
          ? { ...playlist, videos: action.payload.videos }
          : playlist
      );
    },
    [addVideoToWatchLater.fulfilled]: (state, action) => {
      state.watchlater = action.payload;
    },
    [removeVideoFromHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [removeVideoFromWatchLater.fulfilled]: (state, action) => {
      state.watchlater = action.payload;
    },
    [addVideoToHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [removeAllVideoFromHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [removeVideoFromLikes.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
    [addVideoToLikes.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
    [getLikes.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
    [getVideoInPlaylist.fulfilled]: (state, action) => {
      state.playlists = state.playlists.map((playlist) =>
        playlist._id === action.payload._id ? action.payload : playlist
      );
    },
    [getPlaylist.fulfilled]: (state, action) => {
      state.playlists = action.payload;
    },
    [getHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [getWatchLater.fulfilled]: (state, action) => {
      state.watchlater = action.payload;
    },
    [logIn.fulfilled]: (state, action) => {
      (state.tokenVal = action.payload.encodedToken),
        (state.isUserLoggedIn = true),
        (state.user = action.payload.foundUser),
        (state.playlists = action.payload.foundUser.playlists),
        (state.watchlater = action.payload.foundUser.watchlater),
        (state.history = action.payload.foundUser.history),
        (state.likes = action.payload.foundUser.likes);
    },
    [signUp.fulfilled]: (state, action) => {
      return {
        ...state,
        tokenVal: action.payload.encodedToken,
        isUserLoggedIn: true,
        user: action.payload.createdUser,
        playlists: action.payload.createdUser.playlists,
        watchlater: action.payload.createdUser.watchlater,
        history: action.payload.createdUser.history,
        likes: action.payload.createdUser.likes,
      };
    },
  },
});

export const { clearHistory, endSession } = authSlice.actions;
export const getAuth = (state) => state.auth;
export default authSlice.reducer;
