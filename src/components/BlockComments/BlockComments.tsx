import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendComment, CommentPost } from "..";
import commentsActions from "../../store/actions/commentsActions";
import { AppStateType } from "../../store/reducers";
import { IComment } from "../../types/types";

const BlockComments = () => {
  const dispatch = useDispatch();
  const { comments, replies } = useSelector(({ comments }: AppStateType) => {
    return {
      comments: comments.comments,
      replies: comments.replies,
    };
  });
  const updated = useSelector(
    ({ comments }: AppStateType) => comments.isUpdate
  );

  const editHandler = (id: number, obj: IComment) => {
    axios.put(`/comments/${id}`, obj);
    dispatch(commentsActions.updateComment(!updated));
  };
  const deleteHandler = (id: number) => {
    axios.delete(`/comments/${id}`);
    dispatch(commentsActions.updateComment(!updated));
  };

  return (
    <div className="block-comments">
      <SendComment />
      {comments.map((comment) => (
        <div className="comment-block" key={comment.id}>
          <CommentPost
            type="comment"
            avatarSize="120"
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            {...comment}
          />
          {replies.map((reply) => {
            return reply.commentId === comment.id ? (
              <CommentPost
                type="reply"
                avatarSize="88"
                author={comment.name}
                key={reply.id}
                {...reply}
              />
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
};

export default BlockComments;
