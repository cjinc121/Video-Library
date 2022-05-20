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

  return (
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
export { VideoContextProvider, useVideo };
