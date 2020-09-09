/** @format */

import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as Draggable2 from "react-draggable";

function App({ width, setZoom, duration, columns, setColumns, skipAhead }) {
	

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
	}, []);

	// called every time when the user stop draging
	const eventLogger = (data, index) => {
		const tempArr = columns.second.items;
		tempArr[index].position = data;
		// calculate the location in temrms of percentage
		tempArr[index].location = Math.abs(
			((data.x + tempArr[index].parentWidth) / width) * 100
		);
		// calculte the timeStamp
		let timeStamp =
			(duration / width) * (data.x + tempArr[index].parentWidth + 3);
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

		console.log("timeStamp", timeStamp);
		// console.log("index", index);
	};
	// called as the word is draged from the wordbank to the
	const onDragEnd = (result, columns, setColumns) => {
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
			// TODO

			let el = document.getElementById("dnd-container").scrollLeft;
			removed.position.x = el + 3;
			removed.parentWidth = temp;

			// TODO
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
	const handleExportData = () => {
		let temp = columns.second.items;
		let tempObj = {};
		temp.forEach((element) => {
			tempObj[element.id] = {
				word: element.word,
				timeStamp: element.timeStamp * 100,
			};
		});
		console.log(tempObj);
	};

	return (
		<div>
			<div>
				{columns.first.items.length === 0 ? (
					<button
						onClick={() => {
							handleExportData();
						}}
					>
						Export Data
					</button>
				) : null}
			</div>
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
			>
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
															onMouseUp={() => console.log("bilal")}
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
							border: "1px solid yellow",
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
											width: `${width}px`,
											background: snapshot.isDraggingOver
												? "rgb(69, 108, 134,0.3)"
												: "transparent",
											// minHeight: 50,
											height: "250px",
											border: "2px solid blue",
											flexWrap: "wrap",
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
														grid={[25, 25]}
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
																height: "40%",
																// width: "50px",
																padding: "10px 0",
																paddingTop: "0",
																borderLeft: "2px solid green",
															}}
														>
															<div
																className="badge badge-success"
																style={{
																	padding: "5px",
																	border: "2px solid green",
																	borderLeft: "none",
																	"&:hover": {
																		background: "#efefef",
																	},
																}}
																onDoubleClick={() => setZoom("in")}
																onContextMenu={(e) => {
																	e.preventDefault();
																	setZoom("out");
																}}
																onClick={() => {
																	skipAhead(undefined, item.timeStamp);
																}}
															>
																{item.word}
															</div>
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
