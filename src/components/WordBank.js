/** @format */

import React, { useState, useEffect } from "react";
import * as Draggable2 from "react-draggable";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	wordContainer: {
		"&:hover": {
			cursor: "-webkit-pointer",
			cursor: " pointer",
		},
		"&:active": {
			cursor: "-webkit-grabbing",
			cursor: "grabbing",
		},
	},
});

function App({
	width,
	setZoom,
	duration,
	columns,
	setColumns,
	skipAhead,
	fontSize,
	clickToChange,
}) {
	const classes = useStyles();

	//* to Calculate the new location as the user zoom
	useEffect(() => {
		let a = 0;
		let tempArr = columns.second.items;
		for (let index = 0; index < tempArr.length; index++) {
			a = (tempArr[index].location / 100) * width;
			tempArr[index].position.x = a - tempArr[index].parentWidth;
		}
		setColumns({
			...columns,
			second: { ...columns.second, items: [...tempArr] },
		});
		let containerWidth = document.querySelector(".react-waves").offsetWidth;
		setContainerWidth(containerWidth);
	}, [width]);

	//* to scroll Left for the first time for the word band container
	useEffect(() => {
		let el2 = document.getElementById("wordbank-continer");
		el2.scrollLeft = 1000000;
	}, []);
	let [containerWidth, setContainerWidth] = useState(0);

	//* called every time when the user stop draging
	const eventLogger = (data, index) => {
		const tempArr = columns.second.items;

		tempArr[index].position.x = data.x;
		//* calculate the location in temrms of percentage
		tempArr[index].location = Math.abs(
			((data.x + tempArr[index].parentWidth) / width) * 100
		);
		//* calculte the timeStamp
		let timeStamp = (duration / width) * (data.x + tempArr[index].parentWidth);
		//jumping to that time stamp in audio
		// eslint-disable-next-line no-unused-expressions
		clickToChange ? skipAhead(undefined, timeStamp) : undefined;
		//updating the timeStamp
		tempArr[index].timeStamp = timeStamp;
		setColumns({
			...columns,
			second: { ...columns.second, items: [...tempArr] },
		});
		console.log("width", width);
		console.log("duration", duration);
		console.log("Data:", data.x);
		console.log("location:", tempArr[index].location);
		console.log("position:", tempArr[index].position);

		console.log("timeStamp", timeStamp);
		// console.log("index", index);
	};

	return (
		<div style={{ width: containerWidth }}>
			<div
				id={"wordbank-continer"}
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignContent: "center",
					// fontWeight: "bold",
					overflowX: "auto",
					flexDirection: "row-reverse",
					background: "lightblue",
					// padding: 4,
					minHeight: 50,
				}}
			>
				{columns.first.items.map((item, index) => {
					let color = "transparent";
					if (columns.second.items.length === index) {
						color = "red";
					} else if (columns.second.items.length > index) {
						color = "#28a745";
					}
					return (
						<div
							style={{
								color: "black",
								backgroundColor: color,
								textAlign: "center",
								justifyContent: "center",
								userSelect: "none",
								padding: 3,
								margin: "2px 0",
								// maxHeight: "50px",
								fontSize: `${fontSize}px`,
								fontFamily: "quran_common",
							}}
						>
							{item.word}
						</div>
					);
				})}
			</div>

			<div
				id="dnd-container"
				className="box"
				style={{
					height: "150px",
					overflowX: "hidden",
					overflowY: "hidden",
					// width:`${width/(zoom)}px`,
					// border: "1px solid yellow",
				}}
			>
				<div
					id={"word-container"}
					onDoubleClick={() => setZoom("in")}
					onContextMenu={(e) => {
						e.preventDefault();
						setZoom("out");
					}}
					style={{
						display: "flex",
						overflow: "hidden",
						flexWrap: "wrap",
						width: `${width}px`,
						background: "rgb(69, 108, 134,0.2)",
						height: "300px",
					}}
				>
					{Object.values(columns)[1]
						.items.map((item, index) => {
							return (
								<Draggable2
									axis="x"
									defaultPosition={item.position}
									position={item.position}
									onStop={(e: MouseEvent, data: Object) => {
										console.log("data.x", data.x);
										eventLogger(
											{
												x: data.x,
												y: data.y,
											},
											index
										);
									}}
									bounds="parent"
								>
									<div
										className={classes.wordContainer}
										style={{
											height: "40%",
											padding: "10px 0",
											paddingTop: "0",
											borderLeft: "2px solid #28a745",
										}}
									>
										<div
											className={"badge badge-success"}
											style={{
												padding: "5px",
												fontWeight: "normal",
												fontSize: `15px`,
												borderRadius: "0px",
												color: "white",
												borderLeft: "0px",
											}}
											onDoubleClick={() => setZoom("in")}
											onContextMenu={(e) => {
												e.preventDefault();
												setZoom("out");
											}}
										>
											{item.word}
										</div>
										<div>{item.id}</div>
									</div>
								</Draggable2>
							);
						})
						.reverse()}
				</div>
			</div>
		</div>
	);
}

export default App;
