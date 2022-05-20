import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  video: [],
  playlistModal: false,
  videoTobeAdded: {},
  searchInput: "",
  category: "All",
};
export const getAllVideo = createAsyncThunk("video/getAllVideo", async () => {
  try {
    const res = await axios.get("/api/videos");
    return res.data.videos;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addNewVideo: (state, action) => {
      return { ...state, video: action.payload };
    },
    changeCategory: (state, action) => {
      return { ...state, category: action.payload };
    },
    search: (state, action) => {
      return { ...state, searchInput: action.payload };
    },
    playlistModal: (state) => {
      return { ...state, playlistModal: !state.playlistModal };
    },
    videoTobeAdded: (state, action) => {
      return { ...state, videoTobeAdded: action.payload };
    },
  },
  extraReducers: {
    [getAllVideo.fulfilled]: (state, action) => {
      state.video = action.payload;
    },
  },
});

export const {
  addNewVideo,
  changeCategory,
  videoTobeAdded,
  search,
  playlistModal,
} = videoSlice.actions;
export const getVideo = (state) => state.video;
export default videoSlice.reducer;
