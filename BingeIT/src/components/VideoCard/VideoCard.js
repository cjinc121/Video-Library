import React from "react";
import "./VideoCard.css";
import { BsX, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { useVideo } from "../../context/video-context";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { CreatePlaylist } from "../CreatePlaylistcard/CreatePlaylist";
function VideoCard({ video }) {
  const { videoDispatch, videoState } = useVideo();
  const {
    authState,
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    removeVideoFromLikesHandler,
    addVideoToLikesHandler,
  } = useAuth();
  const { isUserLoggedIn } = authState;
  const navigate = useNavigate();
  const isPresent = (id, array) => {
    if (array.find((item) => item._id === id)) return true;
    else return false;
  };
  return (
    <>
      {videoState.playlistModal && (
        <div
          className="modal-page"
          onClick={() =>
            videoDispatch({
              type: "PLAYLIST_MODAL",
            })
          }
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <CreatePlaylist />
          </div>
        </div>
      )}
      {video && (
        <div className="video-display-container">
          <div className="video-card-container">
            <div className="video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video._id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-details">
              <h3>{video.title}</h3>
              <p>
                {video.creator} &#9734; {video.views}K
              </p>
            </div>
            <div className="video-icons">
              {isPresent(video._id, authState.likes) ? (
                <AiFillLike
                  className="icon active"
                  onClick={() => removeVideoFromLikesHandler(video._id)}
                />
              ) : (
                <AiFillLike
                  className="icon"
                  onClick={() => addVideoToLikesHandler(video)}
                />
              )}
              <RiPlayListAddLine
                className="icon"
                onClick={() => {
                  if (isUserLoggedIn) {
                    videoDispatch({ type: "PLAYLIST_MODAL" });
                    videoDispatch({
                      type: "VIDEO_TO_BE_ADDED",
                      payload: video,
                    });
                  } else navigate("/login");
                }}
              />
              {isPresent(video._id, authState.watchlater) ? (
                <MdWatchLater
                  className="icon active"
                  onClick={() => removeVideoFromWatchLaterHandler(video._id)}
                />
              ) : (
                <MdWatchLater
                  className="icon"
                  onClick={() => addVideoToWatchLaterHandler(video)}
                />
              )}
            </div>
          </div>
          <div className="comment-box">
            <div className="comment-display">
              <div className="comment-old-container">
                <div className="comment-old">
                  <div className="username">USERNAME</div>
                  <div className="comment-old-user">random comment</div>
                </div>
                <div>
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className="comment-old-container">
                <div className="comment-old">
                  <div className="username">USERNAME</div>
                  <div className="comment-old-user">random comment</div>
                </div>
                <div>
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className="comment-old-container">
                <div className="comment-old">
                  <div className="username">USERNAME</div>
                  <div className="comment-old-user">random comment</div>
                </div>
                <div>
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            <div className="comment-user">
              <div className="username">userName</div>
              <div className="comment-input">
                <input type="text" placeholder="comment" />
                <div className="comment-cross">
                  <BsX />
                </div>
                <button>Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { VideoCard };
