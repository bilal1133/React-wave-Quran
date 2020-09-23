/** @format */

import React from "react";

import { createUseStyles } from "react-jss";
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
		<div className="container-sm d-flex flex-wrap align-self-center justify-content-around mt-2 ">
			{/* <p className={"badge badge-primary p-2 " + classes.fontSizeLg}>
				TimeStamp ⏲{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
				
				</span>
			</p> */}

			{/* <p className="badge badge-primary p-2 classes.fontSizeLg">
				Speed{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{audioRate.toFixed(2)}
				</span>
				<span className="sr-only"></span>
			</p> */}
			{/* <p className="badge badge-primary p-2 classes.fontSizeLg">
				Font Size{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{fontSize}
				</span>
				<span className="sr-only"></span>
			</p> */}
			{/* <p className="badge badge-primary p-2 classes.fontSizeLg">
				Zoom{" "}
				<span className={"badge badge-info " + classes.fontSizeLg}>
					{Math.round(zoom / 100) + 1}X
				</span>
				<span className="sr-only"></span>
			</p> */}
		
			
		</div>
	);
}
