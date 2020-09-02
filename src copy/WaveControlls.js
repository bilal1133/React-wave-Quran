/** @format */

import React from "react";

export default function WaveControlls({ handleZoom, playing, setPlaying }) {
	return (
		<div>
			<div
				className="play button"
				onClick={() => {
					setPlaying(!playing);
				}}
			>
				{!playing ? "▶️" : "⏹"}
			</div>
			<div className="zoom-buttons">
				<div className="zoom-in button" onClick={() => handleZoom("in")}>
					<button> {"➕️"} </button>
				</div>
				{/* <div className="zoom-in button" onClick={() => addNewRegion(start)}>
					{"ADD New Region"}
				</div> */}
				<div className="zoom-out button" onClick={() => handleZoom("out")}>
					<button> {"➖️"} </button>
				</div>
			</div>
		</div>
	);
}
