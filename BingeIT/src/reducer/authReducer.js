const token = localStorage.getItem("token");

const authInitialState = {
  isUserLoggedIn: token ? true : false,
  tokenVal: token,
  user: {},
  playlists: [],
  watchlater: [],
  history: [],
  likes: [],
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIKES":
      return { ...state, likes: action.payload };
    case "UPDATE_WATCHLATER":
      return { ...state, watchlater: action.payload };
    case "UPDATE_HISTORY":
      return { ...state, history: action.payload };
    case "UPDATE_PLAYLISTS":
      return { ...state, playlists: action.payload };
    case "UPDATE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.payload._id ? action.payload : playlist
        ),
      };
    case "CREATE_NEW_PLAYLIST":
      return {
        ...state,
        playlists: action.payload,
      };
    case "DELETE_PLAYLIST":
      return { ...state, playlists: action.payload };
    case "ADD_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.payload._id
            ? { ...playlist, videos: action.payload.videos }
            : playlist
        ),
      };
    case "DELETE_VIDEO_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.payload._id
            ? { ...playlist, videos: action.payload.videos }
            : playlist
        ),
      };
    case "CREATE_SESSION":
      return {
        ...state,
        tokenVal: action.payload.encodedToken,
        isUserLoggedIn: true,
        user: action.payload.foundUser,
        playlists: action.payload.foundUser.playlists,
        watchlater: action.payload.foundUser.watchlater,
        history: action.payload.foundUser.history,
        likes: action.payload.foundUser.likes,
      };
    case "START_SESSION":
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
    case "END_SESSION":
      return {
        ...state,
        isUserLoggedIn: false,
        user: {},
        playlists: [],
        watchlsater: [],
        history: [],
        likes: [],
      };
    default:
      return { ...state };
  }
};
export { authReducer, authInitialState };
