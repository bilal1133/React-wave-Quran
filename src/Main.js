/** @format */

import React, { useState, useEffect } from "react";

import WordBank from "./WordBank";
import Wave from "./Wave";
import WaveControlls from "./WaveControlls";

export default function Main({ ayaWord, audio }) {
	let [zoom, setZoom] = useState(1);
	let [width, setWidth] = useState(1);
	let [duration, setDuration] = useState(0);
	let [playing, setPlaying] = useState(false);
	useEffect(() => {
		handleSetWidth();
	}, [zoom]);
	//TODO styles_reactWaves__1M36F  Set the padding to none
	const handleSetWidth = () => {
		let tempWidth = 0;
		let el = document.querySelectorAll("wave canvas");

		for (let index = 0; index < el.length; index++) {
			tempWidth += el[index].getBoundingClientRect().width;
		}
		console.log("THE WIDTH is  ", tempWidth / 2, "old W", width);

		// Write down the start value and end value.
		// Divide the end value by the starting value.
		// Multiply by 100.
		// Subtract 100

		// setdiffrenceInWidth((tempWidth / 2 / width) * 100 - 100);
		setWidth(tempWidth / 2);
	};

	const handleZoom = (direction) => {
		if (direction === "in") {
			setZoom(zoom + 100);
		} else if (direction === "out" && zoom > 1) {
			setZoom(zoom - 100);
		}
	};

	return (
		<div>
			<div>
				<div
					style={{
						position: "relative",
						top: "138px",
						zIndex: 500,
						maxWidth: "740px",
					}}
				>
					<WordBank
						duration={duration}
						ayaWord={ayaWord}
						width={width}
						zoom={zoom}
					/>
				</div>
				<div
					style={{
						maxWidth: "740px",
					}}
				>
					<Wave
						playing={playing}
						audio={audio}
						zoom={zoom}
						setDuration={setDuration}
						handleSetWidth={handleSetWidth}
					/>
				</div>
			</div>
			<div
			// style={{clear:'left'}}
			>
				<WaveControlls
					playing={playing}
					handleZoom={handleZoom}
					setPlaying={setPlaying}
				/>
			</div>
		</div>
	);
}
