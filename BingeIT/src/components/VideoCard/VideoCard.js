import React from "react";
import "./VideoCard.css";
import { BsX, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
function VideoCard({ video }) {
  return (
    <>
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
              <AiFillLike className="icon" />
              <RiPlayListAddLine className="icon" />
              <MdWatchLater className="icon" />
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
