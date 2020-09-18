/** @format */

import React from "react";

import Main from "./components/Main";

import audio from "./data/002255.mp3";

function App() {
	let ayat =
		"ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ";

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
			<p style={{ fontFamily: "quran_common" }}>{ayat}</p>
			<Main ayaWord={ayaWord} audio={audio} />
		</div>
	);
}

export default App;
