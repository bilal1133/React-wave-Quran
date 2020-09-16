/** @format */

import React from "react";

import { createUseStyles } from "react-jss";

import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import TextField from "@material-ui/core/TextField";
import { Form } from "react-bootstrap";
const useStyles = createUseStyles({
	fontSizeLg: {
		fontSize: "14px",
	},
});

export default function StateInfo({
	zoom,
	volume,
	audioRate,
	fontSize,
	position,
	handleVolume,
	setLatency,
	latency,
}) {
	const classes = useStyles();
	return (
		<div className="container-sm d-flex flex-wrap justify-content-around mt-2 ">
			<p className={"badge badge-primary p-2 " + classes.fontSizeLg}>
				TimeStamp ⏲{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{position.toFixed(2)}
				</span>
			</p>
			{/* <p className="badge badge-primary p-2 classes.fontSizeLg">
				Volume{" "}
				<span className={"badge badge-info "  + classes.fontSizeLg}>
					{Math.round(volume * 10)}
				</span>
			</p> */}

			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Speed{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{audioRate.toFixed(2)}
				</span>
				<span className="sr-only"></span>
			</p>
			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Font Size{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{fontSize}
				</span>
				<span className="sr-only"></span>
			</p>
			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Zoom{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{Math.round(zoom / 100) + 1}X
				</span>
				<span className="sr-only"></span>
			</p>
			<span style={{ width: "100px" }}>
				<TextField
					id="filled-basic"
					label="Filled"
					type="nmber"
					value={latency}
					onChange={(e) => setLatency(e.target.value)}
					variant="filled"
				/>
			</span>
			<Grid container spacing={2} style={{ width: "200px" }}>
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
		</div>
	);
}
