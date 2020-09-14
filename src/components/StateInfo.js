/** @format */

import React from "react";
import { createUseStyles } from "react-jss";

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
}) {
	const classes = useStyles();
	return (
		<div className="container-sm d-flex justify-content-around mt-2 ">
			<p className={"badge badge-primary p-2 " + classes.fontSizeLg}>
				Position{" "}
				<span className={"badge badge-light " + classes.fontSizeLg}>
					{position.toFixed(2)}
				</span>
			</p>
			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Volume{" "}
				<span className={"badge badge-light " + classes.fontSizeLg}>
					{Math.round(volume * 10)}
				</span>
			</p>
			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Speed{" "}
				<span className={"badge badge-light " + classes.fontSizeLg}>
					{audioRate.toFixed(2)}
				</span>
				<span className="sr-only"></span>
			</p>
			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Font Size{" "}
				<span className={"badge badge-light " + classes.fontSizeLg}>
					{fontSize}
				</span>
				<span className="sr-only"></span>
			</p>
			<p className="badge badge-primary p-2 classes.fontSizeLg">
				Zoom <span className={"badge badge-light "+ classes.fontSizeLg}>{zoom}</span>
				<span className="sr-only"></span>
			</p>
		</div>
	);
}
