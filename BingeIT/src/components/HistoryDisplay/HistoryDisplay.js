import React from "react";
import { useAuth } from "../../context/auth-context";
import { HistoryCard } from "../HistoryCard/HistoryCard";
import "./HistoryDisplay.css";
function HistoryDisplay({ videos }) {
  const { removeAllVideoFromHistoryHandler } = useAuth();
  return (
    <div className="history-container">
      <div className="page-info">
        <h4>History</h4>
        &#9734;
        <p>{videos.length} Video</p>
        <button
          className="clear-button"
          onClick={() => removeAllVideoFromHistoryHandler()}
        >
          Clear All
        </button>
      </div>
      {videos.length === 0 ? (
        <h3>There is no video in the List</h3>
      ) : (
        <div className="history-videos">
          {videos &&
            videos.map((video) => {
              return (
                <div key={video._id} className="history-card">
                  <HistoryCard video={video} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export { HistoryDisplay };
