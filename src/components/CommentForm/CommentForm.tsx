import axios from "axios";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "..";
import commentsActions from "../../store/actions/commentsActions";
import { AppStateType } from "../../store/reducers";

interface ICommentForm {
  type: "comment" | "reply";
  commentId?: number;
  setShowReply?: Dispatch<SetStateAction<boolean>>;
}

const CommentForm: FC<ICommentForm> = ({ type, commentId, setShowReply }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { updated, comments, replies } = useSelector(
    ({ comments }: AppStateType) => {
      return {
        updated: comments.isUpdate,
        comments: comments.comments,
        replies: comments.replies,
      };
    }
  );
  const profile = useSelector(({ profile }: AppStateType) => profile.profile);
  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const onClickHandler = () => {
    const newComment = {
      ...profile,
      commentId,
      id: type === "comment" ? comments.length + 1 : replies.length + 1,
      body: text,
      date: new Date().getTime(),
    };
    console.log(newComment);
    axios.post(type === "comment" ? `/comments` : `/replies`, newComment);
    dispatch(commentsActions.updateComment(!updated));
    setText("");
    setShowReply && setShowReply(false);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <textarea
        name="message"
        value={text}
        onChange={onChangeInput}
        placeholder="Your message"
      ></textarea>
      <Button onClick={onClickHandler} type="submit" buttonName="Send" />
    </form>
  );
};

export default CommentForm;
