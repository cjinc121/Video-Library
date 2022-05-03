import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const VideoContext = createContext();
const useVideo = () => useContext(VideoContext);
const VideoContextProvider = ({ children }) => {
  const [video, setVideo] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/videos");
      setVideo(res.data.videos);
    })();
  }, []);
  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
export { VideoContextProvider, useVideo };
