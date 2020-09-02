/** @format */

import React, { useState, useEffect } from "react";

import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

export default function Main({ ayaWord, zoom }) {
	let [width, setWidth] = useState(720);

	useEffect(() => {
		let el = document.querySelector("canvas") || 360;

		let resizeObserver = new ResizeObserver(() => {
			setWidth(el.getBoundingClientRect().width);
			console.log("AAAAAOOOOOOOOGGGG");
		});

		resizeObserver.observe(el);
	}, [width]);

	const eventLogger = (e: MouseEvent, data: Object) => {
		console.log("Event: ", e);
		console.log("Data: ", data);
	};

	return (
		<div
			id="dnd-container"
			className="box"
			style={{
				height: "200px",
				// maxWidth: "740px",
				position: "relative",
				overflowX: "auto",
				overflowY: "hidden",
				padding: "0",
				margin: "auto",
				// border: "1px solid yellow",
			}}
			onScroll={(e) => {
				let el = document.getElementById("dnd-container");
				// console.log(el.scrollLeft);

				let wel = document.querySelector("wave");
				wel.scrollLeft = el.scrollLeft;
			}}
		>
			<div
				style={{
					height: "300px",
					width: `${width }px`,
					padding: "10px",
					border: "2px solid green",
					display: "flex",
					// flexDirection: "row-reverse",
					flexWrap: "wrap"
				}}
			>
				{ayaWord.map((single, index) => (
					<Draggable
						// axis="x"
						// handle=".handle"
						// defaultPosition={{ x: 0, y: 0 }}
						// position={null}
						// grid={[25, 25]}
						// onStart={eventLogger}
						// onDrag={eventLogger}
						// onStop={eventLogger}
						bounds="parent"
					>
						<div
							style={{
								height: "50px",
								// width: "50px",
								padding: "10px",
								border: "2px solid red",
							}}
						>
							{single.word}
						</div>
					</Draggable>
				))}
			</div>
		</div>
	);
}
