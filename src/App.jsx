import React, { useState, useEffect } from 'react';
import './App.css';
import {AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios';

export default function App({onOpen}) {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
    
  };
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);

  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'X-RapidAPI-Key': 'e65bcff07emsh2e166185e719b3cp1ab6c5jsn71c70b3c026e',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    

    axios
      .request(options)
      .then(function (response) {
        setGames(response.data);
        const uniquePlatforms = [...new Set(response.data.flatMap(game => game.platform.split(',').map(platform => platform.trim())))];
        const uniqueGenres = [...new Set(response.data.map(game => game.genre))];
        setPlatforms(uniquePlatforms);
        setGenres(uniqueGenres);
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  let filteredGames = games ;
  if (selectedPlatform) {
    filteredGames = filteredGames.filter(game => game.platform.includes(selectedPlatform));
  }
  
  if (selectedGenre){
    filteredGames = filteredGames.filter(game => game.genre.includes(selectedGenre));
  }

  if (searchValue) {
    filteredGames = filteredGames.filter(game => game.title.toLowerCase().includes(searchValue.toLowerCase()));
  }

  return (
    <>
    
    <div className='filter_container'>
      <div className='grid-container'>
        <div className='input-container'>
          <input type="text" placeholder="Search a game..." value={searchValue} onChange={handleSearchChange}></input>
          <AiOutlineSearch className='search-icon'/>
        </div>
        <select className="btn" onChange={handlePlatformChange} id='platforms'>
          <option value=''>All platforms</option>
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
        <select className="btn" onChange={handleGenreChange} id='genres'>
          <option value=''>All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

      </div>
    </div>
    <section id='games'>
      {/* <h2>No Pain, Just Play</h2> */}
      <div className='container games_container'>
      {filteredGames.map((game) => (
        <article key={game.id} className='game_item'>
          <div className='game_item_image'>
            <img src={game.thumbnail} alt={game.title} />
          </div>
            <h3>{game.title} <br></br><p>{game.genre}</p></h3>
            <small>{game.short_description}</small>
            <div className="game_item_a">
              <button onClick={() => onOpen(game)} className='btn'>Read more</button>
              <a href={game.game_url} rel="noreferrer" target="_blank" className='btn'>Go play!</a>
            </div>
        </article>
      ))}
      
      </div>
      </section>
    </>
  );
}
