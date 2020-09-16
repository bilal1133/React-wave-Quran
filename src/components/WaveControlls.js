/** @format */

import React, { useEffect } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	marginAuto: {
		margin: "auto",
	},
});

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
	undoLastMap,
	handleLatency
}) {
	const classes = useStyles();

	// * 🎹 shotcuts

	document.addEventListener("wheel", mouseWheel);

	function mouseWheel(e) {
		e.preventDefault();
		if (e.deltaY / 120 > 0) {
			console.log("scrolling up !");
			handleAudioRate("inc");
		} else {
			console.log("scrolling down !");
			handleAudioRate("dec");
		}
	}

	document.onkeydown = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		e.preventDefault();
		if (e.keyCode === 37) {
			skipAhead("bkwrd", undefined, 50);
		}
		if (e.keyCode === 39) {
			skipAhead("frwd", undefined, 50);
		}
		if (e.shiftKey && e.keyCode === 37) {
			skipAhead("bkwrd");
		}
		if (e.shiftKey && e.keyCode === 39) {
			skipAhead("frwd");
		}
		if (e.keyCode === 221) {
			handleAudioRate("inc");
		}
		if (e.keyCode === 219) {
			handleAudioRate("dec");
		}
	};

	document.onkeyup = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		if (e.keyCode === 116 || (e.ctrlKey && e.keyCode === 82)) {
			// eslint-disable-next-line no-restricted-globals
			location.reload();
			return false;
		}
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
			// e.preventDefault();
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
		if (e.keyCode === 50 || e.keyCode === 98) {
			moveWordFromTopToBottom(5, undefined);
		}
		if (e.keyCode === 87) {
			alignNotUsedWords();
		}
		if (e.keyCode === 76) {
			loopCurrentSegment();
		}
		if (e.keyCode === 90) {
			undoLastMap();
		}
		if (e.keyCode === 99 || e.keyCode === 51) {
			moveWordFromTopToBottom(1, undefined, true);
		}
		// *  move the flag and also map it to the current timeStamp
		if (e.keyCode === 83) {
			moveWordFromTopToBottom(1, undefined);
			handleKeyboardMap();
		}
		if (e.keyCode === 96 || e.keyCode === 48) {
			handleAudioRate(undefined, 1);
		}
	};
	return (
		<div className="container-sm d-flex justify-content-center   flex-wrap">
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Play / Pause <b />
						<p>
							{" "}
							<strong>A / SpaceBar</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className="m-2 mx-auto  btn btn-primary"
					onClick={() => {
						setPlaying(!playing);
					}}
				>
					{!playing ? "▶️" : "⏹"}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Zoom In <b />
						<p>
							{" "}
							<strong> +</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className="btn m-2 mx-auto  btn-secondary"
					onClick={() => {
						handleZoom("in");
					}}
				>
					{" "}
					{"➕️"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Zoom Out <b />
						<p>
							{" "}
							<strong> - </strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className="btn m-2 mx-auto  btn-secondary"
					onClick={() => {
						handleZoom("out");
					}}
				>
					{" "}
					{"➖️"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Skip Backword <b />
						<p>
							{" "}
							<strong> ⬅ </strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className="btn m-2 mx-auto  btn-primary"
					onClick={() => {
						skipAhead("bkwrd");
					}}
				>
					{"⏪"}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Skip Forward
						<b />
						<p>
							{" "}
							<strong>➡</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className="btn m-2 mx-auto  btn-primary"
					onClick={() => skipAhead("frwd")}
				>
					{"⏩"}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Align Not Used Words <b />
						<p>
							{" "}
							<strong>W</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-success"}
					onClick={() => {
						alignNotUsedWords();
					}}
				>
					{" "}
					{"Align"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Drag 5 Words
						<b />
						<p>
							{" "}
							<strong> 5 </strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						moveWordFromTopToBottom(5);
					}}
				>
					{" "}
					{"Drag 5"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Jump To next Word <b />
						<p>
							{" "}
							<strong>N / O</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						jumpToNextWord();
					}}
				>
					{" "}
					{"next"}{" "}
				</button>
			</OverlayTrigger>

			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Jump to Previous Word <b />
						<p>
							{" "}
							<strong>P</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						jumpToPreviousWord();
					}}
				>
					{" "}
					{"Previous"}{" "}
				</button>
			</OverlayTrigger>

			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Decrease Speed By 0.10 <b />
						<p>
							{" "}
							<strong>{"["}</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						handleAudioRate("dec");
					}}
				>
					{" "}
					{"Slower 🐌"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Increase Speed By 0.10
						<b />
						<p>
							{" "}
							<strong>{"]"}</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						handleAudioRate("inc");
					}}
				>
					{" "}
					{"Faster ⚡"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Increase Font <b />
						<p> {/* <strong>A / SpaceBar</strong> */}</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						handleFontSize("inc");
					}}
				>
					{" "}
					{"Font ++"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Decrease Font
						<b />
						<p> {/* <strong>A / SpaceBar</strong> */}</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						handleFontSize("dec");
					}}
				>
					{" "}
					{"Font --"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Move and Map the word to current time Stamp
						<b />
						<p>
							{" "}
							<strong>S</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						moveWordFromTopToBottom(1, undefined);
						handleKeyboardMap();
					}}
				>
					{" "}
					{"Move And Map 🚩"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Undo Last Map Word
						<b />
						<p>
							{" "}
							<strong>Z</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-info"}
					onClick={() => {
						undoLastMap();
					}}
				>
					{" "}
					{"Undo Map 🔀"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Loop Specific Section <b />
						<p>
							{" "}
							<strong>R</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={
						loop ? "m-2 mx-auto  btn btn-danger" : "m-2 mx-auto  btn btn-info"
					}
					onClick={() => {
						loopCurrentSegment();
					}}
				>
					{" "}
					{"Loop➰"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Handle Latency<b />
						<p>
							{" "}
							{/* <strong>R</strong> */}
						</p>
					</Tooltip>
				}
			>
				<button
					className={
					"m-2 mx-auto  btn btn-danger" 
					}
					onClick={() => {
						handleLatency();
					}}
				>
					{" "}
					{"Handle Latency"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Place Flag onto Audio
						<b />
						<p>
							{" "}
							<strong>Q</strong>
						</p>
					</Tooltip>
				}
			>
				<button
					className={"m-2 mx-auto  btn btn-warning"}
					onClick={() => {
						handleKeyboardMap();
					}}
				>
					{" "}
					{"Place Flag"}{" "}
				</button>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="button-tooltip-2">
						Automatically Snap to Audio <b />
					</Tooltip>
				}
			>
				<div
					className={
						clickToChange
							? "m-2 mx-auto   p-2  btn btn-success"
							: "m-2 mx-auto   p-2 btn btn-outline-primary"
					}
					onClick={() => setClickToChange(!clickToChange)}
				>
					<Form.Check
						type={"checkbox"}
						label="Auto Snap"
						checked={clickToChange}
						onChange={() => setClickToChange(!clickToChange)}
					/>
				</div>
			</OverlayTrigger>
		</div>
	);
}
