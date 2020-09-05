/** @format */

import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as Draggable2 from "react-draggable";

function App({ ayaWord, width, zoom, duration, diffrenceInWidth }) {
	const columnsFromBackend = {
		first: {
			name: "WordBank",
			items: ayaWord,
		},
		second: {
			name: "Word Placing Space",
			items: [],
		},
	};
	const [columns, setColumns] = useState(columnsFromBackend);
	useEffect(() => {
		let a = 0;
		let tempArr = columns.second.items;
		for (let index = 0; index < tempArr.length; index++) {
			// tempArr[index].location += diffrenceInWidth;
			a = (tempArr[index].location / 100) * width;
			tempArr[index].position.x = a;
		}

		setColumns({
			...columns,
			second: { ...columns.second, items: [...tempArr] },
		});

	}, [width]);

	useEffect(() => {
		let el2 = document.getElementById("wordbank-continer");
		el2.scrollLeft = 1000000;
	}, []);

	const eventLogger = (data, index) => {
		const tempArr = columns.second.items;
		tempArr[index].position = data;
		tempArr[index].location = Math.abs((data.x / width) * 100);

		setColumns({
			...columns,
			second: { ...columns.second, items: [...tempArr] },
		});

		let timeStamp = (duration / width) * (data.x + 3);
		console.log("width", width);
		console.log("duration", duration);
		console.log("Data:", data.x + 3);
		console.log("location:", tempArr[index].location);

		console.log("timeStamp", timeStamp);
		// console.log("index", index);
	};

	const onDragEnd = (result, columns, setColumns) => {
		if (!result.destination) return;
		const { source, destination } = result;
		console.log("THE result id ", result);
		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			// TODO
			console.log("the removed item is", removed.timeStamp);
			let el = document.getElementById("dnd-container").scrollLeft;
			removed.position.x = el + 3;

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

	return (
		<div>
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
										padding: 4,
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
										style={{
											display: "flex",
											width: `${width}px`,
											background: snapshot.isDraggingOver
												? "lightblue"
												: "transparent",
											// minHeight: 50,
											height: "200px",
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
														// grid={[25, 25]}
														// onStart={eventLogger}
														// onDrag={eventLogger}
														onStop={(e: MouseEvent, data: Object) => {
															eventLogger({ x: data.x + 3, y: data.y }, index);
														}}
														bounds="parent"
													>
														<div
															style={{
																height: "50px",
																// width: "50px",
																padding: "10px",
																border: "2px solid green",
															}}
														>
															{item.word}
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
