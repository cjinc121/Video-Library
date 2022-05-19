import React, { useEffect } from "react";
import "./VideoCard.css";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { useVideo } from "../../context/video-context";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { CreatePlaylist } from "../CreatePlaylistcard/CreatePlaylist";
import VideoVertical from "../Videoinfo/vertical/VideoVertical";
function VideoCard({ video }) {
  const { videoDispatch, videoState } = useVideo();
  const suggestedVideo = videoState.video.filter(
    (vid) => vid.category === video.category && vid._id !== video._id
  );
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                {video.creator} &#166;&#166; {video.views}K
              </p>
            </div>
            <div className="video-icons">
              {isPresent(video._id, authState.likes) ? (
                <AiFillLike
                  className="icon active"
                  onClick={() => {
                    if (isUserLoggedIn) removeVideoFromLikesHandler(video._id);
                    else navigate("/login");
                  }}
                />
              ) : (
                <AiFillLike
                  className="icon"
                  onClick={() => {
                    if (isUserLoggedIn) addVideoToLikesHandler(video);
                    else navigate("/login");
                  }}
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
                  onClick={() => {
                    if (isUserLoggedIn)
                      removeVideoFromWatchLaterHandler(video._id);
                    else navigate("/login");
                  }}
                />
              ) : (
                <MdWatchLater
                  className="icon"
                  onClick={() => {
                    if (isUserLoggedIn) addVideoToWatchLaterHandler(video);
                    else navigate("/login");
                  }}
                />
              )}
            </div>
          </div>
          <div className="suggested-box">
            <div className="suggested-header">Suggested Videos</div>
            <div className="suggested-display">
              {suggestedVideo.map((video) => (
                <VideoVertical video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { VideoCard };
