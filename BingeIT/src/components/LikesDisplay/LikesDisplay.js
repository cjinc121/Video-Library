import React from "react";
import { LikesCard } from "../LikesCard/LikesCard";
import "./LikesDisplay.css";
function LikesDisplay({ videos }) {
  return (
    <div className="likes-container">
      <div className="page-info">
        <h4>Liked Videos</h4>
        &#9734;
        <p>{videos.length} Video</p>
      </div>
      {videos.length === 0 ? (
        <h3>There is no video in the List</h3>
      ) : (
        <div className="likes-videos">
          {videos &&
            videos.map((video) => {
              return (
                <div key={video._id} className="likes-card">
                  <LikesCard video={video} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export { LikesDisplay };
