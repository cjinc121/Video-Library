import React from "react";
import { VideoHorizontal } from "../Videoinfo/horizontal/VideoHorizontal";
import "./VideoDisplayHorizontal.css";
function VideoDisplayHorizontal({ videos, title }) {
  return (
    <div>
      <div className="page-info">
        <h4>{title}</h4> &#9734;
        <p>
          {videos.length}
          {videos.length > 1 ? "Videos" : "Video"}
        </p>
      </div>
      {videos.length === 0 ? (
        <h3>There is no video in the playlist</h3>
      ) : (
        <div className="video-display-horizontal">
          {videos.map((video) => {
            return (
              <div className="video-container" key={video._id}>
                <VideoHorizontal video={video} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { VideoDisplayHorizontal };
