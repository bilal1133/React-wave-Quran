/** @format */

import React, { useState, useEffect } from "react";

import WordBank from "./WordBank";
import DragNDrop from "./DragNDrop";
import Wave from "./Wave";
import WaveControlls from "./WaveControlls";

export default function Main({ ayaWord, audio }) {
	let [zoom, setZoom] = useState(0);
	let [playing, setPlaying] = useState(false);

	const handleZoom = (direction) => {
		// TODO e.wavesurfer.getDuration()

		// const { wavesurfer } = state;

		if (direction === "in") {
			// wavesurfer.zoom(currentZoom + 1);
			setZoom(zoom + 100); //
		} else if (direction === "out" && zoom > 0) {
			setZoom(zoom - 100);
		}
	};

	useEffect(() => {}, []);
	return (
		<div>
			<div>
				<WordBank ayaWord={ayaWord} />
			</div>
			<div>
				<div
					style={{
						position: "relative",
						top: "138px",
						zIndex: 500,
					}}
				>
					<DragNDrop ayaWord={ayaWord} zoom={zoom} />
				</div>
				<div>
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
