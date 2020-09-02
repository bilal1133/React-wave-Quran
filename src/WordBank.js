/** @format */

// /** @format */

// import React, { useEffect, useState } from "react";

// export default function WordBank({ ayaWord }) {

// let [words,setWords] = useState(ayaWord)

// const handleRemove = (index)=>{
// console.log(index);
// }

// 	return (
// 		<div id="wordbank-continer" style={{ display: "flex", overflowX: "auto" }}>
// 			{words.map((single,index) => (
// 				<div
//         key={index}
//         style={{
//           backgroundColor:"black",
//           color:"white",
//           padding: "5px",
//           margin: "2px"
//         }}
//         onClick={() => {
//           handleRemove(index);
//         }}
//         >{single.word}</div>
// 			))}
// 		</div>
// 	);
// }

import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as Draggable2 from "react-draggable";

function App({ ayaWord }) {
	useEffect(() => {
		let el = document.getElementById("wordbank-continer");
		el.scrollLeft = 1000000;
	});

	const itemsFromBackend = [
		// { id: uuid(), content: "First task" },
		// { id: uuid(), content: "Second task" },
		// { id: uuid(), content: "Third task" },
		// { id: uuid(), content: "Fourth task" },
		// { id: uuid(), content: "Fifth task" },
		...ayaWord,
	];

	const columnsFromBackend = {
		first: {
			name: "WordBank",
			items: itemsFromBackend,
		},
		second: {
			name: "Word Placing Space",
			items: [],
		},
	};

	const onDragEnd = (result, columns, setColumns) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
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

	const [columns, setColumns] = useState(columnsFromBackend);
	return (
		<div>
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
			>
				<div key={"first"}>
					<div style={{ margin: 8, border: "2px solid green" }}>
						<Droppable
							droppableId={"first"}
							key={"first"}
							direction="horizontal"
						>
							{(provided, snapshot) => {
								return (
									<div
										id={"wordbank-continer"}
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											display: "flex",
											// flexWrap: "wrap",
											overflowX: "scroll",
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
					</div>

					<div style={{ margin: 8, border: "2px solid green", width: "100%" }}>
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
										style={{
											display: "flex",
											width: "100%",
											background: snapshot.isDraggingOver
												? "lightblue"
												: "lightgrey",
											padding: 4,
											minHeight: 50,
										}}
									>
										{/* {Object.values(columns)[1].items.map((item, index) => {
											return (
												<Draggable
													key={item.id}
													draggableId={item.id}
                          index={index}
                          bounds="parent"
												>
													{(provided, snapshot) => {
														return (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={{
																	textAlign: "center",
																	justifyContent: "center",
																	userSelect: "none",
																	padding: 16,
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
										{provided.placeholder} */}
										<div
											style={{
												height: "300px",
												width: `100%`,
												padding: "10px",
												border: "2px solid red",
												zIndex: 600,
												display: "flex",
												overflowX: "auto",
												// flexDirection: "row-reverse",
												// flexWrap: "wrap",
											}}
										>
											{Object.values(columns)[1].items.map((item, index) => {
												return (
													<Draggable2
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
															{item.word}
														</div>
													</Draggable2>
												);
											})}
										</div>
									</div>
								);
							}}
						</Droppable>
					</div>
				</div>
			</DragDropContext>
			{/* <div
				style={{
					height: "300px",
					width: `${400}px`,
					padding: "10px",
					border: "2px solid green",
					display: "flex",
					// flexDirection: "row-reverse",
					flexWrap: "wrap",
				}}
			>
				<Draggable2
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
						Bilal
					</div>
				</Draggable2>
			</div> */}
		</div>
	);
}

export default App;
