/** @format */
import React, { useState, useEffect } from "react";
import ReactWaves from "@dschoon/react-waves";
export default ({
	audio,
	zoom,
	playing,
	onPosChange,
	onWaveformReady,
	setWavesurfer,
	position,
	volume,
}) => {
	useEffect(() => {
		document.querySelector(".styles_reactWaves__1M36F").style.padding = "5px";
		document.querySelector("wave").onscroll = function (e) {
			let el = document.getElementById("dnd-container");
			el.scrollLeft = e.target.scrollLeft;
		};

		let el = document.querySelector("wave");
		let x = 0,
			left = 0;

		let draggingFunction = (e) => {
			console.log("Mouse moved", el.scrollLeft);
			// el.scrollLeft += 10;
			document.addEventListener("mouseup", (e) => {
				e.preventDefault();
				document.removeEventListener("mousemove", draggingFunction);
			});

			el.scrollLeft = left - e.pageX + x;
		};

		el.addEventListener("mousedown", (e) => {
			console.log("Handling mousedown");
			e.preventDefault();

			x = e.pageX;
			left = el.scrollLeft;

			document.addEventListener("mousemove", draggingFunction);
		});
	}, []);
	// const onLoading = ({ wavesurfer, originalArgs = [] }) => {
	// 	handleWaveSurfer({ wavesurfer, originalArgs });
	// };

	const onLoading = ({ wavesurfer, originalArgs = [] }) => {
		console.log(wavesurfer);
		setWavesurfer(wavesurfer);
	};

	return (
		<div
			style={
				{
					// backgroundColor: "grey",
					// width: "640px",
					// margin: "auto",
					// overflowX: "auto",
					// overflowY: "hidden",
				}
			}
		>
			<ReactWaves
				cursorColor="black"
				cursorWidth={2}
				audioFile={audio}
				className={"react-waves"}
				options={{
					// barHeight: 2,
					// cursorWidth: 0,
					// height: 200,
					// hideScrollbar: true,
					// progressColor: '#EC407A',
					// responsive: true,
					// waveColor: '#D1D6DA',

					// mediaControls: true,
					// barGap: 0,
					// barWidth: 1,
					barHeight: 2,
					cursorWidth: 3,
					cursorColor: "blue",
					height: 200,
					hideScrollbar: false,
					progressColor: "#ff5500",
					responsive: false,
					fillParent: true,
					waveColor: "#D1D6DA",
					backend: "MediaElement",

					//!
					autoCenter: true,
					autoCenterRate: 0,
					autoCenterImmediately: false,
					dragSelection: false,
					scrollParent: false,
				}}
				volume={volume}
				zoom={zoom}
				pos={position}
				playing={playing}
				onPosChange={onPosChange}
				onLoading={onLoading}
				onWaveformReady={onWaveformReady}
			>
				<div>
					<h5>Alt + '➕' to zoom In</h5>
					<h5>Alt + '➖' to zoom Out </h5>
					<h5>Alt + ' ⬆ arraow' to Increase Volume </h5>
					<h5>Alt + ' ⬇ arrow' to Decrease Volume </h5>
					<h5>'⬅Arrow' to move left on audio </h5>
					<h5>'➡ Arrow' to move Right</h5>
					<h5>M to mute and un-mute </h5>
					<h5> 'Space bar' to pause / play </h5>
				</div>
			</ReactWaves>
		</div>
	);
};
