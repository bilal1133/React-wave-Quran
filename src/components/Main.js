/** @format */

import React, { useState, useEffect } from "react";

import WordBank from "./WordBank";
import Wave from "./Wave";
import WaveControlls from "./WaveControlls";

export default function Main({ ayaWord, audio }) {
	let [zoom, setZoom] = useState(1);
	let [width, setWidth] = useState(1);
	let [duration, setDuration] = useState(0);
	let [playing, setPlaying] = useState(false);
	let [position, setPosition] = useState(0);
	let [wavesurfer, setWavesurfer] = useState(null);
	let [volume, setVolume] = useState(1);
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
	useEffect(() => {
		handleSetWidth();
	}, [zoom]);

	//TODO styles_reactWaves__1M36F  Set the padding to none
	const handleSetWidth = () => {
		let tempWidth = 0;
		let el = document.querySelectorAll("wave canvas");

		for (let index = 0; index < el.length; index++) {
			tempWidth += el[index].getBoundingClientRect().width;
		}
		setWidth(tempWidth / 2);
	};

	const handleZoom = (direction) => {
		if (direction === "in") {
			setZoom(zoom + 100);
		} else if (direction === "out" && zoom > 1) {
			setZoom(zoom - 100);
		}
	};
	const onWaveformReady = ({ wavesurfer }) => {
		setDuration(wavesurfer.getDuration());
		handleSetWidth();
	};

	const onPosChange = (pos, wavesurf) => {
		if (pos !== position) {
			wavesurf && setWavesurfer(wavesurfer);
			setPosition(pos);
		}
	};

	// controll the play or pause ()
	const handlePlaying = () => {
		setPlaying(!playing);
	};
	// to move with in Audio based on the direction frwd/bkwrd or exact time stamp
	// (direction{'frwd'/'bkwrd'} , location/timestamp)
	const skipAhead = (direction, location) => {
		let amount = ((duration / zoom) * 3) / 100;
		if (location && location !== position) {
			wavesurfer.seekTo(secondsToPosition(location));
			onPosChange(location, wavesurfer);
			console.log("===========");
			console.log("Skipping", location);
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
		console.log("amount", amount);
		console.log("direction", direction);
		if (direction === "bkwrd") {
			if (position - amount > 0) {
				console.log("amount", amount);
				wavesurfer.seekTo(secondsToPosition(position - amount));
				onPosChange(position - amount, wavesurfer);
			} else {
				wavesurfer.seekTo(secondsToPosition(0));
				onPosChange(0, wavesurfer);
			}
		}
	};
	//  jump to the next or the previous word in terms of audio
	const jumpToNextWord = () => {
		let jumpTime = duration;

		for (let index = 0; index < columns.second.items.length; index++) {
			let temp = columns.second.items[index].timeStamp;
			if (temp > position) {
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
		let jumpTime = 0;
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

	return (
		<div>
			<div>
				<div
					style={{
						position: "relative",
						top: "138px",
						zIndex: 500,
						maxWidth: "90%",
						margin: "auto",
					}}
				>
					<WordBank
						duration={duration}
						ayaWord={ayaWord}
						width={width}
						setZoom={handleZoom}
						skipAhead={skipAhead}
						columns={columns}
						setColumns={setColumns}
					/>
				</div>
				<div
					style={{
						maxWidth: "90%",
						margin: "auto",
					}}
				>
					<Wave
						playing={playing}
						audio={audio}
						zoom={zoom}
						setDuration={setDuration}
						handleSetWidth={handleSetWidth}
						position={position}
						onPosChange={onPosChange}
						setWavesurfer={setWavesurfer}
						onWaveformReady={onWaveformReady}
						volume={volume}
					/>
				</div>
			</div>
			<div
			// style={{clear:'left'}}
			>
				<WaveControlls
					playing={playing}
					handleZoom={handleZoom}
					setPlaying={handlePlaying}
					skipAhead={skipAhead}
					setVolume={handleVolume}
					jumpToNextWord={jumpToNextWord}
					jumpToPreviousWord={jumpToPreviousWord}
				/>
			</div>
		</div>
	);
}
