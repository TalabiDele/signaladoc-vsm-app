import React from "react";
import Buttons from "./Buttons";
import "./General.scss";

const Modal = ({
	text,
	btnType,
	btn,
	btnText,
	btnCount,
	icon,
	color,
	bg,
	px,
	header,
	event,
	otherEvent,
	btnText2,
	btnType2,
	bg2,
	color2,
	px2,
}) => {
	return (
		<div className=" fixed top-0 right-0 z-[3] bg-black bg-opacity-70 w-[100vw] h-[100vh] flex items-center justify-center">
			<div className=" rounded-md bg-white w-[20rem] text-center flex flex-col items-center p-[1rem]">
				<div className=" mb-[2rem] ">{icon}</div>
				<p className=" medium">{header}</p>
				<p className=" text-text_gray mb-[1rem]">{text}</p>
				{btn && (
					<div
						className={` ${btnCount === 2 && "flex"} ${
							btnType === "text" && "flex justify-end w-[100%] text-lg"
						} ${
							btnType2 === "text" &&
							"flex justify-between items-center max-md:flex-col w-[70%]"
						}`}
					>
						<Buttons
							text={btnText}
							border={btnType}
							bg={bg}
							color={color}
							px={px}
							event={event}
						/>
						{btnCount === 2 && (
							<Buttons
								text={btnText2}
								border={btnType2}
								bg={bg2}
								color={color2}
								px={px2}
								event={otherEvent}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
