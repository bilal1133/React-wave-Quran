/** @format */

import React, { useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import { createUseStyles } from "react-jss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import SpeedIcon from "@material-ui/icons/Speed";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import ReplayIcon from "@material-ui/icons/Replay";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import FlagIcon from "@material-ui/icons/Flag";
import LeakAddIcon from "@material-ui/icons/LeakAdd";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

import KeyboardhotKeys from "./KeyboardhotKeys";

const useStyles = createUseStyles({
	container: {
		border: "2px solid black",
		backgroundColor: "rgb(69, 108, 134,0.2)",
		// color: "white",
		borderRadius: "5px",
	},
});

export default function WaveControlls({
	handleZoom,
	setPlaying,
	playing,
	loop,
	skipAhead,
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
	handleLatency,
	position,
	zoom,
	audioRate,
	fontSize,
	handleVolume,
	volume,
	handleExportData,
	latency,
	setLatency,
}) {
	const [show, setShow] = useState(false);
	const classes = useStyles();

	// * 🎹 shotcuts

	document.onkeydown = function (e) {
		var e = e || window.event; // for IE to cover IEs window event-object
		// e.preventDefault();
		if (e.keyCode === 90) {
			undoLastMap();
		}

		if (e.keyCode === 37) {
			skipAhead("bkwrd", undefined, 50);
			e.preventDefault();
		}
		if (e.keyCode === 39) {
			e.preventDefault();
			skipAhead("frwd", undefined, 50);
		}
		if (e.shiftKey && e.keyCode === 37) {
			e.preventDefault();
			skipAhead("bkwrd");
		}
		if (e.shiftKey && e.keyCode === 39) {
			e.preventDefault();
			skipAhead("frwd");
		}
		if (e.keyCode === 221) {
			e.preventDefault();
			handleAudioRate("inc");
		}
		if (e.keyCode === 219) {
			e.preventDefault();
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

		if (e.keyCode === 87) {
			alignNotUsedWords();
		}
		if (e.keyCode === 76) {
			loopCurrentSegment();
		}

		if (e.keyCode === 96 || e.keyCode === 48) {
			handleAudioRate(undefined, 1);
		}
	};
	return (
		<div
			className={
				"container-sm  d-flex  align-content-center justify-content-center flex-wrap m-3 " +
				classes.container
			}
		>
		
			<span className={"badge badge-light  my-auto p-1  "}>
				{position.toFixed(4)}
			</span>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Play / Pause <b />
						<p>
							{" "}
							<strong>A / SpaceBar</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className="m-2 mx-2 my-auto p-1    "
					onClick={() => {
						setPlaying(!playing);
					}}
				>
					{!playing ? <PlayArrowIcon /> : <StopIcon />}
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Zoom In <b />
						<p>
							{" "}
							<strong> +</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className=" m-2 mx-2 my-auto p-1   "
					onClick={() => {
						handleZoom("in");
					}}
				>
					<ZoomInIcon />
				</span>
			</OverlayTrigger>
			<span className={"badge badge-light  my-auto p-1  "}>
				{(zoom - 1) / 100 + 1}X
			</span>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Zoom Out <b />
						<p>
							{" "}
							<strong> - </strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className=" m-2 mx-2 my-auto p-1   "
					onClick={() => {
						handleZoom("out");
					}}
				>
					<ZoomOutIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Skip Backword <b />
						<p>
							{" "}
							<strong> ⬅ </strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className=" m-2 mx-2 my-auto p-1   "
					onClick={() => {
						skipAhead("bkwrd", undefined, 50);
					}}
				>
					<SkipPreviousIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Skip Forward
						<b />
						<p>
							{" "}
							<strong>➡</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className=" m-2 mx-2 my-auto p-1   "
					onClick={() => skipAhead("frwd", undefined, 50)}
				>
					<SkipNextIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Jump to Previous Word <b />
						<p>
							{" "}
							<strong>P</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						jumpToPreviousWord();
					}}
				>
					<FastRewindIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Jump To next Word <b />
						<p>
							{" "}
							<strong>N / O</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						jumpToNextWord();
					}}
				>
					<FastForwardIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Decrease Speed By 0.10 <b />
						<p>
							{" "}
							<strong>{"["}</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleAudioRate("dec");
					}}
				>
					<SlowMotionVideoIcon />
				</span>
			</OverlayTrigger>
			<span className={"badge badge-light  my-auto p-1  "}>
				{audioRate.toFixed(2)}
			</span>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Increase Speed By 0.10
						<b />
						<p>
							{" "}
							<strong>{"]"}</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleAudioRate("inc");
					}}
				>
					<SpeedIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Increase Font <b />
						<p> {/* <strong>A / SpaceBar</strong> */}</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleFontSize("inc");
					}}
				>
					<FontDownloadIcon />
					<ArrowDropUpIcon />
				</span>
			</OverlayTrigger>
			<span className={"badge badge-light  my-auto p-1  "}>{fontSize}</span>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Decrease Font
						<b />
						<p> {/* <strong>A / SpaceBar</strong> */}</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleFontSize("dec");
					}}
				>
					<FontDownloadIcon />
					<ArrowDropDownSharpIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Undo Last Map Word
						<b />
						<p>
							{" "}
							<strong>Z</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						undoLastMap();
					}}
				>
					<ReplayIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Loop Specific Section <b />
						<p>
							{" "}
							<strong>R</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={loop ? "m-2 mx-2 my-auto p-1 " : "m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						loopCurrentSegment();
					}}
				>
					<AllInclusiveIcon />
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Place Flag onto Audio
						<b />
						<p>
							{" "}
							<strong>Q</strong>
						</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleKeyboardMap();
					}}
				>
					<FlagIcon />
				</span>
			</OverlayTrigger>

			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Handle Latency for all Words.
						<b />
						<p> {/* <strong>R</strong> */}</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleLatency();
					}}
				>
					<LeakAddIcon />
				</span>
			</OverlayTrigger>

			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Handle Latency for single Word
						<b />
						<p> {/* <strong>R</strong> */}</p>
					</Tooltip>
				}
			>
				<span
					className={"m-2 mx-2 my-auto p-1 "}
					onClick={() => {
						handleLatency(true);
					}}
				>
					<KeyboardTabIcon />
				</span>
			</OverlayTrigger>

			<Grid container spacing={2} style={{ width: "150px" }}>
				<Grid item>
					<VolumeDown />
				</Grid>
				<Grid item xs>
					<Slider
						value={volume * 100}
						onChange={(e, newValue) => {
							handleVolume(undefined, newValue / 100);
						}}
						aria-labelledby="continuous-slider"
					/>
				</Grid>
				<Grid item>
					<VolumeUp />
				</Grid>
			</Grid>

			<OverlayTrigger
				placement="bottom"
				overlay={
					<Tooltip id="span-tooltip-2">
						Automatically Snap to Audio <b />
					</Tooltip>
				}
			>
				<div
					className={
						clickToChange
							? "m-2 mx-2 my-auto p-1   "
							: "m-2 mx-2 my-auto p-1      "
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
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip id="span-tooltip-2">Latency Value</Tooltip>}
			>
				<span>
					<span>
						Latency
						<input
							type="number"
							placeholder="Latency"
							value={latency}
							onChange={(e) => setLatency(e.target.value)}
							style={{
								width: "100px",
								borderRadius: "5px",
								fontWeight: "bold",
							}}
						/>
					</span>
				</span>
			</OverlayTrigger>
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip id="span-tooltip-2">Export Data</Tooltip>}
			>
				<span
					className={"m-2 mx-2 my-auto px-1 "}
					style={{ border: "3px solid black", borderRadius: "10px" }}
					onClick={() => {
						handleExportData();
					}}
				>
					Export Data
				</span>
			</OverlayTrigger>
			<div>
				<KeyboardhotKeys 	 show={show} setShow={setShow} />
			</div>
		
		</div>
	);
}
