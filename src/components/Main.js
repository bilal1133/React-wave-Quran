/** @format */

import React, { useState, useEffect } from "react";

import WordBank from "./WordBank";
import Wave from "./Wave";
import WaveControlls from "./WaveControlls";
import { Button, Modal } from "react-bootstrap";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	loadingAnim: {
		position: "fixed",
		zIndex: "1000",
		backgroundColor: "rgb(69, 108, 134,0.8)",
		color: "white",
		top: "0",
		left: "0",
		textAlign: "center",
		// margin:"auto",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	},

	waveSuperContainer: {
		position: "relative",
		bottom: "130px",
		left: "1.25rem",
		marginBottom: "-125px",
		width: "100%",
		// "&:hover": {
		// 	cursor: "-webkit-crosshair",
		// 	cursor: "crosshair",
		// },
		"&:active": {
			cursor: "-webkit-grabbing",
			// cursor: "grabbing",
		},
	},
	fontSizeLg: {
		fontSize: "14px",
	},
});

export default function Main({ ayaWord, audio }) {
	const classes = useStyles();
	let [loading, setLoading] = useState(true);
	let [zoom, setZoom] = useState(1);
	let [width, setWidth] = useState(1);
	let [duration, setDuration] = useState(0);
	let [playing, setPlaying] = useState(false);
	let [position, setPosition] = useState(0);
	let [wavesurfer, setWavesurfer] = useState(null);
	let [volume, setVolume] = useState(1);
	let [audioRate, setAudioRate] = useState(1);
	let [fontSize, setFontSize] = useState(14);
	let [clickToChange, setClickToChange] = useState(true);
	let [loop, setLoop] = useState(false);
	let [loopEnding, setLoopEnding] = useState(0);
	let [loopStartT, setLoopStartT] = useState(0);
	let [containerWidth, setContainerWidth] = useState(0);
	let [latency, setLatency] = useState(0);
	const [show, setShow] = useState(false);

	const handleModal = () => setShow(!show);

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
		let containerWidth = document.querySelector(".react-waves").offsetWidth;
		setContainerWidth(containerWidth);


		let tempAudio = document.querySelector("audio");
		tempAudio.addEventListener(
			"timeupdate",
			function (e) {
				var currentTimeMs = tempAudio.currentTime;
				setPosition(currentTimeMs);
			},
			false
		);

		// * Checking if the user Resize the window then adjust the transparent box
		// * and the also resizt the audio by zooming in and out

		var doit;
		window.onresize = function () {
			clearTimeout(doit);
			doit = setTimeout(resizedw, 100);
		};
	
	}, []);
	function resizedw() {
		// Haven't resized in 100ms!
		handleZoom("in");
		handleZoom("out");
		let containerWidth = document.querySelector(".react-waves").offsetWidth;
		setContainerWidth(containerWidth);
	}
	// * Set the new width fot the transparent box as the user zoom in/out
	useEffect(() => {
		handleSetWidth();
		let containerWidth = document.querySelector(".react-waves").offsetWidth;
		setContainerWidth(containerWidth);
	}, [zoom]);

	// *  for the section loop functionality
	useEffect(() => {
		if (position >= loopEnding && loop === true) {
			skipAhead(undefined, loopStartT);
		}
	}, [loop, position]);
	//! don't you think the loop should be removed
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
		let element = document.querySelectorAll("wave canvas");

		for (let index = 0; index < element.length; index++) {
			tempWidth += element[index].getBoundingClientRect().width;
		}
		setWidth(tempWidth / 2);
	};

	// * Set the zoom ('in'/'out')
	const handleZoom = (direction) => {
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
		setLoading(!loading);
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
			// * to scroll as we move left or right on the audio
			let tempPosition = (width / duration) * position;
			let el = document.querySelector("wave");
			if (tempPosition > el.scrollLeft + containerWidth) {
				//* calculating the width from time stamp to scroll to that position
				el.scrollLeft = tempPosition;
			}
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
			// * to scroll as we move left or right on the audio
			let tempPosition = (width / duration) * position;
			let el = document.querySelector("wave");
			if (tempPosition + containerWidth < el.scrollLeft) {
				//* calculating the width from time stampto scroll to that position
				el.scrollLeft = tempPosition;
			}
		}
	};
	// * jump to the next or the previous word in terms of audio
	const jumpToNextWord = () => {
		let jumpTime = duration;
		let x = width;
		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp > position + 0.01) {
				if (temp < jumpTime) {
					jumpTime = temp;
					x = columns.second.items[index].position.x;
					continue;
				}
			}
		}
		skipAhead(undefined, jumpTime);
		//* Time stamp to position
		// let tempPosition = (width / duration) * position;
		let el = document.querySelector("wave");
		if (x > el.scrollLeft + containerWidth) {
			//* calculating the width from time stamp to scroll to that position
			el.scrollLeft = x;
		}
	};
	// to jump to the next or the previous word in terms of audio
	const jumpToPreviousWord = () => {
		let jumpTime = 0.01;
		let x = 0;
		// finding the next timeStamp closest to the current Position
		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp < position) {
				if (temp > jumpTime) {
					jumpTime = temp;
					x = columns.second.items[index].position.x;
				}
			}
		}
		skipAhead(undefined, jumpTime);
		//* calculating the width from time stamp t0 scroll to that position
		let el = document.querySelector("wave");
		if (x + containerWidth < el.scrollLeft) {
			//* calculating the width from time stampto scroll to that position
			el.scrollLeft = x;
		}
	};

	// convert the position in to secods based on the duration
	const secondsToPosition = (sec) => {
		return (1 / duration) * sec;
	};
	// to increase or decrese the volume (up/down)
	const handleVolume = (props, value) => {
		if (value) {
			setVolume(value);
			return;
		}
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
		if (value === "inc" && fontSize < 50) {
			setFontSize(fontSize + 2);
		} else if (value === "dec" && fontSize > 12) {
			setFontSize(fontSize - 2);
		}
	};
	// * return the parent width
	const getParentWidht = () => {
		let temp = 0;
		let el = document.querySelector("#word-container").children;
		for (let index = 0; index < el.length; index++) {
			temp += el[index].offsetWidth;
		}
		return temp;
	};

	// map the first word and automatically map the word on to the audio at current timeStamp
	// current audio position
	const handleKeyboardMap = () => {
		if (columns.second.items.length === columns.first.items.length) {
			handleModal();
			return;
		}

		let position2 = position - position * 0.0006;

		let index = columns.second.items.length;
		let tempWord = columns.first.items[index];
		let tempArr = columns.second.items;
		tempWord.parentWidth = getParentWidht();
		let tempPosition = (width / duration) * position2 - tempWord.parentWidth;
		//* Adding -3 to allign the position with audio

		tempWord.position.x = tempPosition;
		tempWord.position.y = 30;

		//* calculate the location in temrm of percentage
		tempWord.location = Math.abs(
			((tempPosition + tempWord.parentWidth) / width) * 100
		);
		// * Calculating the timeStamp
		// ! Temp position should be current position
		//* calculte the timeStamp
		// let timeStamp = (duration / width) * (tempPosition + tempWord.parentWidth);
		// timeStamp += timeStamp * 0.000601854;
		//* updating the timeStamp
		tempWord.timeStamp = position;
		tempArr.splice(0, 0, tempWord);
		setColumns({
			...columns,
			second: {
				...columns.second,
				items: tempArr,
			},
		});
	};
	const undoLastMap = () => {
		let tempArr = columns.second.items;
		tempArr.splice(0, 1);

		setColumns({
			...columns,
			second: {
				...columns.second,
				items: tempArr,
			},
		});
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
	const calculatePP = (tempWord) => {
		if (
			tempWord.timeStamp + parseInt(latency) >= duration ||
			tempWord.timeStamp + parseInt(latency) <= 0
		) {
			return tempWord;
		}

		tempWord.timeStamp = tempWord.timeStamp + parseFloat(latency);
		// * tempWord.timeStamp - tempWord.timeStamp * 0.0006 inorder to componstate Error
		let tempPosition =
			(width / duration) * (tempWord.timeStamp - tempWord.timeStamp * 0.0006) -
			tempWord.parentWidth;
		//* Adding -3 to allign the position with audio
		tempWord.position.x = tempPosition - 3;
		tempWord.position.y = 30;

		//* calculate the location in temrm of percentage
		tempWord.location = Math.abs(
			((tempPosition + tempWord.parentWidth) / width) * 100
		);
		return tempWord;
	};

	const handleLatency = (single) => {
		if (single) {
			let jumpTime = 0.01;
			let word = {};
			let i = 0;
			// finding the previous timeStamp closest to the current Position
			for (let index = 0; index < columns.second.items.length; index++) {
				let temp = columns.second.items[index].timeStamp;
				if (temp < position) {
					if (temp > jumpTime) {
						jumpTime = temp;
						word = columns.second.items[index];
						i = index;
					}
				}
			}
			if (word.word) {
				word = calculatePP(word);
				let tempArr = columns.second.items;
				tempArr[i] = word;
				setColumns({
					...columns,
					second: {
						...columns.second,
						items: tempArr,
					},
				});
			}
			return;
		}
		setLoading(true);
		let tempArr = columns.second.items;
		for (let index = 0; index < tempArr.length; index++) {
			tempArr[index] = calculatePP(tempArr[index]);
		}
		setColumns({
			...columns,
			second: {
				...columns.second,
				items: tempArr,
			},
		});
		setLoading(false);
	};

	return (
		<div>
			<CustomModal show={show} handleModal={handleModal} />
			{loading ? (
				<div className={classes.loadingAnim}>
					{" "}
					<h1>Loading...</h1>{" "}
				</div>
			) : null}

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
						clickToChange={clickToChange}
						containerWidth={containerWidth}
					/>
				</div>
				<div className={classes.waveSuperContainer} id="waveSuperContainer">
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
						containerWidth={containerWidth}
					/>
				</div>
			</div>
			<div
			// style={{clear:'left'}}
			>
				<WaveControlls
					playing={playing}
					loop={loop}
					handleVolume={handleVolume}
					volume={volume}
					handleZoom={handleZoom}
					setPlaying={handlePlaying}
					skipAhead={skipAhead}
					setVolume={handleVolume}
					jumpToNextWord={jumpToNextWord}
					jumpToPreviousWord={jumpToPreviousWord}
					handleAudioRate={handleAudioRate}
					handleFontSize={handleFontSize}
					loopCurrentSegment={loopCurrentSegment}
					handleKeyboardMap={handleKeyboardMap}
					clickToChange={clickToChange}
					setClickToChange={setClickToChange}
					undoLastMap={undoLastMap}
					handleLatency={handleLatency}
					position={position}
					zoom={zoom}
					audioRate={audioRate}
					fontSize={fontSize}
					handleExportData={handleExportData}
					latency={latency}
					setLatency={setLatency}
				/>
				<div className="container-sm  d-flex justify-content-around m-3"></div>
			</div>
		</div>
	);
}

const CustomModal = ({ show, handleModal }) => (
	<Modal show={show} onHide={handleModal}>
		<Modal.Header closeButton>
			<Modal.Title>Message</Modal.Title>
		</Modal.Header>
		<Modal.Body>No Word Remaining to Map</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={handleModal}>
				Close
			</Button>
		</Modal.Footer>
	</Modal>
);
