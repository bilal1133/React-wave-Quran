/** @format */

import React, { useState, useEffect } from "react";

import WordBank from "./WordBank";
import Wave from "./Wave";
import WaveControlls from "./WaveControlls";
import KeyboardhotKeys from "./KeyboardhotKeys";
import StateInfo from "./StateInfo";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	waveSuperContainer: {
		position: "relative",
		bottom: "130px",
		left: "1.25rem",
		marginBottom: "-125px",
		width: "100%",
		"&:hover": {
			cursor: "-webkit-grab",
			cursor: " grab",
		},
		"&:active": {
			cursor: "-webkit-grabbing",
			cursor: "grabbing",
		},
	},
	fontSizeLg: {
		fontSize: "14px",
	},
});

export default function Main({ ayaWord, audio }) {
	const classes = useStyles();

	let [zoom, setZoom] = useState(1);
	let [width, setWidth] = useState(1);
	let [duration, setDuration] = useState(0);
	let [playing, setPlaying] = useState(false);
	let [position, setPosition] = useState(0);
	let [wavesurfer, setWavesurfer] = useState(null);
	let [volume, setVolume] = useState(1);
	let [audioRate, setAudioRate] = useState(1);
	let [fontSize, setFontSize] = useState(12);
	let [clickToChange, setClickToChange] = useState(true);
	let [loop, setLoop] = useState(false);
	let [loopEnding, setLoopEnding] = useState(0);
	let [loopStartT, setLoopStartT] = useState(0);
	// two containers for drag and drop
	const dnd_columns = {
		first: {
			name: "WordBank",
			items: ayaWord,
		},
		second: {
			name: "Word Placing Space",
			items: [],
		},
	};

	const [columns, setColumns] = useState(dnd_columns);
	// * Calculate the position of the audio
	useEffect(() => {
		let tempAudio = document.querySelector("audio");
		tempAudio.addEventListener(
			"timeupdate",
			function (e) {
				var currentTimeMs = tempAudio.currentTime;
				setPosition(currentTimeMs);
			},
			false
		);
	}, []);

	// * Checking if the user Resize the window then adjust the transparent box
	// * and the also resizt the audio by zooming in and out
	function resizedw() {
		// Haven't resized in 100ms!
		handleZoom("in");
		handleZoom("out");
	}
	var doit;
	window.onresize = function () {
		clearTimeout(doit);
		doit = setTimeout(resizedw, 100);
	};

	// * Set the new width fot the transparent box as the user zoom in/out
	useEffect(() => {
		handleSetWidth();
	}, [zoom]);

	// *  for the section loop functionality
	useEffect(() => {
		if (position >= loopEnding && loop === true) {
			// jumpToPreviousWord();
			skipAhead(undefined, loopStartT);
		}
	}, [loop, position]);

	const loopCurrentSegment = () => {
		if (loop === true) {
			handlePlaying();
			setLoop(false);
			return;
		}
		let jumpTime = duration;
		// * calculating the loop ending time
		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp > position) {
				if (temp < jumpTime) {
					jumpTime = temp;
					continue;
				}
			}
		}
		setLoopEnding(jumpTime);
		// * calculating the loop ending time
		jumpTime = 0.1;
		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp < position) {
				if (temp > jumpTime) {
					jumpTime = temp;
				}
			}
		}
		setLoopStartT(jumpTime);

		jumpToPreviousWord();
		setPlaying(true);
		setLoop(true);
	};
	// * set the width as the user Zoom in or out
	const handleSetWidth = () => {
		let tempWidth = 0;
		let el = document.querySelectorAll("wave canvas");

		for (let index = 0; index < el.length; index++) {
			tempWidth += el[index].getBoundingClientRect().width;
		}
		setWidth(tempWidth / 2);
	};

	// * Set the zoom ('in'/'out')
	const handleZoom = (direction) => {
		console.log("In handle Zoom");
		if (direction === "in") {
			setZoom(zoom + 100);
		} else if (direction === "out" && zoom > 1) {
			setZoom(zoom - 100);
		}
	};

	// * called as soon as the waveform is loaded
	const onWaveformReady = ({ wavesurfer }) => {
		setDuration(wavesurfer.getDuration());
		handleSetWidth();
	};

	// * Set the position of the audio
	const onPosChange = (pos, wavesurf) => {
		if (pos !== position) {
			wavesurf && setWavesurfer(wavesurfer);
			setPosition(pos);
		}
	};

	// * controll the play or pause ()
	const handlePlaying = () => {
		setPlaying(!playing);
	};

	// * to move with in Audio based on the direction frwd/bkwrd or exact time stamp
	// * (direction{'frwd'/'bkwrd'} , location/timestamp , speed)
	const skipAhead = (direction, location, speed = 1) => {
		if (zoom === 1 && speed != 1) {
			speed = 1.5;
		}
		let amount = (((duration / zoom) * 4) / 90) * speed;
		if (location && location !== position) {
			wavesurfer.seekTo(secondsToPosition(location));
			onPosChange(location, wavesurfer);
			return;
		}
		if (direction === "frwd") {
			if (position + amount < duration) {
				wavesurfer.seekTo(secondsToPosition(position + amount));
				onPosChange(position + amount, wavesurfer);
				return;
			} else {
				wavesurfer.seekTo(secondsToPosition(duration));
				onPosChange(duration, wavesurfer);
			}
		}
		if (direction === "bkwrd") {
			if (position - amount > 0) {
				wavesurfer.seekTo(secondsToPosition(position - amount));
				onPosChange(position - amount, wavesurfer);
			} else {
				wavesurfer.seekTo(secondsToPosition(0));
				onPosChange(0, wavesurfer);
			}
		}
	};
	// * jump to the next or the previous word in terms of audio
	const jumpToNextWord = () => {
		let jumpTime = duration;
		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp > position + 0.01) {
				if (temp < jumpTime) {
					jumpTime = temp;
					continue;
				}
			}
		}
		skipAhead(undefined, jumpTime);
	};
	// to jump to the next or the previous word in terms of audio
	const jumpToPreviousWord = () => {
		let jumpTime = 0.01;
		// finding the next timeStamp closest to the current Position
		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp < position) {
				if (temp > jumpTime) {
					jumpTime = temp;
				}
			}
		}
		skipAhead(undefined, jumpTime);
	};

	// Automatically drag the word from the wordbank and place to the transparent window.
	// either pass the index or the numbers to remove
	const moveWordFromTopToBottom = (number, index) => {
		if (index || index === 0) {
			if (columns.first.items.length === 0) {
				return;
			}
			let el2 = document.querySelector("#word-container").children;
			let temp = 0;

			for (let index = 0; index < el2.length; index++) {
				temp += el2[index].offsetWidth;
			}
			const sourceItems = columns.first.items;
			const destItems = columns.second.items;
			const [removed] = sourceItems.splice(index, 1);
			let el = document.getElementById("dnd-container").scrollLeft;
			removed.position.x = el;
			removed.parentWidth = temp;
			// destItems.push(removed);
			destItems.splice(0, 0, removed);
			setColumns({
				...columns,
				first: {
					...columns.first,
					items: sourceItems,
				},
				second: {
					...columns.second,
					items: destItems,
				},
			});
			return;
		}

		for (let i = 0; i < number; i++) {
			if (columns.first.items.length === 0) {
				return;
			}
			let el2 = document.querySelector("#word-container").children;
			let temp = 0;
			for (let i = 0; i < el2.length; i++) {
				temp += el2[i].offsetWidth;
			}
			// const sourceColumn = columns[source.droppableId];
			// const destColumn = columns[destination.droppableId];
			const sourceItems = columns.first.items;
			const destItems = columns.second.items;
			const removed = sourceItems.pop();
			let el = document.getElementById("dnd-container").scrollLeft;
			removed.position.x = el;
			removed.parentWidth = temp;
			// destItems.splice(destination.i, 0, removed);
			// destItems.push(removed);
			destItems.splice(0, 0, removed);
			setColumns({
				...columns,
				first: {
					...columns.first,
					items: sourceItems,
				},
				second: {
					...columns.second,
					items: destItems,
				},
			});
		}
	};
	//* Align the not used words based on the scroll
	const alignNotUsedWords = () => {
		let tempArr = columns.second.items;

		let el = document.getElementById("dnd-container").scrollLeft;
		let max = document.getElementById("dnd-container").scrollLeftMax;
		// TODO
		console.log("THE EL is", el + "Width ", width);

		if (el + max >= 500) {
			el = el - tempArr[0].parentWidth;
		}
		for (let index = 0; index < tempArr.length; index++) {
			if (tempArr[index].position.y < 40) {
				tempArr[index].position.x = el;
				//!  tempArr[index].position.y = 45;
			}
		}
		setColumns({
			...columns,
			second: {
				...columns.second,
				items: tempArr,
			},
		});
	};
	// convert the position in to secods based on the duration
	const secondsToPosition = (sec) => {
		return (1 / duration) * sec;
	};
	// to increase or decrese the volume (up/down)
	const handleVolume = (props) => {
		if (volume < 0.9 && props === "up") {
			setVolume(volume + 0.1);
		}
		if (volume > 0.1 && props === "down") {
			setVolume(volume - 0.1);
		}
		if (props === "mute") {
			if (volume === 0) {
				setVolume(0.5);
			} else {
				setVolume(0);
			}
		}
	};

	/// increase or decrease the speed of the audio
	const handleAudioRate = (position, value) => {
		if (value) {
			setAudioRate(value);
			return;
		}
		if (position === "inc" && audioRate < 4) {
			setAudioRate(audioRate + 0.1);
		} else if (position === "dec" && audioRate > 0.2) {
			setAudioRate(audioRate - 0.1);
		}
	};
	/// increase or decrease the font
	const handleFontSize = (value) => {
		if (value === "inc" && fontSize < 16) {
			setFontSize(fontSize + 2);
		} else if (value === "dec" && fontSize > 12) {
			setFontSize(fontSize - 2);
		}
	};
	// map the first word and automatically map the word on to the audio at current timeStamp
	// current audio position
	const handleKeyboardMap = () => {
		let tempArr = columns.second.items;
		// finding the first word based on its y position
		for (let index = tempArr.length - 1; index >= 0; index--) {
			if (tempArr[index].position.y < 40) {
				let tempPosition =
					(width / duration) * (position - (position * 0.000601854) )- tempArr[index].parentWidth;
				//* Adding -3 to allign the position with audio
				tempArr[index].position.x = tempPosition - 3;
				tempArr[index].position.y = 91;

				//* calculate the location in temrm of percentage
				tempArr[index].location = Math.abs(
					((tempPosition + tempArr[index].parentWidth) / width) * 100
				);
				// * Calculating the timeStamp
				let timeStamp =
					(duration / width) * (tempPosition + 3 + tempArr[index].parentWidth);
				timeStamp = timeStamp + timeStamp * 0.000601854;
				//* updating the timeStamp
				tempArr[index].timeStamp = timeStamp;

				setColumns({
					...columns,
					second: {
						...columns.second,
						items: tempArr,
					},
				});

				break;
			}
		}
	};
	//* To export the data
	const handleExportData = () => {
		let temp = columns.second.items;
		let tempObj = {};
		temp.forEach((element) => {
			tempObj[element.id] = {
				word: element.word,
				timeStamp: element.timeStamp,
				Wordnumber: element.id,
				location: element.location,
			};
		});
		console.log(tempObj);
	};

	return (
		<div>
			<div
				style={{
					marginTop: "15px",
				}}
				className={"container-fluid"}
			>
				<div
					style={{
						position: "relative",
						left: "1.25rem",
						zIndex: 500,
						width: "100%",
						// margin: "auto",
					}}
				>
					<WordBank
						duration={duration}
						ayaWord={ayaWord}
						width={width}
						fontSize={fontSize}
						setZoom={handleZoom}
						skipAhead={skipAhead}
						columns={columns}
						setColumns={setColumns}
						moveWordFromTopToBottom={moveWordFromTopToBottom}
						clickToChange={clickToChange}
					/>
				</div>
				<div className={classes.waveSuperContainer}>
					<Wave
						playing={playing}
						audio={audio}
						zoom={zoom}
						volume={volume}
						audioRate={audioRate}
						position={position}
						setDuration={setDuration}
						handleSetWidth={handleSetWidth}
						onPosChange={onPosChange}
						setWavesurfer={setWavesurfer}
						onWaveformReady={onWaveformReady}
					/>
				</div>
			</div>
			<div
			// style={{clear:'left'}}
			>
				<StateInfo
					zoom={zoom}
					volume={volume}
					audioRate={audioRate}
					fontSize={fontSize}
					position={position}
				/>
				<WaveControlls
					playing={playing}
					loop={loop}
					handleZoom={handleZoom}
					setPlaying={handlePlaying}
					skipAhead={skipAhead}
					setVolume={handleVolume}
					jumpToNextWord={jumpToNextWord}
					jumpToPreviousWord={jumpToPreviousWord}
					moveWordFromTopToBottom={moveWordFromTopToBottom}
					alignNotUsedWords={alignNotUsedWords}
					handleAudioRate={handleAudioRate}
					handleFontSize={handleFontSize}
					loopCurrentSegment={loopCurrentSegment}
					handleKeyboardMap={handleKeyboardMap}
					clickToChange={clickToChange}
					setClickToChange={setClickToChange}
				/>
				<div className="container-sm d-flex justify-content-between">
					<KeyboardhotKeys />
					<button
						className="btn btn-outline-info "
						onClick={() => handleExportData()}
					>
						Export Data
					</button>
				</div>
			</div>
		</div>
	);
}
