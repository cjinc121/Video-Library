import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useVideo } from "../../context/video-context";

function VideoPage() {
  const { videoid } = useParams();
  const { videoState } = useVideo();
  const { video } = videoState;
  const newVideo = video.find((vid) => vid._id === videoid);

  return (
    <div>
      <VideoCard onevideo={newVideo} />
    </div>
  );
}

export { VideoPage };
