import { useState, useEffect } from 'react';
import './test.css';
function Test() {
  const [pokemons, setPokemons] = useState([]);
  const [clickedIds, setClickIds] = useState([]);
  function randomNumbers() {
    return Math.floor(Math.random() * 1025);
  }
  function shufflePokemon() {
    const shuffledList = [...pokemons];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    setPokemons(shuffledList);
  }
  function handleclick(e) {
    if (clickedIds.includes(e.target.dataset.id)) {
      setClickIds([]);
    } else {
      setClickIds([...clickedIds, e.target.dataset.id]);
    }
    shufflePokemon();
  }
  useEffect(() => {
    Promise.all(
      Array.from({ length: 16 }, () =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumbers()}`).then(
          (res) => {
            return res.json();
          }
        )
      )
    ).then((data) => {
      console.log(data);
      setPokemons(data);
    });
  }, []);
  let pokemonSprites = pokemons.map((pokemon) => (
    <button key={pokemon.id} onClick={handleclick}>
      <img data-id={pokemon.id} src={pokemon.sprites.front_default} />
    </button>
  ));
  return (
    <div id='memory-game'>
      <div id='info-board'>
        click on pokemon you have not clicked yet. 16 total score!
      </div>
      <div id='score-board'>score: {clickedIds.length}</div>
      <div id='pokemon-grid'>{pokemonSprites}</div>
    </div>
  );
}

export default Test;
