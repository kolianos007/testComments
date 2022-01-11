import React, { FC } from "react";

interface IButton {
  type: "button" | "submit";
  buttonName: string;
  onClick?: () => void;
}

const Button: FC<IButton> = ({ type, buttonName, onClick }) => {
  return (
    <button onClick={onClick} className="button-styled" type={type}>
      {buttonName}
    </button>
  );
};

export default Button;
