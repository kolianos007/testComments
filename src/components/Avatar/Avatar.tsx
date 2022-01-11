import React, { FC } from "react";

interface IAvatar {
  size: string;
  url: string;
}

const Avatar: FC<IAvatar> = ({ size, url }) => {
  return (
    <div
      className="avatar-wrapper"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img src={url} alt="" />
    </div>
  );
};

export default Avatar;
