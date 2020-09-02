/** @format */
import React, { useState, useEffect } from "react";
import ReactWaves, { Regions } from "@dschoon/react-waves";
import "./styles.css";

export default ({ audio, zoom, playing }) => {
	let [regions, setRegions] = useState({});
	let [state, setState] = useState({
		wavesurfer: null,
		pos: 0,
		activeRegion: "1",
		regions: {},
	});

	// console.log("@@@@", state.wavesurfer ? state.wavesurfer.drawer.handlers.scroll : "SORRRRYYY");

	// const currentZoom = wavesurfer.params.minPxPerSec;
	let start = 0;
	let end = 1;

	const onLoading = ({ wavesurfer, originalArgs = [] }) => {
		setState({ ...state, loaded: originalArgs[0] === 100, wavesurfer });
	};

	const onPosChange = (pos, wavesurfer) => {
		if (pos !== state.pos) {
			setState({ ...state, pos, wavesurfer });
		}
	};

	const secondsToPosition = (sec) => {
		return (1 / state.wavesurfer.getDuration()) * sec;
	};

	const handleSingleRegionUpdate = (e) => {
		const newState = Object.assign(state, {
			regions: {
				[e.region.id]: e.region,
			},
		});
		setState(newState);
	};

	const handleRegionClick = (e) => {
		console.log("Billy is Awsome", e.originalArgs[0].start);
		setTimeout(() => {
			state.wavesurfer.seekTo(secondsToPosition(e.originalArgs[0].start));
		}, 50);
	};

	// const handleRegionDone = () => {
	// 	setState({ ...state, playing: false });
	// };

	return (
		<div
			style={{
				// border: "1px solid red",
				// width: "740px",
				margin: "auto",
				// overflowX: "auto",
				// overflowY: "hidden",
			}}
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
					responsive: true,
					fillParent: true,
					waveColor: "#D1D6DA",
				}}
				volume={1}
				zoom={zoom}
				pos={state.pos}
				playing={playing}
				onPosChange={onPosChange}
				onLoading={onLoading}
			>
				<Regions
					onSingleRegionUpdate={handleSingleRegionUpdate}
					onSingleRegionIn={() => {}}
					onSingleRegionOut={() => {}}
					onSingleRegionRemove={() => {}}
					onSingleRegionClick={() => {}}
					onSingleRegionOver={() => {}}
					onSingleRegionLeave={() => {}}
					onRegionClick={handleRegionClick}
					onRegionIn={() => {}}
					onRegionOut={() => {
						/*handleRegionDone*/
					}}
					onRegionRemove={() => {}}
					onRegionDblclick={() => {}}
					onRegionOver={() => {}}
					onRegionLeave={() => {}}
					regions={regions}
				/>
			</ReactWaves>
			<div>
				<button
					onClick={() => {
						console.log("BIlal");
						console.log(state.wavesurfer.drawer.width);
						let el = document.querySelector("canvas");
						console.log(el.getBoundingClientRect());
					}}
				>
					{" "}
					LOg the width{" "}
				</button>
			</div>
		</div>
	);
};

// {/* <span style={{ display: "flex" }}>
// 					{ayaWord.map((single, index) => (
// 						<p
// 							key={`${index}`}
// 							style={{
// 								margin: "5px",
// 								// backgroundColor: regions[index] ? regions[index].color : "red",
// 							}}
// 						>
// 							<Draggable
// 								// axis="x"
// 								// handle=".handle"
// 								defaultPosition={{ x: 0, y: 0 }}
// 								position={null}
// 								grid={[25, 25]}
// 								onStart={eventLogger}
// 								onDrag={eventLogger}
// 								onStop={eventLogger}
// 							>
// 								<div className="billy">{single.word}</div>
// 							</Draggable>
// 						</p>
// 					))}
// 				</span> */}

// const addNewRegion = (int) => {
// 	console.log("adding new Region");
// 	let tempRegions = regions;
// 	tempRegions[`${int}`] = {
// 		// word: ayaWord[int].word,
// 		id: `${int}`,
// 		start: start,
// 		end: end,
// 		color: `rgb(${255 - int * 40}, 255, 153,0.3)`,
// 	};
// 	setRegions(tempRegions);
// 	start = end;
// 	end = end + 1;
// 	console.log("-------------", start, end);
// };

// TODOconsole.log(	state.wavesurfer.getDuration());
