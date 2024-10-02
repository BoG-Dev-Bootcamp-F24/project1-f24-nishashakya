import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonId, setPokemonId] = useState(1); 
  const [pokemonData, setPokemonData] = useState(null);
  const [activePanel, setActivePanel] = useState('info');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error);
      }
    };

    fetchPokemonData(); 
  }, [pokemonId]); 

  const incrementId = () => {
    setPokemonId((prevId) => prevId + 1);
  };

  const decrementId = () => {
    setPokemonId((prevId) => (prevId > 1 ? prevId - 1 : prevId));
  };

  const handlePanelSwitch = (panel) => {
    setActivePanel(panel);
  };

  const heightInMeters = pokemonData ? (pokemonData.height / 10).toFixed(1) : '';
  const stats = pokemonData ? pokemonData.stats : [];
  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  }

  return (
    <>
      <header className="app-header">
        <h1>Mini Pokédex</h1>
      </header>
  
      <div className="container">
        <div className="left-container">
          {pokemonData ? (
            <>
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
              <p>ID: {pokemonData.id}</p>
              <h3 className="types-label">Types:</h3>
              <div className="type-container">
                {pokemonData.types.map((typeSlot) => {
                  const typeName = typeSlot.type.name;
                  const typeColor = typeColors[typeName] || '#000';
                  return (
                    <span
                      key={typeName}
                      className="type-badge"
                      style={{ backgroundColor: typeColor }}
                    >
                      {typeName}
                    </span>
                  );
                })}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
          <div className="arrow-container">
            <button onClick={decrementId} disabled={pokemonId <= 1}>←</button>
            <button onClick={incrementId}>→</button>
          </div>
        </div>

        <div className="right-container">
          <div className="button-container">
            <button 
              onClick={() => handlePanelSwitch('info')}
              style={{ backgroundColor: activePanel === 'info' ? '#7bff79' : '#e8e8e8' }}
            >
              Info
            </button>
            <button 
              onClick={() => handlePanelSwitch('moves')}
              style={{ backgroundColor: activePanel === 'moves' ? '#7bff79' : '#e8e8e8' }} 
            >
              Moves
            </button>
          </div>
          <div className="stats-panel">
            {activePanel === 'info' && pokemonData && (
              <div>
                <p>height: {heightInMeters} m</p>
                <p>weight: {pokemonData.weight / 10} kg</p>
                <p>hp: {stats.find(stat => stat.stat.name === 'hp')?.base_stat}</p>
                <p>attack: {stats.find(stat => stat.stat.name === 'attack')?.base_stat}</p>
                <p>defense: {stats.find(stat => stat.stat.name === 'defense')?.base_stat}</p>
                <p>special attack: {stats.find(stat => stat.stat.name === 'special-attack')?.base_stat}</p>
                <p>special defense: {stats.find(stat => stat.stat.name === 'special-defense')?.base_stat}</p>
                <p>speed: {stats.find(stat => stat.stat.name === 'speed')?.base_stat}</p>
              </div>
            )}
            {activePanel === 'moves' && pokemonData && (
              <div>
                {pokemonData.moves.map((move) => (
                  <p key={move.move.name}>{move.move.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="name-container">
        {pokemonData && <h2>{pokemonData.name}</h2>}
      </div>
    </>
  );
}

export default App;