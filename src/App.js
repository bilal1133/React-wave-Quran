/** @format */

import React from "react";

import Main from "./components/Main";

import audio from "./data/001007.mp3";

function App() {
	let ayat ="صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"

	let words = ayat.split(" ");

	// let words = [1, 2, 3, 4, 15, 6, 7, 8, 9];

	let ayaWord = [];
	for (let index = 0; index < words.length; index++) {
		ayaWord[index] = {
			id: `${index + 1}`,
			position: { x: -3, y: 1 },
			timeStamp: 0,
			location: 1,
			parentWidth: 0,
			word: words[index],
		};
	}

	console.log(ayaWord);

	return (
		<div className="App">
			<Main ayaWord={ayaWord} audio={audio} />
		</div>
	);
}

export default App;
