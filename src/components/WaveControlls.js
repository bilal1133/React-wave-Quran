/** @format */

import React, { useEffect } from "react";

export default function WaveControlls({
	handleZoom,
	setPlaying,
	playing,
	skipAhead,
	wavesurfer,
	setVolume,
}) {
	document.onkeyup = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		if (e.which === 107) {
			handleZoom("in");
		}
		if (e.which === 109) {
			handleZoom("out");
		}
		if (e.which === 32) {
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
		if (e.which === 37) {
			skipAhead(-1);
		}
		if (e.which === 39) {
			skipAhead(+1);
		}
	};

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
				<div className="zoom-out button" onClick={() => handleZoom("out")}>
					<button> {"➖️"} </button>
				</div>
				<div
					className="skip button"
					onClick={() => skipAhead(1)}
					style={wavesurfer ? {} : { opacity: ".4", cursor: "default" }}
				>
					{"⏩"}
				</div>
				<div
					className="skip button"
					onClick={() => skipAhead(-1)}
					style={wavesurfer ? {} : { opacity: ".4", cursor: "default" }}
				>
					{"⏪"}
				</div>
			</div>
		</div>
	);
}
