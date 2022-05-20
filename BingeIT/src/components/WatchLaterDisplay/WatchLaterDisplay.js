import React from "react";
import { WatchLaterCard } from "../WatchLaterCard/WatchLaterCard";
import "./WatchLaterDisplay.css";
function WatchLaterDisplay({ videos }) {
  return (
    <div className="watchlater-container">
      <div className="page-info">
        <h4>Watch Later</h4>
        &#166;&#166; <p>{videos.length} Video</p>
      </div>
      {videos.length === 0 ? (
        <h3>There is no video in the List</h3>
      ) : (
        <div className="watchlater-videos">
          {videos.map((video) => {
            return (
              <div key={video._id} className="watchlater-card">
                <WatchLaterCard video={video} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { WatchLaterDisplay };
