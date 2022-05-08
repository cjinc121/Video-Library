import { useVideo } from "../../context/video-context";
import VideoVertical from "../Videoinfo/vertical/VideoVertical";
import "./VideoDisplayVertical.css";
function VideoDisplayVertical() {
  const { videoState } = useVideo();
  const { video } = videoState;
  return (
    <div className="video-display-vertical">
      {video.map((vid) => {
        return <VideoVertical video={vid} key={vid._id} />;
      })}
    </div>
  );
}

export { VideoDisplayVertical };
