const videoInitialState = {
  video: [],
  playlistModal: false,
  videoTobeAdded: {},
  searchInput: "",
  category: "All",
};
const videoReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, searchInput: action.payload };
    case "CHANGE_CATEGORY":
      return { ...state, category: action.payload };
    case "ADD_NEW_VIDEO":
      return { ...state, video: action.payload };
    case "PLAYLIST_MODAL":
      return { ...state, playlistModal: !state.playlistModal };
    case "VIDEO_TO_BE_ADDED":
      return { ...state, videoTobeAdded: action.payload };
  }
};
export { videoReducer, videoInitialState };
