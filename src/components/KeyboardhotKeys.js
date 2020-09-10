/** @format */

import React from "react";

export default function KeyboardhotKeys() {
	return (
		<div
			className="container-sm  d-flex m-auto py-5"
			style={{ maxWidth: "720px" }}
		>
			<table class="table table-sm">
				<thead class="thead-dark">
					<tr>
						<th scope="col">
							{" "}
							<h6>Actions</h6>
						</th>
						<th scope="col">
							{" "}
							<h6>Hot Keys</h6>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>zoom In</td>
						<td> {"➕"} / = </td>
					</tr>
					<tr>
						<td>zoom Out</td>
						<td> {"-"} / = </td>
					</tr>
					<tr>
						<td>Increase Volume</td>
						<td>⬆</td>
					</tr>
					<tr>
						<td>Decrease Volume</td>
						<td>⬇</td>
					</tr>
					<tr>
						<td>Skip Left</td>
						<td>⬅</td>
					</tr>
					<tr>
						<td>Skip Right</td>
						<td>➡</td>
					</tr>
					<tr>
						<td>Mute {"🔇"}</td>
						<td>M</td>
					</tr>
					<tr>
						<td>Play / Pause</td>
						<td>A</td>
					</tr>
					<tr>
						<td>Jump to Next</td>
						<td>N / {"]"}</td>
					</tr>
					<tr>
						<td>Jump to previous</td>
						<td>P / {"["}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
