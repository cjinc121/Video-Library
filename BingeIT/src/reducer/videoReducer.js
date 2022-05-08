const videoInitialState = {
  video: [],
  playlistModal: false,
  videoTobeAdded: {},
  category: "All",
};
const videoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_VIDEO":
      return { ...state, video: action.payload };
    case "PLAYLIST_MODAL":
      return { ...state, playlistModal: !state.playlistModal };
    case "VIDEO_TO_BE_ADDED":
      return { ...state, videoTobeAdded: action.payload };
  }
};
export { videoReducer, videoInitialState };
