import React, { ChangeEvent, KeyboardEvent, FC, useState } from "react";
import { Avatar, CommentForm } from "..";
import { IComment } from "../../types/types";

interface ICommentPost {
  type: "comment" | "reply";
  avatarSize: "120" | "88";
  avatar: string;
  name: string;
  date: number;
  body: string;
  id: number;
  author?: string;
  editHandler?: (id: number, obj: IComment) => void;
  deleteHandler?: (id: number) => void;
}

const convertDate = (date: number) => {
  const d = new Date(date);
  const fixMonth = d.getMonth() + 1;
  return `${d.getFullYear()}-${
    fixMonth < 10 ? "0" + fixMonth : fixMonth
  }-${d.getDate()}`;
};

const CommentPost: FC<ICommentPost> = ({
  id,
  type,
  avatarSize,
  avatar,
  name,
  date,
  body,
  author,
  editHandler,
  deleteHandler,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(body);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEdit(false);
      const editComment: IComment = {
        avatar,
        body: content,
        date: new Date().getTime(),
        id,
        name,
      };
      editHandler && editHandler(id, editComment);
    }
  };

  return (
    <div className={["comment-post", type].join(" ")}>
      <div className="comment-post__wrapper">
        <Avatar size={avatarSize} url={avatar} />
        <div className="comment-post__info">
          <div>
            <span className="comment-post__name">{name}</span>
            {type === "reply" ? (
              <span className="comment-post__author">
                to {author && author}
              </span>
            ) : null}
            <span className="comment-post__date">{convertDate(date)}</span>
          </div>
          <div className="comment-post__text">
            {!isEdit ? (
              body
            ) : (
              <input
                type="text"
                value={content}
                onChange={(e) => onChangeHandler(e)}
                onKeyPress={(e) => onKeyHandler(e)}
              />
            )}
          </div>
          {type === "comment" ? (
            <div className="comment-post__buttons">
              <button onClick={() => setIsEdit(true)}>Edit</button>
              <button onClick={() => deleteHandler && deleteHandler(id)}>
                Delete
              </button>
              <button onClick={() => setShowReply(true)}>Reply</button>
            </div>
          ) : null}
          {showReply && (
            <div className="reply-form">
              <div className="reply-bar">
                <span>to {name}</span>
                <span onClick={() => setShowReply(false)}>Cancel</span>
              </div>
              <CommentForm
                type="reply"
                commentId={id}
                setShowReply={setShowReply}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPost;
