/** @format */

import React, { useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import KeyboardIcon from "@material-ui/icons/Keyboard";

export default function KeyboardhotKeys() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="container-sm  d-flex ">
			<>
				<OverlayTrigger
					placement="top"
					overlay={
						<Tooltip id="button-tooltip-2">
							View All Hot Keys
							<b />
						</Tooltip>
					}
				>
					<span className={"m-2 mx-2 my-auto px-1 "} onClick={handleShow}>
						<KeyboardIcon fontSize="large"/>
					</span>
				</OverlayTrigger>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Hot Keys</Modal.Title>
					</Modal.Header>
					<Modal.Body>
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
									<td colspan="2" class="table-active text-center">
										Play{" "}
									</td>
								</tr>
								<tr>
									<td>Play / Pause</td>
									<td>A Or "Space Bar"</td>
								</tr>
								<tr>
									<td>Increase Speed 0.10</td>
									<td> {"]"} </td>
								</tr>
								<tr>
									<td>Decrease Speed 0.10</td>
									<td> {"["} </td>
								</tr>
								<tr>
									<td>zoom In</td>
									<td> {"➕"} / = </td>
								</tr>
								<tr>
									<td>zoom Out</td>
									<td> {"-"} </td>
								</tr>

								<tr>
									<td colspan="2" class="table-active text-center">
										Audio Volume
									</td>
								</tr>
								<tr>
									<td>Increase Volume</td>
									<td>Shift + ⬆</td>
								</tr>
								<tr>
									<td>Decrease Volume</td>
									<td>Shift + ⬇</td>
								</tr>
								<tr>
									<td>Mute {"🔇"}</td>
									<td>M</td>
								</tr>
								<tr>
									<td colspan="2" class="table-active text-center">
										Navigate Current Play Location
									</td>
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
									<td>Jump to Next</td>
									<td>N / O</td>
								</tr>
								<tr>
									<td>Jump to Previous</td>
									<td>P</td>
								</tr>
								<tr>
									<td colspan="2" class="table-active text-center">
										Move Flags
									</td>
								</tr>

								<tr>
									<td>Undo last placed flag</td>
									<td>Z</td>
								</tr>
								<tr>
									<td>Automaticaly Snap to Audio</td>
									<td>Q </td>
								</tr>
							</tbody>
						</table>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		</div>
	);
}
