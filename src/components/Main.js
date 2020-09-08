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

	const handlePlaying = () => {
		setPlaying(!playing);
	};
	const skipAhead = (amount = 1) => {
		if (wavesurfer) {
			if (position + amount < 0) {
				wavesurfer.seekTo(secondsToPosition(0));
				onPosChange(0, wavesurfer);
				return;
			} else if (position + amount > duration) {
				wavesurfer.seekTo(secondsToPosition(duration));
				onPosChange(duration, wavesurfer);
				return;
			}
			wavesurfer.seekTo(secondsToPosition(position + amount));
			onPosChange(position + amount, wavesurfer);
		}
	};

	const secondsToPosition = (sec) => {
		return (1 / duration) * sec;
	};
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
						maxWidth: "740px",
					}}
				>
					<WordBank
						duration={duration}
						ayaWord={ayaWord}
						width={width}
						setZoom={handleZoom}
						onPosChange={onPosChange}
					/>
				</div>
				<div
					style={{
						maxWidth: "740px",
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
				/>
			</div>
		</div>
	);
}
