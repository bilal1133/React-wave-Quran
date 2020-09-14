/** @format */

import React, { useEffect } from "react";
import { Form, Col } from "react-bootstrap";
export default function WaveControlls({
	handleZoom,
	setPlaying,
	playing,
	loop,
	skipAhead,
	moveWordFromTopToBottom,
	setVolume,
	jumpToNextWord,
	jumpToPreviousWord,
	alignNotUsedWords,
	handleAudioRate,
	handleFontSize,
	loopCurrentSegment,
	handleKeyboardMap,
	setClickToChange,
	clickToChange,
}) {
	// * 🎹 shotcuts
	document.onkeydown = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		e.preventDefault();
		if (e.keyCode === 37) {
			skipAhead("bkwrd");
		}
		if (e.keyCode === 39) {
			skipAhead("frwd");
		}
	};
	document.onkeyup = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		if (e.keyCode === 107 || e.keyCode === 187) {
			handleZoom("in");
		}
		if (e.keyCode === 109 || e.keyCode === 189) {
			handleZoom("out");
		}
		if (e.keyCode === 65 || e.keyCode === 32) {
			setPlaying();
		}
		if (e.shiftKey && e.keyCode === 40) {
			setVolume("down");
		}
		if (e.shiftKey && e.keyCode === 38) {
			setVolume("up");
		}
		if (e.keyCode === 77) {
			e.preventDefault();
			setVolume("mute");
		}
		if (e.keyCode === 81) {
			handleKeyboardMap();
		}
		if (e.keyCode === 78 || e.keyCode === 79) {
			jumpToNextWord();
		}
		if (e.keyCode === 80) {
			jumpToPreviousWord();
		}
		if (e.keyCode === 49 || e.keyCode === 97) {
			moveWordFromTopToBottom(1, undefined);
		}
		if (e.keyCode === 98 || e.keyCode === 50) {
			moveWordFromTopToBottom(2, undefined);
		}
		if (e.keyCode === 101 || e.keyCode === 53) {
			moveWordFromTopToBottom(5, undefined);
		}
		if (e.keyCode === 57 || e.keyCode === 105) {
			moveWordFromTopToBottom(9, undefined);
		}
		if (e.keyCode === 221) {
			handleAudioRate("inc");
		}
		if (e.keyCode === 219) {
			handleAudioRate("dec");
		}
		if (e.keyCode === 87) {
			alignNotUsedWords();
		}
		if (e.keyCode === 82) {
			loopCurrentSegment();
		}
	};
	return (
		<div className="container-sm d-flex justify-content-between my-2 flex-wrap">
			<button
				className="btn btn-primary"
				onClick={() => {
					setPlaying(!playing);
				}}
			>
				{!playing ? "▶️" : "⏹"}
			</button>

			<button
				className="btn btn-secondary"
				onClick={() => {
					handleZoom("in");
				}}
			>
				{" "}
				{"➕️"}{" "}
			</button>

			<button
				className="btn btn-secondary"
				onClick={() => {
					handleZoom("out");
				}}
			>
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
				className={"btn btn-success"}
				onClick={() => {
					alignNotUsedWords();
					// moveWordFromTopToBottom(5);
				}}
			>
				{" "}
				{"Allighn"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					moveWordFromTopToBottom(5);
				}}
			>
				{" "}
				{"Drag 5"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					jumpToNextWord();
				}}
			>
				{" "}
				{"next"}{" "}
			</button>

			<button
				className={"btn btn-info"}
				onClick={() => {
					jumpToPreviousWord();
				}}
			>
				{" "}
				{"Previous"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					handleAudioRate("inc");
				}}
			>
				{" "}
				{"Speed ⚡"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					handleAudioRate("dec");
				}}
			>
				{" "}
				{"Speed 🐌"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					handleFontSize("inc");
				}}
			>
				{" "}
				{"Font ++"}{" "}
			</button>
			<button
				className={"btn btn-info"}
				onClick={() => {
					handleFontSize("dec");
				}}
			>
				{" "}
				{"Font --"}{" "}
			</button>
			<button
				className={loop ? "btn btn-danger" : "btn btn-info"}
				onClick={() => {
					loopCurrentSegment();
				}}
			>
				{" "}
				{"Loop ➰"}{" "}
			</button>
			<button
				className={"btn btn-warning"}
				onClick={() => {
					handleKeyboardMap();
				}}
			>
				{" "}
				{"Map Next 🗺"}{" "}
			</button>
			<Form.Group className={"badge badge-primary p-2"}>
				<Form.Check
					type={"checkbox"}
					label="Click Word to Move Audio"
					checked={clickToChange}
					onChange={() => setClickToChange(!clickToChange)}
				/>
			</Form.Group>
		</div>
	);
}
