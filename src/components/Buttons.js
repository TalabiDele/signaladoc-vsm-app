import React from "react";

const Buttons = ({ text, px, bg, border, color, resonsive, event }) => {
	return (
		<button
			className={` ${bg} ${border} ${color} py-[0.5rem] rounded-md ${px}`}
			onClick={event}
		>
			{text}
		</button>
	);
};

export default Buttons;
