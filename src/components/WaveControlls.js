/** @format */

import React, { useEffect } from "react";

export default function WaveControlls({
	handleZoom,
	setPlaying,
	playing,
	skipAhead,
	wavesurfer,
	setVolume,
	jumpToNextWord,
	jumpToPreviousWord,
}) {
	// * 🎹 shotcuts
	document.onkeydown = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		if (e.which === 37) {
			skipAhead("bkwrd");
		}
		if (e.which === 39) {
			skipAhead("frwd");
		}
	};
	document.onkeyup = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		if (e.which === 107 || e.which === 187) {
			handleZoom("in");
		}
		if (e.which === 109 || e.which === 189) {
			handleZoom("out");
		}
		if (e.which === 65) {
			setPlaying();
		}
		if (e.altKey && e.which === 40) {
			setVolume("down");
		}
		if (e.altKey && e.which === 38) {
			setVolume("up");
		}
		if (e.which === 77) {
			e.preventDefault();
			setVolume("mute");
		}
		if (e.which === 78 || e.which === 221) {
			jumpToNextWord();
		}
		if (e.which === 80 || e.which === 219) {
			jumpToPreviousWord();
		}
	};

	return (
		<div
			className="container-sm d-flex justify-content-around py-5"
			style={{ maxWidth: "720px" }}
		>
			<button
				className="btn btn-primary"
				onClick={() => {
					setPlaying(!playing);
				}}
			>
				{!playing ? "▶️" : "⏹"}
			</button>

			<button className="btn btn-secondary" onClick={() => handleZoom("in")}>
				{" "}
				{"➕️"}{" "}
			</button>

			<button className="btn btn-secondary" onClick={() => handleZoom("out")}>
				{" "}
				{"➖️"}{" "}
			</button>
			<button className="btn btn-primary" onClick={() => skipAhead("bkwrd")}>
				{"⏪"}
			</button>
			<button className="btn btn-primary" onClick={() => skipAhead("frwd")}>
				{"⏩"}
			</button>

			<button
				className={"btn btn-info"}
				onClick={() => {
					console.log("latest");
				}}
			>
				{" "}
				{"latest"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					console.log("next");
					jumpToNextWord();
				}}
			>
				{" "}
				{"next"}{" "}
			</button>

			<button
				className={"btn btn-info"}
				onClick={() => {
					console.log("Previous");
					jumpToPreviousWord();
				}}
			>
				{" "}
				{"Previous"}{" "}
			</button>
		</div>
	);
}
