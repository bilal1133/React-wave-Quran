/** @format */
import React, { useState, useEffect } from "react";
import ReactWaves, { Regions } from "@dschoon/react-waves";
import "./styles.css";

export default ({ audio, zoom, playing, setDuration,handleSetWidth }) => {
	let [state, setState] = useState({
		wavesurfer: null,
		pos: 0,
		activeRegion: "1",
		regions: {},
	});

	useEffect(() => {
		document.querySelector(".styles_reactWaves__1M36F").style.padding = "5px";
		document.querySelector("wave").onscroll = function (e) {
			let el = document.getElementById("dnd-container");
			el.scrollLeft = e.target.scrollLeft;
		};
	}, []);

	const onLoading = ({ wavesurfer, originalArgs = [] }) => {
		console.log("Loading...", wavesurfer);
		setState({ ...state, loaded: originalArgs[0] === 100, wavesurfer });
	};

	const onPosChange = (pos, wavesurfer) => {
		if (pos !== state.pos) {
			setState({ ...state, pos, wavesurfer });
		}
	};

	const onWaveformReady = ({ wavesurfer }) => {
		setDuration(wavesurfer.getDuration());
		handleSetWidth();
		console.log("READDDDDDYYYYYY", wavesurfer.getDuration());
	};

	return (
		<div
			style={
				{
					// border: "1px solid red",
					// width: "640px",
					// margin: "auto",
					// overflowX: "auto",
					// overflowY: "hidden",
				}
			}
		>
			<ReactWaves
				audioFile={audio}
				className={"react-waves"}
				options={{
					barGap: 2,
					barWidth: 1.8,
					barHeight: 2,
					cursorWidth: 0,
					height: 200,
					hideScrollbar: false,
					progressColor: "#EC407A",
					responsive: false,
					fillParent: true,
					waveColor: "#D1D6DA",
					backend: "MediaElement",
				}}
				volume={1}
				zoom={zoom}
				pos={state.pos}
				playing={playing}
				onPosChange={onPosChange}
				onLoading={onLoading}
				onWaveformReady={onWaveformReady}
			></ReactWaves>
		</div>
	);
};

// TODOconsole.log(	state.wavesurfer.getDuration());
