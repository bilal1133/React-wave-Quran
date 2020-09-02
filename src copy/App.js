/** @format */

import React from "react";

import Main from "./Main";

import audio from "./002255.mp3";
function App() {
	let ayat =
		"ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ";

	let words = ayat.split(" ");

	words = words.reverse();
	let ayaWord = [];
	for (let index = 0; index < words.length; index++) {
		ayaWord[index] = {
			id: index,
			start: 0,
			end: 0,
			color: "",
			word: words[index],
		};
	}

	return (
		<div className="App">
			<h1>Billy is Awsome</h1>
			<Main ayaWord={ayaWord} audio={audio} />
		</div>
	);
}

export default App;
