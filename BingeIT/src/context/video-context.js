import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { videoInitialState, videoReducer } from "../reducer/videoReducer";
const VideoContext = createContext();
const useVideo = () => useContext(VideoContext);
const VideoContextProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(
    videoReducer,
    videoInitialState
  );
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/videos");
      videoDispatch({ type: "ADD_NEW_VIDEO", payload: res.data.videos });
    })();
  }, []);
  return (
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
export { VideoContextProvider, useVideo };
