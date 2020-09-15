/** @format */
import React, { useState, useEffect } from "react";
import ReactWaves from "@dschoon/react-waves";
export default ({
	audio,
	zoom,
	playing,
	// onPosChange,
	onWaveformReady,
	setWavesurfer,
	position,
	volume,
	audioRate,
}) => {
	useEffect(() => {
		document.querySelector(".styles_reactWaves__1M36F").style.padding = " 0px ";
		document.querySelector(".styles_reactWaves__1M36F").style.margin =
			"30px  0px  0px 0px ";
		// "0px 40px 0px 0px";
		document.querySelector(
			"#dnd-container"
		).style.width = document.querySelector(".wave").offsetWidth;
		document.querySelector("wave").onscroll = function (e) {
			let el = document.getElementById("dnd-container");
			let el2 = document.getElementById("timeline");
			el.scrollLeft = e.target.scrollLeft;
			el2.scrollLeft = e.target.scrollLeft;
		};

		let el = document.querySelector("wave");
		let x = 0,
			left = 0;

		let draggingFunction = (e) => {
			// el.scrollLeft += 10;
			document.addEventListener("mouseup", (e) => {
				e.preventDefault();
				document.removeEventListener("mousemove", draggingFunction);
			});

			el.scrollLeft = left - e.pageX + x;
		};

		el.addEventListener("mousedown", (e) => {
			e.preventDefault();

			x = e.pageX;
			left = el.scrollLeft;

			document.addEventListener("mousemove", draggingFunction);
		});
	}, []);

	const onLoading = ({ wavesurfer, originalArgs = [] }) => {
		setWavesurfer(wavesurfer);
	};

	const defaultFormatTimeCallback = (seconds, pxPerSec) => {
		if (seconds / 60 > 1) {
			// calculate minutes and seconds from seconds count
			const minutes = parseInt(seconds / 60, 10);
			seconds = parseInt(seconds % 60, 10);
			// fill up seconds with zeroes
			seconds = seconds < 10 ? "0" + seconds : seconds;
			return `${minutes}:${seconds}`;
		}
		return Math.round(seconds * 1000) / 1000;
	};

	function defaultTimeInterval(pxPerSec) {
		if (pxPerSec >= 25) {
			return 1;
		} else if (pxPerSec * 5 >= 25) {
			return 5;
		} else if (pxPerSec * 15 >= 25) {
			return 15;
		}
		return Math.ceil(0.5 / pxPerSec) * 60;
	}

	function defaultPrimaryLabelInterval(pxPerSec) {
		if (pxPerSec >= 25) {
			return 10;
		} else if (pxPerSec * 5 >= 25) {
			return 6;
		} else if (pxPerSec * 15 >= 25) {
			return 4;
		}
		return 4;
	}

	function defaultSecondaryLabelInterval(pxPerSec) {
		if (pxPerSec >= 25) {
			return 5;
		} else if (pxPerSec * 5 >= 25) {
			return 2;
		} else if (pxPerSec * 15 >= 25) {
			return 2;
		}
		return 2;
	}

	return (
		<div
			style={{
				// backgroundColor: "grey",
				width: "100%",
				// margin: "auto",
				// overflowX: "auto",
				// overflowY: "hidden",
			}}
		>
			<ReactWaves
				cursorColor="black"
				cursorWidth={2}
				audioFile={audio}
				className={"react-waves"}
				options={{
					// mediaControls: true,
					// barGap: 0,
					// barWidth: 1,
					barHeight: 2,
					cursorWidth: 3,
					cursorColor: "#0E5CAD ",
					height: 200,
					hideScrollbar: false,
					progressColor: " #79F1A4 ",
					responsive: true,
					fillParent: true,
					waveColor: "#D1D6DA",
					backend: "MediaElement",
					autoCenter: true,
					autoCenterRate: 0,
					autoCenterImmediately: false,
					dragSelection: false,
					scrollParent: false,
					audioRate: audioRate,
				}}
				volume={volume}
				zoom={zoom}
				// pos={position}
				playing={playing}
				// onPosChange={onPosChange}
				onLoading={onLoading}
				onWaveformReady={onWaveformReady}
				timelineOptions={{
					container: "#timeline",
					height: 20,
					notchPercentHeight: 50,
					labelPadding: 5,
					unlabeledNotchColor: "#c0c0c0",
					primaryColor: "#000",
					secondaryColor: "#c0c0c0",
					primaryFontColor: "#000",
					secondaryFontColor: "#000",
					fontFamily: "verdana",
					fontSize: 10,
					duration: null,
					zoomDebounce: false,
					formatTimeCallback: defaultFormatTimeCallback,
					timeInterval: defaultTimeInterval,
					primaryLabelInterval: defaultPrimaryLabelInterval,
					secondaryLabelInterval: defaultSecondaryLabelInterval,
					offset: 0,
				}}
			></ReactWaves>

			<div id="timeline" style={{ margin: "0 auto" }} />
		</div>
	);
};
