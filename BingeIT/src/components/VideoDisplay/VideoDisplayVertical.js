import { useVideo } from "../../context/video-context";
import VideoVertical from "../Videoinfo/vertical/VideoVertical";
import "./VideoDisplayVertical.css";
function VideoDisplayVertical() {
  const { video } = useVideo();

  return (
    <div className="video-display-vertical">
      {video.map((vid) => {
        return <VideoVertical video={vid} />;
      })}
    </div>
  );
}

export { VideoDisplayVertical };
