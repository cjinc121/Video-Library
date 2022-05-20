import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { getVideo } from "../../features/video/videoSlice";

function VideoPage() {
  const { videoid } = useParams();
  const videoState = useSelector(getVideo);
  const { video } = videoState;
  const newVideo = video.find((vid) => vid._id === videoid);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <VideoCard video={newVideo} />
    </div>
  );
}

export { VideoPage };
