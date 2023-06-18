import React from "react";

const Buttons = ({ text, px, bg, border, color, resonsive }) => {
  return (
    <button
      className={` ${bg} ${border} ${color} py-[0.5rem] rounded-md ${px}`}
    >
      {text}
    </button>
  );
};

export default Buttons;
