import react, { useEffect } from "react";
import { useState } from "react";
import Spinner from "./Spinner";

export default function ApiCaller({ updatePokimonANDPage, page }) {
  // const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/");

  const [isLoading, setIsLoading] = useState(true);

  // handle this error message	"Internal Server Error(Resource)"], happens when NS servers for the API is down
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
      const newPage = pokemonData[0]?.next ? pokemonData[0]?.next : null;

      const individualAPIArray = pokemonData[0].results.map((pokemon) =>
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
        (eachPokemon) => eachPokemon[0],
      );
      console.log("newPokeMonData", newPokeMonData);
      // setPokimons((prev) => [...prev, ...pokeMonData]);
      updatePokimonANDPage(newPokeMonData, newPage);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    gimmePokimonData();
  });
  return <>{isLoading && <Spinner />}</>;
}

/*  */
