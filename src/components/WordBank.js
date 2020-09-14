/** @format */

import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as Draggable2 from "react-draggable";

function App({
	width,
	setZoom,
	duration,
	columns,
	setColumns,
	skipAhead,
	moveWordFromTopToBottom,
	fontSize,
	clickToChange,
}) {
	// to Calculate the new location as the user zoom
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
	}, [width]);

	// to scroll Left for the first time for the word band container
	useEffect(() => {
		let el2 = document.getElementById("wordbank-continer");
		el2.scrollLeft = 1000000;
		let containerWidth = document.querySelector(".react-waves").offsetWidth;
		setContainerWidth(containerWidth);
	}, []);
	let [containerWidth, setContainerWidth] = useState(0);
	// called every time when the user stop draging
	const eventLogger = (data, index) => {
		const tempArr = columns.second.items;
		if (data.y < 45) {
			data.y = 1;
		} else {
			data.y = 91;
		}
		tempArr[index].position = data;
		// calculate the location in temrms of percentage
		tempArr[index].location = Math.abs(
			((data.x + tempArr[index].parentWidth) / width) * 100
		);
		// calculte the timeStamp
		let timeStamp =
			(duration / width) * (data.x + tempArr[index].parentWidth + 3);
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
		console.log("Data:", data.x + 3);
		console.log("location:", tempArr[index].location);
		console.log("position:", tempArr[index].position);

		console.log("timeStamp", timeStamp);
		// console.log("index", index);
	};

	// called as the word is draged from the wordbank to the
	const onDragEnd = (result) => {
		console.log("the result is ", result);
		if (!result.destination) return;
		const { source, destination } = result;
		if (source.droppableId !== destination.droppableId) {
			let el2 = document.querySelector("#word-container").children;
			let temp = 0;
			for (let index = 0; index < el2.length; index++) {
				temp += el2[index].offsetWidth;
			}

			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			let el = document.getElementById("dnd-container").scrollLeft;
			removed.position.x = el + 3;
			removed.parentWidth = temp;
			destItems.splice(destination.index, 0, removed);

			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			});
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			});
		}
	};

	return (
		<div style={{ width: containerWidth }} >
		
			<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
				<div key={"first"}>
					<Droppable droppableId={"first"} key={"first"} direction="horizontal">
						{(provided, snapshot) => {
							return (
								<div
									id={"wordbank-continer"}
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={{
										display: "flex",
										// flexWrap: "wrap",
										overflowX: "auto",
										background: snapshot.isDraggingOver
											? "lightblue"
											: "lightgrey",
										// padding: 4,
										minHeight: 50,
									}}
								>
									{Object.values(columns)[0].items.map((item, index) => {
										return (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided, snapshot) => {
													return (
														<div 
															onClick={() => {
																moveWordFromTopToBottom(undefined, index);
															}}
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={{
																textAlign: "center",
																justifyContent: "center",
																userSelect: "none",
																padding: 5,
																margin: "0 0 8px 0",
																// maxHeight: "50px",
																backgroundColor: snapshot.isDragging
																	? "#263B4A"
																	: "#456C86",
																fontSize: `${fontSize}px`,
																color: "white",
																...provided.draggableProps.style,
															}}
														>
															{item.word}
														</div>
													);
												}}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>

					<div
						id="dnd-container"
						className="box"
						style={{
							height: "200px",
							overflowX: "hidden",
							overflowY: "hidden",
							// width:`${width/(zoom)}px`,
							// border: "1px solid yellow",
						}}
					>
						<Droppable
							droppableId={"second"}
							key={"second"}
							direction="horizontal"
						>
							{(provided, snapshot) => {
								return (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
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
											background: snapshot.isDraggingOver
												? "rgb(69, 108, 134,0.2)"
												: "rgb(69, 108, 134,0.1)",
											// minHeight: 50,
											height: "300px",
											
											// border: "2px solid blue",
										}}
									>
										{Object.values(columns)[1]
											.items.map((item, index) => {
												return (
													<Draggable2
														// axis="x"
														// handle=".handle"
														defaultPosition={item.position}
														position={item.position}
														// grid={[25, 25]}
														// onStart={eventLogger}
														// onDrag={eventLogger}
														onStop={(e: MouseEvent, data: Object) => {
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
															style={{
																// marginLeft: item.position.y < 40 ?  `${"-20px"}` : "0px",
																height: item.position.y < 40 ? "0px" : "40%",
																// width: "50px",
																// position:"absolute",
																padding: "10px 0",
																paddingTop: "0",
																borderLeft:
																	item.position.y < 40
																		? "2px solid white"
																		: "2px solid #28a745",
															}}
														>
															<div
																className={
																	item.position.y < 40
																		? "badge badge-dark"
																		: "badge badge-success"
																}
																style={{
																	padding: "5px",
																	fontWeight: "normal",
																	fontSize: `${fontSize}px`,
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
								);
							}}
						</Droppable>
					</div>
				</div>
			</DragDropContext>
		</div>
	);
}

export default App;
