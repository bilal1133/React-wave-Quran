/** @format */

import React, { useState, useEffect } from "react";

import WordBank from "./WordBank";
import Wave from "./Wave";
import WaveControlls from "./WaveControlls";

export default function Main({ ayaWord, audio }) {
	let [zoom, setZoom] = useState(0);
	let [width, setWidth] = useState(0);
	let [diffrenceInWidth, setdiffrenceInWidth] = useState(0);
	let [playing, setPlaying] = useState(false);

	useEffect(() => {
		let tempWidth = 0;
		let el = document.querySelectorAll("wave canvas");
		for (let index = 0; index < el.length; index++) {
			tempWidth += el[index].getBoundingClientRect().width;
		}

		setdiffrenceInWidth(tempWidth - width);
		setWidth(tempWidth);
	}, [zoom]);

	// console.log("NOw the width is ", width, "===", diffrenceInWidth);
	const handleZoom = (direction) => {
		// TODO e.wavesurfer.getDuration()

		// const { wavesurfer } = state;

		if (direction === "in") {
			setZoom(zoom + 100); //
		} else if (direction === "out" && zoom > 0) {
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
					<Wave playing={playing} audio={audio} zoom={zoom} />
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
