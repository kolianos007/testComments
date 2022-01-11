import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Avatar, CommentForm } from "..";
import { AppStateType } from "../../store/reducers";

const SendComment: FC = () => {
  const { avatar } = useSelector(
    ({ profile }: AppStateType) => profile.profile
  );
  return (
    <div className="send-comment">
      <Avatar size="120" url={avatar} />
      <CommentForm type="comment" />
    </div>
  );
};

export default SendComment;
