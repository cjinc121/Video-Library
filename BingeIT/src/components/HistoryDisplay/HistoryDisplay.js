import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  removeAllVideoFromHistory,
} from "../../features/auth/authSlice";
import { HistoryCard } from "../HistoryCard/HistoryCard";
import "./HistoryDisplay.css";
function HistoryDisplay({ videos }) {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { tokenVal } = authState;
  const removeAllVideoFromHistoryHandler = () => {
    dispatch(removeAllVideoFromHistory({ tokenVal }));
  };
  return (
    <div className="history-container">
      <div className="page-info">
        <h4>History</h4>
        &#166;&#166;
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
