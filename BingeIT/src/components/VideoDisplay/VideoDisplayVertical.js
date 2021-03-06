import VideoVertical from "../Videoinfo/vertical/VideoVertical";
import "./VideoDisplayVertical.css";
import {
  searchFilter,
  categoryFilter,
} from "../../services/category&searchfilter";
import { useSelector } from "react-redux";
import { getVideo } from "../../features/video/videoSlice";
function VideoDisplayVertical() {
  const videoState = useSelector(getVideo);
  const { video, category, searchInput } = videoState;
  const categoryVideo = categoryFilter(category, video);
  const filterVideo = searchFilter(searchInput, categoryVideo);
  return (
    <div className="video-display-vertical">
      {filterVideo.length > 0 ? (
        filterVideo.map((vid) => {
          return <VideoVertical video={vid} key={vid._id} />;
        })
      ) : (
        <h3>Try a better search</h3>
      )}
    </div>
  );
}

export { VideoDisplayVertical };
