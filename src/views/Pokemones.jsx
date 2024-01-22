import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Pokemones = () => {
  const [pokemonList, setPokemonList] = useState([]);  
  const [selectedPokemon, setSelectedPokemon] = useState(null);  
  const navigate = useNavigate();
  const { name } = useParams();

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();
      setPokemonList(data.results);
    };

    fetchPokemonList();
  }, []);

  const handlePokemonSelect = async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    const {
      name,
      stats,
      types,
      sprites,
    } = data;

    const pokemonDetails = {
      name,
      hp: stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: stats.find((stat) => stat.stat.name === "attack").base_stat,
      defense: stats.find((stat) => stat.stat.name === "defense").base_stat,
      specialAttack: stats.find((stat) => stat.stat.name === "special-attack").base_stat,
      specialDefense: stats.find((stat) => stat.stat.name === "special-defense").base_stat,
      speed: stats.find((stat) => stat.stat.name === "speed").base_stat,
      type: types.map((type) => type.type.name),
      sprite: sprites.other.dream_world.front_default || sprites.front_default,
    };

    setSelectedPokemon(pokemonDetails);
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="pokemonSelect" className="form-label">Selecciona un Pokémon:</label>
        <select
          id="pokemonSelect"
          className="form-select"
          onChange={(e) => handlePokemonSelect(e.target.value)}
          value={name || ""}
        >
          <option value="" disabled>
            Elige un Pokémon
          </option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPokemon && (
        <div className="card">
          <h2 className="card-title text-center">{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprite}
            alt={selectedPokemon.name}
            className="card-img-top img-fluid"
            style={{ maxWidth: "200px", margin: "auto"}}
          />
          <div className="card-body">
            <h5 className="card-subtitle mb-2 text-muted">Características:</h5>
            <ul className="list-group">
              <li className="list-group-item">HP: {selectedPokemon.hp}</li>
              <li className="list-group-item">Attack: {selectedPokemon.attack}</li>
              <li className="list-group-item">Defense: {selectedPokemon.defense}</li>
              <li className="list-group-item">Special Attack: {selectedPokemon.specialAttack}</li>
              <li className="list-group-item">Special Defense: {selectedPokemon.specialDefense}</li>
              <li className="list-group-item">Speed: {selectedPokemon.speed}</li>
              <li className="list-group-item">Type: {selectedPokemon.type.join(", ")}</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-3">
        <button onClick={handleNavigate} className="btn btn-primary">Navegar al inicio</button>
      </div>
    </div>
  );
};

export default Pokemones;