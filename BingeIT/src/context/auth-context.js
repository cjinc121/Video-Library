import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authInitialState, authReducer } from "../reducer/authReducer";
import {
  logInHandlerService,
  signUpHandlerService,
} from "../services/authCalls";
import {
  addVideoToHistoryServices,
  getHistoryServices,
  removeAllVideoFromHistoryService,
  removeVideoFromHistoryService,
} from "../services/historyCalls";
import {
  addVideoToLikesServices,
  getLikesServices,
  removeVideoFromLikesService,
} from "../services/likesCalls";
import {
  getPlaylistService,
  getVideoInPlaylistService,
  removeVideoFromPlaylistService,
} from "../services/playlistCalls";
import {
  addVideoToWatchLaterServices,
  getWatchLaterServices,
  removeVideoFromWatchLaterService,
} from "../services/watchlaterCalls";
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  const getPlaylistHandler = async () => {
    const res = await getPlaylistService(authState.tokenVal);
    if (res.status === 200)
      authDispatch({ type: "UPDATE_PLAYLISTS", payload: res.data.playlists });
  };
  const deleteVideoFromPlaylistHandler = async (id, videoId) => {
    try {
      const { data, status } = await removeVideoFromPlaylistService(
        id,
        videoId,
        authState.tokenVal
      );
      if (status === 200)
        authDispatch({
          type: "DELETE_VIDEO_FROM_PLAYLIST",
          payload: data.playlist,
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getVideoInPlaylistHandler = async (id) => {
    const res = await getVideoInPlaylistService(id, authState.tokenVal);
    if (res.status === 200)
      authDispatch({
        type: "UPDATE_PLAYLIST",
        payload: res.data.playlist,
      });
  };

  const getHistoryHandler = async () => {
    const res = await getHistoryServices(authState.tokenVal);
    if (res.status === 200)
      authDispatch({ type: "UPDATE_HISTORY", payload: res.data.history });
  };
  const getWatchLaterHandler = async () => {
    const res = await getWatchLaterServices(authState.tokenVal);
    if (res.status === 200)
      authDispatch({ type: "UPDATE_WATCHLATER", payload: res.data.watchlater });
  };
  const getLikesHandler = async () => {
    const { data, status } = await getLikesServices(authState.tokenVal);

    if (status === 200)
      authDispatch({
        type: "UPDATE_LIKES",
        payload: data.likes,
      });
  };
  const addVideoToHistoryHandler = async (video) => {
    const { data, status } = await addVideoToHistoryServices(
      video,
      authState.tokenVal
    );
    if (status === 201)
      authDispatch({ type: "UPDATE_HISTORY", payload: data.history });
  };
  const addVideoToWatchLaterHandler = async (video) => {
    const { data, status } = await addVideoToWatchLaterServices(
      video,
      authState.tokenVal
    );
    if (status === 201)
      authDispatch({ type: "UPDATE_WATCHLATER", payload: data.watchlater });
  };
  const addVideoToLikesHandler = async (video) => {
    const { data, status } = await addVideoToLikesServices(
      video,
      authState.tokenVal
    );

    if (status === 201)
      authDispatch({ type: "UPDATE_LIKES", payload: data.likes });
  };
  const removeVideoFromHistoryHandler = async (id) => {
    const { data, status } = await removeVideoFromHistoryService(
      id,
      authState.tokenVal
    );
    if (status === 200)
      authDispatch({ type: "UPDATE_HISTORY", payload: data.history });
  };
  const removeAllVideoFromHistoryHandler = async () => {
    const { data, status } = await removeAllVideoFromHistoryService(
      authState.tokenVal
    );
    if (status === 200)
      authDispatch({ type: "UPDATE_HISTORY", payload: data.history });
  };
  const removeVideoFromWatchLaterHandler = async (id) => {
    const { data, status } = await removeVideoFromWatchLaterService(
      id,
      authState.tokenVal
    );
    if (status === 200)
      authDispatch({ type: "UPDATE_WATCHLATER", payload: data.watchlater });
  };
  const removeVideoFromLikesHandler = async (id) => {
    const { data, status } = await removeVideoFromLikesService(
      id,
      authState.tokenVal
    );

    if (status === 200)
      authDispatch({ type: "UPDATE_LIKES", payload: data.likes });
  };
  const logInHandler = async ({ email, password }) => {
    const res = await logInHandlerService(email, password);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.encodedToken);
      authDispatch({ type: "CREATE_SESSION", payload: res.data });

      navigate("/");
    }
  };

  const signUpHandler = async ({ first, last, email, password }) => {
    const data = await signUpHandlerService(first, last, email, password);
    localStorage.setItem("token", data.encodedToken);
    authDispatch({ type: "START_SESSION", payload: data });
    navigate("/");
  };

  const signOutHandler = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "END_SESSION" });
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        logInHandler,
        signUpHandler,
        signOutHandler,
        getPlaylistHandler,
        getVideoInPlaylistHandler,
        deleteVideoFromPlaylistHandler,
        getWatchLaterHandler,
        addVideoToWatchLaterHandler,
        removeVideoFromWatchLaterHandler,
        getLikesHandler,
        removeVideoFromLikesHandler,
        addVideoToLikesHandler,
        getHistoryHandler,
        addVideoToHistoryHandler,
        removeVideoFromHistoryHandler,
        removeAllVideoFromHistoryHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider, useAuth };
