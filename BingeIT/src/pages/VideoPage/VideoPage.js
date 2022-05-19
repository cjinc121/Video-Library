import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useVideo } from "../../context/video-context";

function VideoPage() {
  const { videoid } = useParams();
  const { videoState } = useVideo();
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
