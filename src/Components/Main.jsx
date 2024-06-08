import { useState, useEffect } from "react";
import Cards from "./Cards";

export default function Main() {
	const [pokimons, setPokimons] = useState([]);
	// const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/");
	const [page, setPage] = useState("https://pokeapi.co/api/v2/type/1/");
	const [abilities, setAbilities] = useState([]);
	const [abilitiesPage, setabilitiesPage] = useState(
		"https://pokeapi.co/api/v2/ability/",
	);
	const [isLoading, setIsLoading] = useState(true);
	function updatingPokimonandPage(newPokeMonData, newPage) {
		setPokimons((prev) => [...prev, ...newPokeMonData]);
		setPage(newPage);
	}

	async function gimmeAbilities() {
		if (!abilitiesPage) {
			console.log("all abilities", abilities);
		}
		try {
			const response = await fetch(abilitiesPage);

			const abilitiesDATA = await response.json();
			// console.log("ORIGINAL API DATA", pokemonData);
			const newPage = abilitiesDATA?.next ? abilitiesDATA?.next : null;
			setAbilities((prev) => [...prev, ...abilitiesDATA.results]);
			setabilitiesPage(newPage);
		} catch (err) {
			console.log(err);
		}
	}

	async function gimmePokimonData() {
		try {
			const response = await fetch(page);
			if (!response.ok) {
				throw new Error("Something went wrong");
				//i wanna display error on modal
			}

			const pokemonData = await response.json();
			console.log("ORIGINAL API DATA", pokemonData);
			// setPage(pokemonData[0]?.next ? pokemonData[0]?.next : null);
			const newPage = pokemonData?.next ? pokemonData?.next : null;
			// console.log(newPage);
			// console.log(pokemonData.results);
			const individualAPIArray = pokemonData.pokemon.map((element) =>
				fetch(element.pokemon.url),
			);
			// console.log("individualAPIArray", individualAPIArray);
			const individualAPIResponse = await Promise.all(individualAPIArray);
			// console.log("individualAPIResponse", individualAPIResponse);

			const individualAPIData = individualAPIResponse.map(
				(individualAPIResponse) => individualAPIResponse.json(),
			);
			// console.log("individualAPIData", individualAPIData);
			const individualAPIDataPROMISE = Promise.all(individualAPIData);
			// console.log("individualAPIDataPROMISE", individualAPIDataPROMISE);
			// when the above promise gets resolved we get our data
			const newPokeMonData = (await individualAPIDataPROMISE).map(
				(eachPokemon) => eachPokemon,
			);
			// console.log("newPokeMonData", newPokeMonData);
			const refinedData = newPokeMonData.map((eachPokemon) => {
				return {
					name: eachPokemon.name,
					id: eachPokemon.id,
					image: eachPokemon.sprites.other.dream_world.front_default,
					types: eachPokemon.types,
					height: eachPokemon.height,
					weight: eachPokemon.weight,
					abilities: eachPokemon.abilities,
					stats: eachPokemon.stats,
				};
			});
			console.log("refinedData", refinedData);
			// const addingID = newPokeMonData.map((eachPokemon) => {
			// 	if (!eachPokemon.cryptoID) {
			// 		return { ...eachPokemon, cryptoID: crypto.randomUUID() };
			// 	}
			// 	return eachPokemon;
			// });
			// console.log("addingID", addingID);
			// setPokimons((prev) => [...prev, ...pokeMonData]);
			// updatingPokimonandPage(addingID, newPage);
			updatingPokimonandPage(refinedData, newPage);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		gimmePokimonData();
		gimmeAbilities();
	}, []);

	useEffect(() => {
		// gimmePokimonData();
		gimmeAbilities();
	}, [abilitiesPage]);

	return (
		<main className="avyMain">
			<Cards pokimons={pokimons} isLoading={isLoading} />
			{page && (
				<div className="loadMoreBTNDivva">
					<button
						className="loadMoreBTN"
						onClick={() => gimmePokimonData()}
					>
						Load More
					</button>
				</div>
			)}
		</main>
	);
}
/*
async function gimmePokimonData() {
	if (!page) return;

	try {
		console.log("PAGE", page);
		const response = await fetch(page);
		if (!response.ok) {
			throw new Error("Something went wrong");
			//i wanna display error on modal
		}

		const pokemonData = await response.json();
		console.log("ORIGINAL API DATA", pokemonData);
		// setPage(pokemonData[0]?.next ? pokemonData[0]?.next : null);
		const newPage = pokemonData?.next ? pokemonData?.next : null;
		console.log(newPage);
		console.log(pokemonData.results);
		const individualAPIArray = pokemonData.results.map((pokemon) =>
			fetch(pokemon.url),
		);
		console.log("individualAPIArray", individualAPIArray);
		const individualAPIResponse = await Promise.all(individualAPIArray);
		console.log("individualAPIResponse", individualAPIResponse);

		const individualAPIData = individualAPIResponse.map(
			(individualAPIResponse) => individualAPIResponse.json(),
		);
		console.log("individualAPIData", individualAPIData);
		const individualAPIDataPROMISE = Promise.all(individualAPIData);
		console.log("individualAPIDataPROMISE", individualAPIDataPROMISE);
		// when the above promise gets resolved we get our data
		const newPokeMonData = (await individualAPIDataPROMISE).map(
			(eachPokemon) => eachPokemon,
		);
		console.log("newPokeMonData", newPokeMonData);
		// const addingID = newPokeMonData.map((eachPokemon) => {
		// 	if (!eachPokemon.cryptoID) {
		// 		return { ...eachPokemon, cryptoID: crypto.randomUUID() };
		// 	}
		// 	return eachPokemon;
		// });
		// console.log("addingID", addingID);
		// setPokimons((prev) => [...prev, ...pokeMonData]);
		// updatingPokimonandPage(addingID, newPage);
		updatingPokimonandPage(newPokeMonData, newPage);
		setIsLoading(false);
	} catch (err) {
		console.log(err);
	}
}

*/
