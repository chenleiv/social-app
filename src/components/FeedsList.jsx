import React, { useState, useCallback } from "react";
import { ReactComponent as Likes } from "../assets/img/likes.svg";
import { ReactComponent as Thumbs } from "../assets/img/thumbs-up.svg";
import { ReactComponent as ThumbsBlue } from "../assets/img/thumbs-blue.svg";
import { ReactComponent as Message } from "../assets/img/message.svg";

const FeedsList = React.memo(({ posts, addComment, user }) => {
  const dayjs = require("dayjs");
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const [isLiked, setIsLiked] = useState(false);

  const setLikedPost = useCallback(() => setIsLiked(!isLiked), [isLiked]);

  return (
    <div className='feed-list'>
      {posts?.map(
        ({
          id,
          name,
          avatar,
          text,
          countComments,
          countLiked,
          createdAt,
          img,
          userCommentAvatar,
          userCommentName,
          userCommentText,
        }) => {
          let date = dayjs(createdAt).fromNow();

          return (
            <div key={id}>
              <div className='feeds-item'>
                <div className='avatar-section'>
                  <img className='avatar' src={avatar} alt='avatar' />
                  <div>
                    <div className='name'>{name}</div>
                    <div className='date'>{date}</div>
                  </div>
                </div>
                <div className='text'>{text ? text : "*No Text Insert*"}</div>

                <img
                  className='feed-img'
                  src={img ? img : "../assets/img/no-image.png"}
                  alt='img'
                />
                <div className='comments-section'>
                  <div className='counts'>
                    <div className='like-logo'>
                      <Likes /> {countLiked} Likes
                    </div>
                    <div> {countComments} Comments</div>
                  </div>
                  <div className='separator'></div>

                  <div className='reactions-container'>
                    <div className='reactions'>
                      <span
                        onClick={setLikedPost}
                        className={isLiked ? "did-like" : ""}
                      >
                        {isLiked ? <ThumbsBlue /> : <Thumbs />}
                        Like
                      </span>
                      <span>
                        <Message />
                        Comment
                      </span>
                    </div>
                    <div className='separator'></div>

                    <div className='comments-container'>
                      {userCommentText && (
                        <div className='users-comments-container'>
                          <img
                            className='avatar'
                            src={userCommentAvatar}
                            alt='avatar'
                          />

                          <div className='users-comments'>
                            <div className='user-name'>{userCommentName}</div>
                            {userCommentText}
                          </div>
                        </div>
                      )}

                      <div className='comment-input'>
                        <img
                          className='avatar'
                          src={user.avatar}
                          alt='avatar'
                        />
                        <input
                          type='text'
                          placeholder='Write a comment...'
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
});

export default FeedsList;
